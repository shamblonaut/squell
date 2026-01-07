import { useEffect, useState } from "react";

import type { SQLEngineDatabase } from "@/contexts/SQLEngineContext";
import { useAppData, useSQLEngine } from "@/hooks";
import { AppData } from "@/lib/appData";

const useDatabaseList = () => {
  const { dbData } = useAppData();
  const { engineLoading, engineInitError } = useSQLEngine();

  const [databaseList, setDatabaseList] = useState<SQLEngineDatabase[]>([]);

  useEffect(() => {
    // Ensure DB is available and not closed
    if (!dbData || !AppData.db || engineLoading || engineInitError) return;

    dbData
      .getAllRecords()
      .then((records) =>
        setDatabaseList(
          records.map(
            (record) => ({ ...record, manager: null }) as SQLEngineDatabase,
          ),
        ),
      );
  }, [dbData, engineLoading, engineInitError]);

  return { databaseList, setDatabaseList };
};

export default useDatabaseList;
