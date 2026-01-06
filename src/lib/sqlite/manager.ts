import type { SqlValue } from "sql.js";

import type {
  CommandPayload,
  ExecResponsePayload,
  ResponseFor,
  SQLiteWorkerCommandType,
  SQLiteWorkerResponse,
  SuccessResponse,
  WorkerPromiseControls,
} from "./types";

class SQLiteDBManager {
  // Static properties
  static worker = new Worker(new URL("worker.js", import.meta.url), {
    type: "module",
  });
  static workerPromises = new Map<
    string,
    WorkerPromiseControls<SQLiteWorkerResponse>
  >();
  static {
    SQLiteDBManager.worker.onmessage = (
      event: MessageEvent<SQLiteWorkerResponse>,
    ) => {
      const { id } = event.data;
      const pendingPromise = SQLiteDBManager.workerPromises.get(id);
      if (!pendingPromise) return;

      if (!event.data.success) {
        pendingPromise.reject(event.data.error);
      } else {
        pendingPromise.resolve(event.data);
      }

      SQLiteDBManager.workerPromises.delete(id);
    };

    SQLiteDBManager.worker.onerror = (event: ErrorEvent) => {
      console.error("Worker failed to load:\n", event.message);
    };
  }

  static async init(): Promise<SuccessResponse> {
    const messageID = crypto.randomUUID();
    SQLiteDBManager.worker.postMessage({ id: messageID, type: "init" });
    return new Promise((resolve, reject) => {
      SQLiteDBManager.workerPromises.set(messageID, {
        resolve: (value: SQLiteWorkerResponse) =>
          resolve(value as SuccessResponse),
        reject,
      });
    });
  }

  // Instance properties
  id: string;

  constructor(data?: Uint8Array) {
    this.id = crypto.randomUUID();

    this.#send("open", { data });
  }

  async exec(sql: string): Promise<ExecResponsePayload> {
    return this.#send("exec", { sql }).then((response) => {
      return response.payload;
    });
  }

  async getTables(): Promise<SqlValue[][]> {
    return this.exec(
      "SELECT * FROM sqlite_master WHERE type = 'table' AND name <> 'sqlite_sequence'",
    ).then(({ result }) => result[0]?.values || []);
  }

  async getData(): Promise<Uint8Array> {
    return this.#send("export").then((response) => {
      const { data } = response.payload;
      return data;
    });
  }

  async close(): Promise<SuccessResponse> {
    return this.#send("close");
  }

  async #send<T extends SQLiteWorkerCommandType>(
    type: T,
    payload?: CommandPayload,
  ): Promise<ResponseFor<T>> {
    const messageID = crypto.randomUUID();
    SQLiteDBManager.worker.postMessage({
      id: messageID,
      type,
      dbId: this.id,
      payload,
    });

    return new Promise((resolve, reject) => {
      SQLiteDBManager.workerPromises.set(messageID, {
        resolve: (value: SQLiteWorkerResponse) =>
          resolve(value as ResponseFor<T>),
        reject,
      });
    });
  }
}

export default SQLiteDBManager;
