import React, { useEffect, useState } from "react";

import type { AppDataContextValue } from "@/contexts";
import { AppDataContext } from "@/contexts";
import { AppData, AppDataType } from "@/lib/appData";

const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [appData, setAppData] = useState<AppDataContextValue | null>(null);

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

  if (!appData) {
    return "Initializing App...";
  }

  return <AppDataContext value={appData}>{children}</AppDataContext>;
};

export default AppDataProvider;
