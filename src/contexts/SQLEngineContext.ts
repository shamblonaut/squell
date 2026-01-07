import React, { createContext } from "react";
import type { SqlValue } from "sql.js";

import type { SQLiteDBManager } from "@/lib/sqlite";

export interface SQLEngineDatabase {
  id: number;
  name: string;
  tables: SqlValue[][];
  manager: SQLiteDBManager | null;
}

export interface SQLEngineContextValue {
  engineLoading: boolean;
  engineInitError: string | null;
  database: SQLEngineDatabase | null;
  setDatabase: React.Dispatch<React.SetStateAction<SQLEngineDatabase | null>>;
}

export const SQLEngineContext = createContext<
  SQLEngineContextValue | undefined
>(undefined);
