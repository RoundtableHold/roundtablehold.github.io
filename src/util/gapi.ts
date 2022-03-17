import { google, sheets_v4 } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.CREDENTIAL_FILE,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const api = google.sheets({ auth, version: "v4" });

export interface SheetSchema {
  title: string;
  startsAt: number;
  groupBy?: ColumnKey;
  schema: { name: ColumnKey; inherits?: boolean }[];
}

type ColumnKey = keyof AbovegroundBoss;

export interface DataSource {
  aboveground_bosses: {
    _meta: SheetSchema;
    data: { [area: string]: AbovegroundBoss[] };
  };
}

interface AbovegroundBoss {
  area: string;
  name: string;
  location: string;
  notes?: string;
}

const Categories = ["aboveground_bosses"] as const;

type Category = typeof Categories[number];

const MasterList: Record<Category, SheetSchema> = {
  aboveground_bosses: {
    title: "ABOVEGROUND BOSSES",
    startsAt: 3,
    groupBy: "area",
    schema: [
      { name: "area", inherits: true },
      { name: "name" },
      { name: "location" },
      { name: "notes" },
    ],
  },
};

export class Sheet {
  id: string;
  private spreadsheet: sheets_v4.Schema$Spreadsheet;

  data: Record<Category, DataSource[Category]>;

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

    // @ts-ignore
    this.data = {};

    for (const category of Categories) {
      const schema = MasterList[category];
      this.data[category] = {
        _meta: schema,
        data: await this.get(schema),
      };
    }
  }

  async get(schema: SheetSchema): Promise<DataSource[Category]["data"]> {
    const sheet = this.spreadsheet.sheets.find(
      (sheet) => sheet.properties.title === schema.title
    );

    const response: Record<string, DataSource[Category]["data"][string]> = {};

    if (sheet) {
      const data = sheet.data[0].rowData;
      const inherits: Record<string, any> = {};
      for (let i = schema.startsAt; i < data.length; i++) {
        const entry: Map<ColumnKey, string | null> = new Map();
        const row = data[i].values;

        schema.schema.forEach((shape, index) => {
          let value = row[index].effectiveValue;

          if (shape.inherits) {
            if (!value) value = inherits[shape.name];
            else inherits[shape.name] = value;
          }

          entry.set(shape.name, value?.stringValue ?? null);
        });
        const group = entry.get(schema.groupBy);
        if (schema.groupBy && !response[group]) response[group] = [];

        response[group].push(Object.fromEntries(entry) as any);
      }
    }
    return response;
  }
}

export const sheet = new Sheet(process.env.SHEET_ID);
