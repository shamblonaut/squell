import { useCallback, useState } from "react";
import { Play } from "lucide-react";

import { Database } from "@/lib/database";

import { Editor, Panel } from "@/components";
import { useEffect } from "react";

const SQL_CODE = `DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, comment TEXT
);

INSERT INTO users (name, comment) VALUES
  ("Alice", "Hello, World!"),
  ("Bob", "What are you guys upto?"),
  ("Cassey", "I solemnly swear that I am upto no good.");

SELECT * FROM users;`;

const Workspace = () => {
  const [database, setDatabase] = useState();
  const [code, setCode] = useState("");
  const [table, setTable] = useState(null);
  const [execTime, setExecTime] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const database = new Database();
    setDatabase(database);

    return () => database.close();
  }, []);

  const handleRunClick = async () => {
    if (processing) return;
    setProcessing(true);

    const t0 = performance.now();
    database
      .exec(code)
      .then((result) => {
        setTable(result[0]);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setExecTime(Math.round(performance.now() - t0));
        setProcessing(false);
      });
  };
  const handleCodeChange = useCallback((updatedCode) => {
    setCode(updatedCode);
  }, []);

  return (
    <div className="my-8 grid w-[90vw] flex-1 grid-cols-1 grid-rows-[50svh_auto] overflow-hidden rounded-sm border border-base-3 lg:max-h-[85svh] lg:grid-cols-2 lg:grid-rows-1">
      <Panel
        className="border-b border-base-3 lg:border-r lg:border-b-0"
        title="Query"
        barItems={
          <button
            className="flex gap-2 rounded-sm bg-purple px-3 py-1 font-bold text-slate-50 disabled:bg-purple-dark disabled:text-slate-300"
            onClick={handleRunClick}
            disabled={processing}
          >
            {processing ? (
              "Running..."
            ) : (
              <>
                <Play className="w-4" /> Run
              </>
            )}
          </button>
        }
      >
        <Editor initialDoc={SQL_CODE} onChange={handleCodeChange} />
      </Panel>
      <Panel
        title="Result"
        barItems={
          !processing &&
          execTime && <p className="italic">Query took {execTime} ms</p>
        }
      >
        {error ? (
          <div className="h-full min-w-min p-4 lg:p-8">
            <p className="ml-2 text-2xl font-bold text-red">SQL Error:</p>
            <div className="my-2 rounded-sm bg-base-3 p-4 font-[JetBrains_Mono]">
              {error}
            </div>
          </div>
        ) : processing ? (
          <div className="px-8 py-16 text-center">
            <em className="text-xl">Executing query...</em>
          </div>
        ) : table ? (
          <div className="flex h-min min-w-min flex-col items-center p-8">
            <table className="w-full border-collapse border-2 border-invert-2 text-center font-[JetBrains_Mono] lg:mx-auto">
              <thead>
                <tr>
                  {table.columns.map((column, index) => (
                    <th
                      key={index}
                      className="min-w-min border-2 border-invert-2 px-8 py-2"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.values.map((row, index) => (
                  <tr key={index}>
                    {row.map((value, index) => (
                      <td
                        key={index}
                        className="min-w-min border-2 border-invert-2 px-8 py-2"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-8 py-16 text-center">
            <em className="text-xl">Run a query to see results</em>
          </div>
        )}
      </Panel>
    </div>
  );
};

export default Workspace;
