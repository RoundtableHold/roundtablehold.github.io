import { openDB, DBSchema } from "idb";
import { useCallback, useEffect, useRef, useState } from "react";
import { Category, Categories } from "./types";

type DB = DBSchema & {
  [K in Category]: {
    key: string;
    value: boolean;
  };
};

const initDatabase = () => {
  return openDB<DB>("tracker", 1, {
    upgrade(db) {
      for (const category of Categories) {
        db.createObjectStore(category);
      }
    },
  });
};

export default function useIndexedDb(
  store: Category,
  initialValue: Record<string, boolean>
) {
  const [value, setValue] = useState(initialValue);

  const db = useRef<Awaited<ReturnType<typeof initDatabase>>>(null);

  useEffect(() => {
    async function openDb() {
      db.current = await initDatabase();
      const entries = await Promise.all([
        db.current?.getAllKeys(store),
        db.current?.getAll(store),
      ]).then(([keys, values]) =>
        keys.map((key, i) => [key, values[i]] as const)
      );

      setValue(Object.fromEntries(entries));
    }

    openDb().catch((err) => {
      console.error("Failed to open db. ", err);
    });

    return () => {
      db.current?.close();
    };
  }, [store]);

  const set = useCallback(
    (key: string, value: any) => {
      setValue((v) => ({
        ...v,
        [key]: value,
      }));
      return db.current?.put(store, value, key);
    },
    [store]
  );

  return [value, set] as const;
}
