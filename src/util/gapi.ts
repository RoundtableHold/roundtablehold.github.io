import { google, sheets_v4 } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.CREDENTIAL_FILE,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const api = google.sheets({ auth, version: "v4" });

export interface SheetSchema {
  title: string;
  startsAt: number;
  data?: Record<string, string>[];
  schema: { name: string; inherits?: boolean }[];
}

export class Sheet {
  id: string;
  spreadsheet: sheets_v4.Schema$Spreadsheet;

  constructor(id: string) {
    this.id = id;
  }

  async init() {
    this.spreadsheet = (
      await api.spreadsheets.get({
        spreadsheetId: this.id,
        includeGridData: true,
      })
    ).data;
  }

  public async getFormattedData() {
    const sheets: SheetSchema[] = [
      {
        title: "ABOVEGROUND BOSSES",
        startsAt: 3,
        schema: [
          { name: "area", inherits: true },
          { name: "name" },
          { name: "location" },
          { name: "notes" },
        ],
      },
    ];

    for (let i = 0; i < sheets.length; i++) {
      sheets[i].data = await this.get(sheets[i]);
    }

    return sheets;
  }

  async get(schema: SheetSchema) {
    const sheet = this.spreadsheet.sheets.find(
      (sheet) => sheet.properties.title === schema.title
    );

    const response = [];

    if (sheet) {
      const data = sheet.data[0].rowData;
      const inherits: Record<string, any> = {};
      for (let i = schema.startsAt; i < data.length; i++) {
        const entry: any = {};
        const row = data[i].values;
        schema.schema.forEach((shape, index) => {
          let value = row[index].effectiveValue;
          if (shape.inherits) {
            if (!value) value = inherits[shape.name];
            else inherits[shape.name] = value;
          }

          entry[shape.name] = value?.stringValue ?? null;
        });
        response.push(entry);
      }
    }
    return response;
  }
}

export const sheet = new Sheet(process.env.SHEET_ID);
