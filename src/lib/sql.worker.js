import initSqlJs from "sql.js";

let SQL;
const dbs = new Map();

onmessage = async (event) => {
  const { id, type, dbId, payload } = event.data;

  if (type !== "init" && !SQL) {
    throw new Error("SQL Worker not initialized properly");
  } else if (type !== "init" && !dbId) {
    throw new Error("DB id not specified");
  }

  try {
    switch (type) {
      case "init": {
        if (!SQL) {
          SQL = await initSqlJs({
            locateFile: (file) => `/${file}`,
          });
        }

        postMessage({ id, success: true });
        break;
      }
      case "open": {
        const db = new SQL.Database();
        dbs.set(dbId, db);

        postMessage({ id, success: true });
        break;
      }
      case "close": {
        const db = dbs.get(dbId);
        if (!db) {
          throw new Error("DB not found");
        }

        db.close();
        dbs.delete(dbId);

        postMessage({ id, success: true });
        break;
      }
      case "exec": {
        const db = dbs.get(dbId);
        if (!db) {
          throw new Error("DB not found");
        }

        const { sql } = payload;
        const result = db.exec(sql);

        postMessage({ id, success: true, payload: { result } });
        break;
      }

      case "data": {
        const db = dbs.get(dbId);
        if (!db) {
          throw new Error("DB not found");
        }

        postMessage({ id, success: true, payload: { data: db } });
        break;
      }
    }
  } catch (error) {
    postMessage({ id, error });
  }
};
