export const DB_NAME = "squell-data";

export const AppDataType = {
  SAVED_QUERIES: "saved-queries",
  DB_DATA: "db-data",
} as const;
export type AppDataType = (typeof AppDataType)[keyof typeof AppDataType];

export const migrations = [
  (db: IDBDatabase) => {
    db.createObjectStore(AppDataType.SAVED_QUERIES, {
      keyPath: "id",
      autoIncrement: true,
    });
  },
  (db: IDBDatabase) => {
    db.createObjectStore(AppDataType.DB_DATA, {
      keyPath: "id",
      autoIncrement: true,
    });
  },
];
