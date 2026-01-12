import { ArrowBigDownDash, Play, Save } from "lucide-react";
import { useCallback, useState } from "react";
import type { QueryExecResult } from "sql.js";

import {
  ActionButton,
  Editor,
  ModalForm,
  Panel,
  TableView,
} from "@/components";
import { useAppData, useModal, useSQLEngine } from "@/hooks";
import { SQLiteDBManager } from "@/lib/sqlite";

const SQL_CODE = `CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, comment TEXT
);

INSERT INTO users (name, comment) VALUES
  ("Alice", "Hello, World!"),
  ("Bob", "What are you guys upto?"),
  ("Cassey", "I solemnly swear that I am upto no good.");

SELECT * FROM users;`;

interface WorkspaceConfig {
  sandbox: boolean;
}

interface WorkspaceProps {
  config?: WorkspaceConfig;
}

const defaultConfig = { sandbox: false };

const Workspace = ({ config = defaultConfig }: WorkspaceProps) => {
  const { openModal } = useModal();
  const { savedQueries, dbData } = useAppData();
  const { database, refreshDatabase } = useSQLEngine();

  const [initialDoc, setInitialDoc] = useState(config.sandbox ? SQL_CODE : "");
  const [code, setCode] = useState("");

  const [tables, setTables] = useState<QueryExecResult[] | null>(null);
  const [execTime, setExecTime] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const saveQuery = useCallback(
    async (code: string) => {
      openModal(
        <ModalForm
          title="Save Query"
          fields={[
            {
              name: "name",
              label: "Query Name",
              type: "text",
            },
          ]}
          submitText="Save"
          submitStyle="border-emerald-500 bg-emerald-400"
          onSubmit={(formData: FormData) => {
            savedQueries.addRecord({
              name: formData.get("name")!.toString(),
              code,
              createdAt: new Date(),
              modifiedAt: new Date(),
            });
          }}
        />,
      );
    },
    [openModal, savedQueries],
  );

  const loadQuery = useCallback(async () => {
    const queries = await savedQueries.getAllRecords();
    openModal(
      <ModalForm
        title="Load Query"
        fields={[
          {
            name: "query-index",
            label: "Select query to load:",
            type: "select",
            options: queries.map((query, index) => ({
              value: index,
              text: `[${query.id}] ${query.name}`,
            })),
            noOptionsMessage: "There are no saved queries",
          },
        ]}
        submitText="Load"
        submitStyle="border-amber-500 bg-amber-400"
        submitHidden={queries.length === 0}
        onSubmit={(formData: FormData) => {
          const queryIndex = Number(formData.get("query-index")!);
          const query = queries[queryIndex];

          setInitialDoc(query.code);
        }}
      />,
    );
  }, [openModal, savedQueries]);

  const runQuery = useCallback(
    async (query: string) => {
      if (processing) return;
      if (!database) {
        throw new Error("Database not found");
      }

      const dbManager = config.sandbox
        ? new SQLiteDBManager()
        : database.manager;

      setProcessing(true);
      dbManager
        .exec(query)
        .then(({ result, time }) => {
          setTables(result);
          setExecTime(Math.round(time));
          setError(null);

          if (config.sandbox) return;

          dbManager.getData().then((data) => {
            dbManager.getTables().then((tables) => {
              dbData.updateRecord(database.id, { data, tables });
              refreshDatabase();
            });
          });
        })
        .catch((error: unknown) => {
          setTables(null);
          setExecTime(null);

          if (error instanceof Error) {
            setError(error);
          } else {
            throw error;
          }
        })
        .finally(() => {
          setProcessing(false);

          if (config.sandbox) {
            dbManager.close();
          }
        });
    },
    [config.sandbox, database, processing, dbData, refreshDatabase],
  );

  const handleCodeChange = useCallback((updatedCode: string) => {
    setCode(updatedCode);
  }, []);

  return (
    <div className="grid flex-1 grid-cols-1 grid-rows-[50svh_auto] overflow-hidden lg:grid-cols-2 lg:grid-rows-1">
      <Panel
        className="border-b border-base-3 lg:border-r lg:border-b-0"
        title="Query"
        barItems={
          <>
            <ActionButton
              icon={<Save className="w-4" />}
              display="Save"
              className="bg-emerald-400 hover:bg-emerald-500"
              onClick={() => saveQuery(code)}
            />
            <ActionButton
              icon={<ArrowBigDownDash className="w-4" />}
              display="Load"
              className="bg-amber-400 hover:bg-amber-500"
              onClick={loadQuery}
            />
            <ActionButton
              icon={<Play className="w-4" />}
              display={processing ? "Running" : "Run"}
              className="bg-red-400 hover:bg-red-500 disabled:bg-red-600"
              onClick={() => runQuery(code)}
              disabled={processing}
            />
          </>
        }
      >
        <Editor
          initialDoc={initialDoc}
          onChange={handleCodeChange}
          runQuery={runQuery}
          saveQuery={saveQuery}
          loadQuery={loadQuery}
        />
      </Panel>
      <Panel
        title="Result"
        barItems={
          <>
            {!processing && execTime !== null && (
              <p className="italic">Query took {execTime} ms</p>
            )}
          </>
        }
      >
        {error ? (
          <div className="h-full min-w-min p-4 lg:p-8">
            <p className="ml-2 text-2xl font-bold text-red">SQL Error:</p>
            <div className="my-2 rounded-sm bg-base-3 p-4 font-[JetBrains_Mono]">
              {error.message}
            </div>
          </div>
        ) : processing ? (
          <div className="px-8 py-16 text-center">
            <em className="text-xl">Executing query...</em>
          </div>
        ) : tables && tables.length !== 0 ? (
          <div className="flex h-min min-w-min flex-col items-center gap-8 p-4">
            {tables.map((table, index) => (
              <TableView table={table} key={index} />
            ))}
          </div>
        ) : tables ? (
          <div className="px-8 py-16 text-center">
            <em className="text-xl">No results produced</em>
          </div>
        ) : (
          <div className="px-8 py-16 text-center">
            <em className="text-xl">Run a query to see results</em>
          </div>
        )}
      </Panel>
    </div>
  );
};

export default Workspace;
