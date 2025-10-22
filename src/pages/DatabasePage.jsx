import { useEffect } from "react";
import { useParams } from "react-router";

import { SQLiteDBManager } from "@/lib/sqlite";
import { useAppData, useSQLEngine } from "@/hooks";

import { Workspace, SQLEngineSuspense } from "@/components";

const DatabasePage = () => {
  const { dbId } = useParams();
  const { engineLoading, engineInitError, database, setDatabase } =
    useSQLEngine();
  const { dbData } = useAppData();

  useEffect(() => {
    if (!dbData || engineLoading || engineInitError) return;

    let manager;
    dbData.getRecord(Number(dbId)).then((record) => {
      manager = new SQLiteDBManager(record.data);
      manager.getTables().then((tables) => {
        setDatabase({
          id: Number(dbId),
          name: record.name,
          tables,
          manager,
        });
      });
    });

    return () => {
      if (manager) manager.close();
    };
  }, [dbId, dbData, engineLoading, engineInitError, setDatabase]);

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <SQLEngineSuspense>
        <Workspace database={database} />
      </SQLEngineSuspense>
    </main>
  );
};

export default DatabasePage;
