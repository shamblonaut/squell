import { useEffect, useState } from "react";

import type { SQLEngineDatabase } from "@/contexts";
import { SQLEngineContext } from "@/contexts";
import { SQLiteDBManager } from "@/lib/sqlite";

const SQLEngineProvider = ({ children }: { children: React.ReactNode }) => {
  const [database, setDatabase] = useState<SQLEngineDatabase | null>(null);

  const [loading, setLoading] = useState(true);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    SQLiteDBManager.init()
      .catch((error) => {
        setInitError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SQLEngineContext
      value={{
        engineLoading: loading,
        engineInitError: initError,
        database,
        setDatabase,
      }}
    >
      {children}
    </SQLEngineContext>
  );
};

export default SQLEngineProvider;
