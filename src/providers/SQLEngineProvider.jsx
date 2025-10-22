import { useEffect, useState } from "react";

import { SQLiteDBManager } from "@/lib/sqlite";

import { DatabaseContext } from "@/contexts";

const SQLEngineProvider = ({ children }) => {
  const [database, setDatabase] = useState(null);

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
    <DatabaseContext
      value={{
        engineLoading: loading,
        engineInitError: initError,
        database,
        setDatabase,
      }}
    >
      {children}
    </DatabaseContext>
  );
};

export default SQLEngineProvider;
