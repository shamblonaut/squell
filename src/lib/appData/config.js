export const DB_NAME = "squell-data";

export const AppDataType = Object.freeze({
  SAVED_QUERIES: "saved-queries",
  DB_DATA: "db-data",
});

export const migrations = [
  (db) => {
    db.createObjectStore(AppDataType.SAVED_QUERIES, {
      keyPath: "id",
      autoIncrement: true,
    });
  },
  (db) => {
    db.createObjectStore(AppDataType.DB_DATA, {
      keyPath: "id",
      autoIncrement: true,
    });
  },
];
