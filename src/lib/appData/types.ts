import type { SqlValue } from "sql.js";
import type { AppDataType } from "./config";

export interface SavedQueryRecord {
  id: number;
  name: string;
  code: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface DBDataRecord {
  id: number;
  name: string;
  data: Uint8Array;
  tables: SqlValue[][];
}

interface RecordMap {
  [AppDataType.SAVED_QUERIES]: SavedQueryRecord;
  [AppDataType.DB_DATA]: DBDataRecord;
}

export type RecordOf<T extends AppDataType> = RecordMap[T];
export type NewRecordOf<T extends AppDataType> = Omit<RecordMap[T], "id">;
