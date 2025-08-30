import { useCallback, useState } from "react";
import { Play } from "lucide-react";

import { Editor, Panel } from "@/components";

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

const Workspace = ({ db }) => {
  const [code, setCode] = useState("");
  const [table, setTable] = useState();
  const [error, setError] = useState("");

  const handleRunClick = () => {
    try {
      const result = db.exec(code);
      console.log(result);

      setTable(result[0]);
      setError("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  const handleCodeChange = useCallback((updatedCode) => {
    setCode(updatedCode);
  }, []);

  return (
    <div className="m-8 grid grid-cols-1 grid-rows-[min-content_1fr] overflow-hidden rounded-sm border border-gray-600 md:grid-cols-2 md:grid-rows-1 ">
      <Panel
        className="border-b border-gray-600 md:border-r md:border-b-0"
        title="Query"
        actions={
          <button
            className="flex gap-2 rounded-sm bg-green-400 px-2 py-1 font-bold text-white"
            onClick={handleRunClick}
          >
            <Play className="w-4" /> Run
          </button>
        }
      >
        <Editor initialDoc={SQL_CODE} onChange={handleCodeChange} />
      </Panel>
      <Panel title="Result">
        {error ? (
          <div className="h-full min-w-min bg-red-500 p-4 text-white">
            <p className="ml-2 text-xl font-bold">SQL Error:</p>
            <div className="my-2 rounded-sm bg-gray-700  p-4 font-mono">
              {error}
            </div>
          </div>
        ) : table ? (
          <div className="flex h-full min-w-min flex-col items-center p-8">
            <table className="w-min border-collapse border-2 border-gray-600 text-center md:mx-auto">
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
          <div className="p-8 text-center">
            <em>Run a query to see results</em>
          </div>
        )}
      </Panel>
    </div>
  );
};

export default Workspace;
