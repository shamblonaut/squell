import { DB_NAME, AppDataType, migrations } from "./config";

class AppData {
  #openDB() {
    const dbVersion = migrations.length;
    const request = indexedDB.open(DB_NAME, dbVersion);

    request.onerror = (event) => {
      throw new Error("Could not open DB: " + event.target.error.message);
    };

    request.onsuccess = (event) => {
      this.db = event.target.result;
    };

    request.onblocked = () => {
      alert("Please close all other tabs with this site open!");
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      for (let i = event.oldVersion; i < event.newVersion; i++) {
        const migration = migrations[i];
        migration(db);
      }
    };
  }

  async #processRequest(request) {
    if (!this.db.objectStoreNames.contains(this.type)) {
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

    this.#openDB();
  }

  async addRecord(record) {
    if (!this.db) {
      throw new Error(`DB not found`);
    }

    const key = await this.#processRequest(
      this.db
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

  async getRecord(key) {
    if (!this.db) {
      throw new Error("DB not found");
    }

    const record = await this.#processRequest(
      this.db
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
    if (!this.db) {
      throw new Error("DB not found");
    }

    const record = await this.#processRequest(
      this.db
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
}

export default AppData;
