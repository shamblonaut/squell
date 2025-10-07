class SQLiteDatabase {
  static worker = new Worker(new URL("worker.js", import.meta.url), {
    type: "module",
  });
  static workerPromises = new Map();

  static {
    SQLiteDatabase.worker.onmessage = (event) => {
      const { id } = event.data;
      const pendingPromise = SQLiteDatabase.workerPromises.get(id);
      if (!pendingPromise) return;

      if (event.data.error) {
        pendingPromise.reject(event.data.error);
      } else {
        pendingPromise.resolve(event.data);
      }

      SQLiteDatabase.workerPromises.delete(id);
    };

    SQLiteDatabase.worker.onerror = (event) => {
      console.error("Worker failed to load:\n", event.message);
    };
  }

  static async init() {
    const messageID = crypto.randomUUID();
    SQLiteDatabase.worker.postMessage({ id: messageID, type: "init" });
    return new Promise((resolve, reject) => {
      SQLiteDatabase.workerPromises.set(messageID, { resolve, reject });
    });
  }

  #send(type, payload = {}) {
    const messageID = crypto.randomUUID();
    SQLiteDatabase.worker.postMessage({
      id: messageID,
      type,
      dbId: this.id,
      payload,
    });

    return new Promise((resolve, reject) => {
      SQLiteDatabase.workerPromises.set(messageID, { resolve, reject });
    });
  }

  constructor() {
    this.id = crypto.randomUUID();

    this.#send("open");
  }

  async exec(sql) {
    return this.#send("exec", { sql }).then((response) => {
      return response.payload;
    });
  }

  async close() {
    return this.#send("close");
  }

  async getData() {
    return this.#send("data").then((response) => {
      const { data } = response.payload;
      return data;
    });
  }
}

export default SQLiteDatabase;
