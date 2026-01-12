import { useCallback, useEffect, useState } from "react";

import type { SQLEngineDatabase } from "@/contexts";
import { SQLEngineContext } from "@/contexts";
import { useAppData } from "@/hooks";
import { SQLiteDBManager } from "@/lib/sqlite";

const SQLEngineProvider = ({ children }: { children: React.ReactNode }) => {
  const { dbData } = useAppData();

  const [database, setDatabase] = useState<SQLEngineDatabase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    SQLiteDBManager.init()
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const switchDatabase = useCallback(
    async (dbId: number) => {
      if (database && database.id === dbId) {
        return;
      } else if (database) {
        database.manager.close();
        setDatabase(null);
      }

      return dbData.getRecord(dbId).then((record) => {
        if (!record) {
          throw new Error("Database not found");
        }

        const { id, name, tables, data } = record;
        const manager = new SQLiteDBManager(data);
        setDatabase({ id, name, tables, manager });
      });
    },
    [database, dbData],
  );

  const refreshDatabase = async () => {
    if (!database) return;

    return dbData.getRecord(database.id).then((record) => {
      const { id, name, tables, data } = record;
      const manager = new SQLiteDBManager(data);
      setDatabase({ id, name, tables, manager });
    });
  };

  return (
    <SQLEngineContext
      value={{
        database,
        switchDatabase,
        refreshDatabase,
        isLoading,
        error,
      }}
    >
      {children}
    </SQLEngineContext>
  );
};

export default SQLEngineProvider;
