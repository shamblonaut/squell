import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import type { QueryExecResult } from "sql.js";

import { SQLEngineSuspense, TableView } from "@/components";
import type { DatabaseLayoutContext } from "@/layouts/DatabaseLayout";

const DatabaseTablePage = () => {
  const { database, setPageTitle } = useOutletContext<DatabaseLayoutContext>();
  const { tableName } = useParams();

  const [table, setTable] = useState<QueryExecResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPageTitle("Table View");
  }, [setPageTitle]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      setTable(null);

      database
        .manager!.exec(`SELECT * FROM ${tableName}`)
        .then(({ result }) => {
          setTable(result[0]);
        })
        .catch((error) => setError(error.message))
        .finally(() => {
          setLoading(false);
        });
    })();
  }, [database, tableName]);

  if (loading) {
    return (
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center p-4">
        <div className="text-2xl font-medium">Loading Table...</div>
      </main>
    );
  } else if (error) {
    return (
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center p-4">
        <div className="text-2xl font-medium text-red">Error: {error}</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <SQLEngineSuspense>
        <div className="flex flex-1 flex-col">
          <div className="flex h-16 items-center justify-center border-b border-base-3 bg-base-2">
            <p className="text-center text-2xl font-bold">{tableName}</p>
          </div>
          <div className="flex-1 overflow-x-auto p-4">
            {table ? (
              <TableView key={`${database.id}/${tableName}`} table={table} />
            ) : (
              <p className="my-8 text-center text-xl">Empty Table</p>
            )}
          </div>
        </div>
      </SQLEngineSuspense>
    </main>
  );
};

export default DatabaseTablePage;
