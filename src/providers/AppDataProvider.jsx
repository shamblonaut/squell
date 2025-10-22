import { useEffect, useState } from "react";

import { AppData, AppDataType } from "@/lib/appData";

import { AppDataContext } from "@/contexts";

const AppDataProvider = ({ children }) => {
  const [appData, setAppData] = useState({
    savedQueries: null,
    dbData: null,
  });

  useEffect(() => {
    const savedQueries = new AppData(AppDataType.SAVED_QUERIES);
    const dbData = new AppData(AppDataType.DB_DATA);

    AppData.openDB().then(() => {
      setAppData({ savedQueries, dbData });
    });

    return () => {
      AppData.closeDB();
    };
  }, []);

  return <AppDataContext value={appData}>{children}</AppDataContext>;
};

export default AppDataProvider;
