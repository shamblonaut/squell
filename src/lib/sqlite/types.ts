import type { QueryExecResult } from "sql.js";

export interface OpenCommandPayload {
  data?: Uint8Array;
}

export interface ExecCommandPayload {
  sql: string;
}

export type CommandPayload = OpenCommandPayload | ExecCommandPayload;

interface BaseCommand {
  id: string;
  type: string;
  dbId: string;
}

export interface InitCommand extends BaseCommand {
  type: "init";
}

export interface OpenCommand extends BaseCommand {
  type: "open";
  payload: OpenCommandPayload;
}

export interface CloseCommand extends BaseCommand {
  type: "close";
}

export interface ExecCommand extends BaseCommand {
  type: "exec";
  payload: ExecCommandPayload;
}

export interface ExportCommand extends BaseCommand {
  type: "export";
}

export type SQLiteWorkerCommand =
  | InitCommand
  | OpenCommand
  | CloseCommand
  | ExecCommand
  | ExportCommand;
export type SQLiteWorkerCommandType = SQLiteWorkerCommand["type"];

export interface ExecResponsePayload {
  result: QueryExecResult[];
  time: number;
}

export interface ExportResponsePayload {
  data: Uint8Array;
}

interface BaseResponse {
  id: string;
  success: boolean;
}

export interface SuccessResponse extends BaseResponse {
  success: true;
}

export interface ExecResponse extends SuccessResponse {
  payload: ExecResponsePayload;
}

export interface ExportResponse extends SuccessResponse {
  payload: ExportResponsePayload;
}

export interface ErrorResponse extends BaseResponse {
  success: false;
  error: unknown;
}

export type SQLiteWorkerResponse =
  | ExecResponse
  | ExportResponse
  | SuccessResponse
  | ErrorResponse;

export type ResponseFor<T extends SQLiteWorkerCommandType> = T extends "exec"
  ? ExecResponse
  : T extends "export"
    ? ExportResponse
    : SuccessResponse;

export type WorkerPromiseControls<T> = {
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
};
