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
    <div className="my-4 grid w-[90vw] grid-cols-1 grid-rows-[50svh_min-content] overflow-hidden rounded-sm border border-gray-600 lg:grid-cols-2 lg:grid-rows-[84svh]">
      <Panel
        className="border-b border-gray-600 lg:border-r lg:border-b-0"
        title="Query"
        barItems={
          <button
            className="flex gap-2 rounded-sm bg-green-400 px-2 py-1 font-bold text-white disabled:bg-green-700 disabled:text-gray-300"
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
          <div className="h-full min-w-min bg-red-500 p-4 text-white">
            <p className="ml-2 text-xl font-bold">SQL Error:</p>
            <div className="my-2 rounded-sm bg-gray-700  p-4 font-mono">
              {error}
            </div>
          </div>
        ) : processing ? (
          <div className="px-8 py-16 text-center">
            <em>Executing query...</em>
          </div>
        ) : table ? (
          <div className="flex h-full min-w-min flex-col items-center p-8">
            <table className="w-min border-collapse border-2 border-gray-600 text-center lg:mx-auto">
              <thead>
                <tr>
                  {table.columns.map((column, index) => (
                    <th
                      key={index}
                      className="border border-gray-600 px-8 py-2"
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
                        className="min-w-max border border-gray-600 px-8 py-2"
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
            <em>Run a query to see results</em>
          </div>
        )}
      </Panel>
    </div>
  );
};

export default Workspace;
