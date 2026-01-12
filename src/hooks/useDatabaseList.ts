import { useEffect, useState } from "react";

import { useAppData, useSQLEngine } from "@/hooks";
import type { DBDataRecord } from "@/lib/appData/types";

const useDatabaseList = () => {
  const { dbData } = useAppData();
  const { isLoading: isEngineLoading, error: engineError } = useSQLEngine();

  const [databaseList, setDatabaseList] = useState<DBDataRecord[]>([]);

  useEffect(() => {
    // Ensure DB is available and not closed
    if (isEngineLoading || engineError) return;

    dbData.getAllRecords().then((records) => setDatabaseList(records));
  }, [dbData, isEngineLoading, engineError]);

  return { databaseList, setDatabaseList };
};

export default useDatabaseList;
