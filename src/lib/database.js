export class Database {
  static worker = new Worker(new URL("sql.worker.js", import.meta.url), {
    type: "module",
  });
  static workerPromises = new Map();
  static {
    Database.worker.onmessage = (event) => {
      const { id } = event.data;
      const pendingPromise = Database.workerPromises.get(id);
      if (!pendingPromise) return;

      if (event.data.error) {
        pendingPromise.reject(event.data.error);
      } else {
        pendingPromise.resolve(event.data);
      }

      Database.workerPromises.delete(id);
    };

    Database.worker.onerror = (event) => {
      console.error("Worker failed to load:\n", event.message);
    };
  }
  static async init() {
    const messageID = crypto.randomUUID();
    Database.worker.postMessage({ id: messageID, type: "init" });
    return new Promise((resolve, reject) => {
      Database.workerPromises.set(messageID, { resolve, reject });
    });
  }

  constructor() {
    this.id = crypto.randomUUID();

    this._send("open");
  }

  _send(type, payload = {}) {
    const messageID = crypto.randomUUID();
    Database.worker.postMessage({
      id: messageID,
      type,
      dbId: this.id,
      payload,
    });

    return new Promise((resolve, reject) => {
      Database.workerPromises.set(messageID, { resolve, reject });
    });
  }

  async exec(sql) {
    return this._send("exec", { sql }).then((response) => {
      const { result } = response.payload;
      return result;
    });
  }

  async close() {
    return this._send("close");
  }

  async getData() {
    return this._send("data").then((response) => {
      const { data } = response.payload;
      return data;
    });
  }
}
