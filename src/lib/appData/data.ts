import { AppDataType, DB_NAME, migrations } from "./config";
import type { NewRecordOf, RecordOf } from "./types";

class AppData<T extends AppDataType> {
  // Static properties
  static db: IDBDatabase | null = null;

  static async openDB(): Promise<string> {
    if (AppData.db) {
      return new Promise((resolve) => resolve("DB already opened"));
    }

    const dbVersion = migrations.length;

    const request = indexedDB.open(DB_NAME, dbVersion);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        AppData.db = request.result;

        resolve("DB opened successfully");
      };

      request.onerror = () => {
        reject(
          "Could not open DB: " +
            (request.error?.message ?? "Unknown request error"),
        );
      };

      request.onblocked = () => {
        alert("Please close all other tabs with this site open!");
        reject("Active instances of DB with older version found");
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = request.result;

        // If database is being deleted, abort the open request
        if (event.newVersion === null) {
          try {
            db.close();
          } catch (error) {
            console.warn("Failed to close DB during deletion cleanup:", error);
          }

          reject("Could not open DB: Database deletion in progress");
          return;
        }

        for (let i = event.oldVersion; i < event.newVersion; i++) {
          const migration = migrations[i];
          migration(db);
        }
      };
    });
  }

  static closeDB(): void {
    if (!AppData.db) return;

    AppData.db.close();
    AppData.db = null;
  }

  // Instance properties
  type: T;

  constructor(type: T) {
    this.type = type;
  }

  async getRecord(key: number): Promise<RecordOf<T>> {
    if (!AppData.db) {
      throw new Error("DB not found");
    }

    const record = await this.#processRequest(
      AppData.db
        .transaction(this.type, "readonly")
        .objectStore(this.type)
        .get(key) as IDBRequest<RecordOf<T>>,
    ).catch((error) => {
      throw new Error(
        `Could not get record with key '${key}' from store '${this.type}' in ${DB_NAME}: ${error.message}`,
      );
    });
    return record;
  }

  async getAllRecords(): Promise<RecordOf<T>[]> {
    if (!AppData.db) {
      throw new Error("DB not found");
    }

    const record = await this.#processRequest(
      AppData.db
        .transaction(this.type, "readonly")
        .objectStore(this.type)
        .getAll() as IDBRequest<RecordOf<T>[]>,
    ).catch((error) => {
      throw new Error(
        `Could not get records from store '${this.type}' in ${DB_NAME}: ${error.message}`,
      );
    });
    return record;
  }

  async addRecord(record: NewRecordOf<T>): Promise<number> {
    if (!AppData.db) {
      throw new Error("DB not found");
    }

    const key = await this.#processRequest(
      AppData.db
        .transaction(this.type, "readwrite")
        .objectStore(this.type)
        .add(record) as IDBRequest<number>,
    ).catch((error) => {
      throw new Error(
        `Could not add record to '${this.type}' in ${DB_NAME}: ${error.message}`,
      );
    });
    return key;
  }

  async updateRecord(
    key: number,
    updates: Partial<NewRecordOf<T>>,
  ): Promise<RecordOf<T>> {
    if (!AppData.db) {
      throw new Error("DB not found");
    }

    const record = await this.getRecord(key);
    for (const key of Object.keys(updates) as (keyof NewRecordOf<T>)[]) {
      if (key === "id") {
        throw new Error(
          `Invalid update to id property in '${this.type}' in ${DB_NAME}`,
        );
      }

      const value = updates[key];
      if (value !== undefined) {
        record[key] = value;
      }
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

  async removeRecord(key: number): Promise<void> {
    if (!AppData.db) {
      throw new Error("DB not found");
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

  async #processRequest<R>(request: IDBRequest<R>): Promise<R> {
    if (!AppData.db) {
      throw new Error("DB not found");
    }

    if (!AppData.db.objectStoreNames.contains(this.type)) {
      throw new Error(`Object store ${this.type} not found`);
    }

    return new Promise<R>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

export default AppData;
