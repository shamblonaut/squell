import { useEffect, useState } from "react";

import { AppData } from "@/lib/appData";

import { useAppData, useSQLEngine } from "@/hooks";

const useDatabaseList = () => {
  const { dbData } = useAppData();
  const { engineLoading, engineInitError } = useSQLEngine();

  const [databaseList, setDatabaseList] = useState([]);

  useEffect(() => {
    // Ensure DB is available and not closed
    if (!dbData || !AppData.db || engineLoading || engineInitError) return;

    dbData.getAllRecords().then(async (records) =>
      setDatabaseList(
        await Promise.all(
          records.map(async (record) => {
            const { id, name, tables } = record;
            return { id, name, tables };
          }),
        ),
      ),
    );
  }, [dbData, engineLoading, engineInitError]);

  return { databaseList, setDatabaseList };
};

export default useDatabaseList;
