import { useCallback, useContext, useEffect, useState } from "react";
import { ArrowBigDownDash, Save, Play } from "lucide-react";

import { SQLiteDatabase } from "@/lib/sqlite";
import { AppDataContext, ModalContext } from "@/contexts";

import { Editor, Panel, ActionButton, ResultTable } from "@/components";
import { LoadQueryModal, SaveQueryModal } from "@/components/modals";

const SQL_CODE = `DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, comment TEXT
);

INSERT INTO users (name, comment) VALUES
  ("Alice", "Hello, World!"),
  ("Bob", "What are you guys upto?"),
  ("Cassey", "I solemnly swear that I am upto no good.");

SELECT * FROM users;`;

const defaultConfig = { playground: false };

const Workspace = ({ config = defaultConfig }) => {
  const { appData } = useContext(AppDataContext);
  const { openModal } = useContext(ModalContext);

  const [database, setDatabase] = useState();

  const [initialDoc, setInitialDoc] = useState(SQL_CODE);
  const [code, setCode] = useState("");

  const [tables, setTables] = useState(null);
  const [execTime, setExecTime] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (config.playground) return;

    const database = new SQLiteDatabase();
    setDatabase(database);

    return () => database.close();
  }, [config.playground]);

  const handleSaveClick = async () => {
    openModal(
      <SaveQueryModal
        onSubmit={({ queryName }) => {
          appData.savedQueries.addRecord({
            name: queryName,
            code,
            createdAt: new Date(),
            modifiedAt: new Date(),
          });
        }}
      />,
    );
  };
  const handleLoadClick = async () => {
    const queries = await appData.savedQueries.getAllRecords();

    openModal(
      <LoadQueryModal
        queries={queries}
        onSubmit={({ selectedQuery }) => {
          setInitialDoc(selectedQuery.code);
        }}
      />,
    );
  };
  const handleRunClick = async () => {
    if (processing) return;
    setProcessing(true);

    const db = config.playground ? new SQLiteDatabase() : database;

    db.exec(code)
      .then(({ result, time }) => {
        setTables(result);
        setExecTime(Math.round(time));
        setError("");
      })
      .catch((error) => {
        setTables(null);
        setExecTime(null);
        setError(error.message);
      })
      .finally(() => {
        setProcessing(false);

        if (config.playground) {
          db.close();
        }
      });
  };
  const handleCodeChange = useCallback((updatedCode) => {
    setCode(updatedCode);
  }, []);

  return (
    <div className="my-8 grid w-[90vw] flex-1 grid-cols-1 grid-rows-[50svh_auto] overflow-hidden rounded-sm border border-base-3 lg:max-h-[85svh] lg:grid-cols-2 lg:grid-rows-1">
      <Panel
        className="border-b border-base-3 lg:border-r lg:border-b-0"
        title="Query"
        barItems={
          <>
            <ActionButton
              icon={<Save className="w-4" />}
              display="Save"
              className="bg-emerald-400 hover:bg-emerald-300 disabled:bg-emerald-500"
              onClick={handleSaveClick}
            />
            <ActionButton
              icon={<ArrowBigDownDash className="w-4" />}
              display="Load"
              className="bg-amber-400 hover:bg-amber-300 disabled:bg-amber-500"
              onClick={handleLoadClick}
            />
            <ActionButton
              icon={<Play className="w-4" />}
              display={processing ? "Running..." : "Run"}
              className="bg-red-400 hover:bg-red-300 disabled:bg-red-500"
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
          execTime && <p className="italic">Query took {execTime} ms</p>
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
        ) : tables ? (
          <div className="flex h-min min-w-min flex-col items-center gap-8 p-8">
            {tables.map((table, index) => (
              <ResultTable table={table} key={index} />
            ))}
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
