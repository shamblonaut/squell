import { useCallback, useState } from "react";
import { ArrowBigDownDash, Save, Play } from "lucide-react";

import { SQLiteDBManager } from "@/lib/sqlite";

import { useAppData, useModal, useSQLEngine } from "@/hooks";

import {
  Editor,
  Panel,
  ActionButton,
  ResultTable,
  ModalForm,
} from "@/components";

const SQL_CODE = `CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, comment TEXT
);

INSERT INTO users (name, comment) VALUES
  ("Alice", "Hello, World!"),
  ("Bob", "What are you guys upto?"),
  ("Cassey", "I solemnly swear that I am upto no good.");

SELECT * FROM users;`;

const defaultConfig = { sandbox: false };

const Workspace = ({ config = defaultConfig }) => {
  const { openModal } = useModal();
  const { savedQueries, dbData } = useAppData();
  const { database, setDatabase } = useSQLEngine();

  const [initialDoc, setInitialDoc] = useState(config.sandbox ? SQL_CODE : "");
  const [code, setCode] = useState("");

  const [tables, setTables] = useState(null);
  const [execTime, setExecTime] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSaveClick = async () => {
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
        onSubmit={(formData) => {
          savedQueries.addRecord({
            name: formData.get("name"),
            code,
            createdAt: new Date(),
            modifiedAt: new Date(),
          });
        }}
      />,
    );
  };

  const handleLoadClick = async () => {
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
        onSubmit={(formData) => {
          const query = queries[formData.get("query-index")];
          setInitialDoc(query.code);
        }}
      />,
    );
  };

  const handleRunClick = async () => {
    if (processing || !dbData) return;
    setProcessing(true);

    const dbManager = config.sandbox ? new SQLiteDBManager() : database.manager;

    dbManager
      .exec(code)
      .then(({ result, time }) => {
        setTables(result);
        setExecTime(Math.round(time));
        setError("");

        if (config.sandbox) return;

        dbManager.getData().then((data) => {
          dbManager.getTables().then((tables) => {
            dbData.updateRecord(database.id, { data, tables });
            setDatabase((prev) => ({ ...prev, tables }));
          });
        });
      })
      .catch((error) => {
        setTables(null);
        setExecTime(null);
        setError(error.message);
      })
      .finally(() => {
        setProcessing(false);

        if (config.sandbox) {
          dbManager.close();
        }
      });
  };
  const handleCodeChange = useCallback((updatedCode) => {
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
              onClick={handleSaveClick}
            />
            <ActionButton
              icon={<ArrowBigDownDash className="w-4" />}
              display="Load"
              className="bg-amber-400 hover:bg-amber-500"
              onClick={handleLoadClick}
            />
            <ActionButton
              icon={<Play className="w-4" />}
              display={processing ? "Running" : "Run"}
              className="bg-red-400 hover:bg-red-500 disabled:bg-red-600"
              onClick={handleRunClick}
              disabled={processing}
            />
          </>
        }
      >
        <Editor initialDoc={initialDoc} onChange={handleCodeChange} />
      </Panel>
      <Panel
        title="Result"
        barItems={
          !processing &&
          execTime !== null && (
            <p className="italic">Query took {execTime} ms</p>
          )
        }
      >
        {error ? (
          <div className="h-full min-w-min p-4 lg:p-8">
            <p className="ml-2 text-2xl font-bold text-red">SQL Error:</p>
            <div className="my-2 rounded-sm bg-base-3 p-4 font-[JetBrains_Mono]">
              {error}
            </div>
          </div>
        ) : processing ? (
          <div className="px-8 py-16 text-center">
            <em className="text-xl">Executing query...</em>
          </div>
        ) : tables && tables.length !== 0 ? (
          <div className="flex h-min min-w-min flex-col items-center gap-8 p-8">
            {tables.map((table, index) => (
              <ResultTable table={table} key={index} />
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
