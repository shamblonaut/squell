import { DB_NAME, AppDataType, migrations } from "./config";

class AppData {
  static async openDB() {
    if (AppData.db) {
      return new Promise((resolve) =>
        resolve({ success: true, message: "DB already opened" }),
      );
    }

    const dbVersion = migrations.length;
    const request = indexedDB.open(DB_NAME, dbVersion);

    return new Promise((resolve, reject) => {
      request.onerror = (event) => {
        reject("Could not open DB: " + event.target.error.message);
      };

      request.onsuccess = (event) => {
        AppData.db = event.target.result;

        resolve({ success: true, message: "DB opened successfully" });
      };

      request.onblocked = () => {
        alert("Please close all other tabs with this site open!");
        reject("Active instances of DB with older version found");
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        for (let i = event.oldVersion; i < event.newVersion; i++) {
          const migration = migrations[i];
          migration(db);
        }
      };
    });
  }

  static closeDB() {
    if (!AppData.db) return;

    AppData.db.close();
    AppData.db = null;
  }

  async #processRequest(request) {
    if (!AppData.db.objectStoreNames.contains(this.type)) {
      throw new Error(`Object store ${this.type} not found`);
    }

    return new Promise((resolve, reject) => {
      request.onerror = (event) => {
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  }

  constructor(type) {
    this.type = type;

    if (!Object.values(AppDataType).includes(type)) {
      throw new Error("Invalid ApplicationData type");
    }
  }

  async getRecord(key) {
    if (!AppData.db) {
      throw new Error("DB not found");
    }

    const record = await this.#processRequest(
      AppData.db
        .transaction(this.type, "readonly")
        .objectStore(this.type)
        .get(key),
    ).catch((error) => {
      throw new Error(
        `Could not get record with key '${key}' from store '${this.type}' in ${DB_NAME}: ${error.message}`,
      );
    });
    return record;
  }

  async getAllRecords() {
    if (!AppData.db) {
      throw new Error("DB not found");
    }

    const record = await this.#processRequest(
      AppData.db
        .transaction(this.type, "readonly")
        .objectStore(this.type)
        .getAll(),
    ).catch((error) => {
      throw new Error(
        `Could not get records from store '${this.type}' in ${DB_NAME}: ${error.message}`,
      );
    });
    return record;
  }

  async addRecord(record) {
    if (!AppData.db) {
      throw new Error(`DB not found`);
    }

    const key = await this.#processRequest(
      AppData.db
        .transaction(this.type, "readwrite")
        .objectStore(this.type)
        .add(record),
    ).catch((error) => {
      throw new Error(
        `Could not add record to '${this.type}' in ${DB_NAME}: ${error.message}`,
      );
    });
    return key;
  }

  async updateRecord(key, updates) {
    if (!AppData.db) {
      throw new Error(`DB not found`);
    }

    const record = await this.getRecord(key);
    for (let [key, value] of Object.entries(updates)) {
      if (key === "id") {
        throw new Error(
          `Invalid update to id property in '${this.type}' in ${DB_NAME}`,
        );
      }

      record[key] = value;
    }

    await this.#processRequest(
      AppData.db
        .transaction(this.type, "readwrite")
        .objectStore(this.type)
        .put(record),
    ).catch((error) => {
      throw new Error(
        `Could not update record [ID: ${key}] in '${this.type}' in ${DB_NAME}: ${error.message}`,
      );
    });

    return record;
  }

  async removeRecord(key) {
    if (!AppData.db) {
      throw new Error(`DB not found`);
    }

    await this.#processRequest(
      AppData.db
        .transaction(this.type, "readwrite")
        .objectStore(this.type)
        .delete(key),
    ).catch((error) => {
      throw new Error(
        `Could not remove record [ID: ${key}] in '${this.type}' in ${DB_NAME}: ${error.message}`,
      );
    });
  }
}

export default AppData;
