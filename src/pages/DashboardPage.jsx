import { useCallback, useState } from "react";

import { useSQL } from "@/hooks";

import { Editor, Header } from "@/components";

const SQL_CODE = `CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);

INSERT INTO users (name) VALUES
  ("Alice"),
  ("Bob"),
  ("Cassey");

SELECT * FROM users;`;

const DashboardPage = () => {
  const { SQL, error: initError, loading: sqlLoading } = useSQL();

  const [code, setCode] = useState("");
  const [table, setTable] = useState();
  const [error, setError] = useState("");

  const handleRunClick = () => {
    if (!SQL) return;

    try {
      const db = new SQL.Database();
      const result = db.exec(code);
      console.log(result);
      console.log(db);

      setTable(result[0]);
      setError("");

      db.close();
    } catch (error) {
      setError(error.message);
    }
  };
  const handleCodeChange = useCallback((updatedCode) => {
    setCode(updatedCode);
  }, []);

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="mx-auto flex flex-1 flex-col justify-center">
        {sqlLoading
          ? "Loading SQL..."
          : initError
            ? initError.message
            : !SQL && "Could not load SQL"}
        <Editor initialDoc={SQL_CODE} onChange={handleCodeChange} />
        <button
          className="mx-auto my-4 w-max rounded-lg bg-green-400 px-8 py-2 font-bold text-white"
          onClick={handleRunClick}
        >
          Run
        </button>
        {error ? (
          <div className="rounded-lg bg-red-500 p-4 text-white">
            <p className="text-xl font-bold">SQL Error:</p>
            <div className="my-2 rounded-sm bg-gray-700  p-4 font-mono">
              {error}
            </div>
          </div>
        ) : (
          table && (
            <table className="mx-auto my-8 w-min border-collapse border-2 border-gray-600 text-center">
              <caption className="my-2 font-bold">Result</caption>
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
                        className="border border-gray-600 px-8 py-2"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
