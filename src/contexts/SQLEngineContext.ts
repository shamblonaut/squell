import { createContext } from "react";
import type { SqlValue } from "sql.js";

import type { SQLiteDBManager } from "@/lib/sqlite";

export interface SQLEngineDatabase {
  id: number;
  name: string;
  tables: SqlValue[][];
  manager: SQLiteDBManager;
}

export interface SQLEngineContextValue {
  database: SQLEngineDatabase | null;
  switchDatabase: (dbId: number) => Promise<void>;
  refreshDatabase: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

export const SQLEngineContext = createContext<
  SQLEngineContextValue | undefined
>(undefined);
