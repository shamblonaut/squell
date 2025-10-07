export const DB_NAME = "squell-data";

export const AppDataType = Object.freeze({
  SAVED_QUERIES: "saved-queries",
});

export const migrations = [
  (db) => {
    db.createObjectStore("saved-queries", {
      keyPath: "id",
      autoIncrement: true,
    });
  },
];
