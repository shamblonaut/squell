import { createContext } from "react";

import type { AppData } from "@/lib/appData";
import { AppDataType } from "@/lib/appData";

export interface AppDataContextValue {
  savedQueries: AppData<typeof AppDataType.SAVED_QUERIES> | null;
  dbData: AppData<typeof AppDataType.DB_DATA> | null;
}

export const AppDataContext = createContext<AppDataContextValue | undefined>(
  undefined,
);
