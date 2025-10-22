class SQLiteDBManager {
  static worker = new Worker(new URL("worker.js", import.meta.url), {
    type: "module",
  });
  static workerPromises = new Map();

  static {
    SQLiteDBManager.worker.onmessage = (event) => {
      const { id } = event.data;
      const pendingPromise = SQLiteDBManager.workerPromises.get(id);
      if (!pendingPromise) return;

      if (event.data.error) {
        pendingPromise.reject(event.data.error);
      } else {
        pendingPromise.resolve(event.data);
      }

      SQLiteDBManager.workerPromises.delete(id);
    };

    SQLiteDBManager.worker.onerror = (event) => {
      console.error("Worker failed to load:\n", event.message);
    };
  }

  static async init() {
    const messageID = crypto.randomUUID();
    SQLiteDBManager.worker.postMessage({ id: messageID, type: "init" });
    return new Promise((resolve, reject) => {
      SQLiteDBManager.workerPromises.set(messageID, { resolve, reject });
    });
  }

  #send(type, payload = {}) {
    const messageID = crypto.randomUUID();
    SQLiteDBManager.worker.postMessage({
      id: messageID,
      type,
      dbId: this.id,
      payload,
    });

    return new Promise((resolve, reject) => {
      SQLiteDBManager.workerPromises.set(messageID, { resolve, reject });
    });
  }

  constructor(data) {
    this.id = crypto.randomUUID();

    this.#send("open", { data });
  }

  async exec(sql) {
    return this.#send("exec", { sql }).then((response) => {
      return response.payload;
    });
  }

  async getTables() {
    return this.exec(
      "SELECT * FROM sqlite_master WHERE type = 'table' AND name <> 'sqlite_sequence'",
    ).then(({ result }) => result[0]?.values || []);
  }

  async getData() {
    return this.#send("export").then((response) => {
      const { data } = response.payload;
      return data;
    });
  }

  async close() {
    return this.#send("close");
  }
}

export default SQLiteDBManager;
