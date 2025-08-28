import { useEffect, useState } from "react";

import { useSQL } from "@/hooks";

import { Editor, Header } from "@/components";

const SQL_CODE = `
CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);

INSERT INTO users (name) VALUES
  ("Alice"),
  ("Bob"),
  ("Cassey");

SELECT * FROM users;
`;

const DashboardPage = () => {
  const { SQL, error: initError, loading: sqlLoading } = useSQL();

  const [table, setTable] = useState();

  useEffect(() => {
    if (!SQL) return;

    const db = new SQL.Database();
    const result = db.exec(SQL_CODE);

    setTable(result[0]);
  }, [SQL, sqlLoading]);

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="mx-auto flex flex-1 flex-col justify-center">
        {sqlLoading
          ? "Loading SQL..."
          : initError
            ? initError.message
            : !SQL && "Could not load SQL"}
        <Editor />
        {table && (
          <table className="mx-auto my-8 w-min caption-bottom border-collapse border-2 border-gray-600 text-center">
            <caption className="my-2 font-bold">Users</caption>
            <thead>
              <tr>
                {table.columns.map((column, index) => (
                  <th key={index} className="border border-gray-600 px-8 py-2">
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
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
