import { google, sheets_v4 } from "googleapis";
import {
  Categories,
  Category,
  ColumnKey,
  DataSource,
  SheetSchema,
} from "./types";

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.CREDENTIAL_FILE,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const api = google.sheets({ auth, version: "v4" });

export const MasterList: Record<Category, Omit<SheetSchema, "id">> = {
  "aboveground-bosses": {
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
  "underground-bosses": {
    title: "UNDERGROUND BOSSES",
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

class Sheet {
  id: string;
  private spreadsheet: sheets_v4.Schema$Spreadsheet;

  data: Partial<DataSource> = {};

  working?: boolean = false;

  done: Promise<void>;

  constructor(id: string) {
    this.id = id;
  }

  async init(category?: Category) {
    let ranges: string[] = [];
    let schema: Omit<SheetSchema, "id">;
    if (category) {
      schema = MasterList[category];
      ranges.push(schema.title);
    }

    this.spreadsheet = (
      await api.spreadsheets.get({
        spreadsheetId: this.id,
        includeGridData: true,
        ranges: ranges,
      })
    ).data;

    if (category) {
      this.data[category] = {
        _meta: { ...schema, id: category },
        data: this.get(schema),
      };
      return;
    }

    for (const category of Categories) {
      const schema = MasterList[category];
      this.data[category] = {
        _meta: { ...schema, id: category },
        data: this.get(schema),
      };
    }
  }

  get(schema: Omit<SheetSchema, "id">): DataSource[Category]["data"] {
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

export const defaultGetStaticProps = () => {
  return {
    props: {
      sections: Categories.map((category) => ({
        ...MasterList[category],
        id: category,
      })),
    },
  };
};
