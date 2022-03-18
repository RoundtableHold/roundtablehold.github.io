export interface SheetSchema {
  id: Category;
  title: string;
  startsAt: number;
  groupBy?: ColumnKey;
  schema: { name: ColumnKey; inherits?: boolean }[];
}

export type ColumnKey = keyof Boss;

export interface DataSource {
  "aboveground-bosses": {
    _meta: SheetSchema;
    data: { [area: string]: Boss[] };
  };
  "underground-bosses": {
    _meta: SheetSchema;
    data: { [area: string]: Boss[] };
  };
}

interface Boss {
  area: string;
  name: string;
  location: string;
  notes?: string;
}

export const Categories = ["aboveground-bosses", "underground-bosses"] as const;

export type Category = typeof Categories[number];
