import { useContext, useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router";
import { Database, Plus } from "lucide-react";

import { AppDataContext, ModalContext } from "@/contexts";
import { SQLiteDBManager } from "@/lib/sqlite";

import { SQLEngineSuspense, ModalForm } from "@/components";

const DashboardPage = () => {
  const { sqlLoading, sqlInitError } = useOutletContext();
  const { dbData } = useContext(AppDataContext);
  const { openModal } = useContext(ModalContext);

  const [databaseList, setDatabaseList] = useState([]);

  useEffect(() => {
    if (!dbData || sqlLoading || sqlInitError) return;

    dbData.getAllRecords().then(async (records) =>
      setDatabaseList(
        await Promise.all(
          records.map(async (record) => {
            const name = record.name;
            const manager = new SQLiteDBManager(record.data);
            const tables = await manager
              .exec("SELECT * FROM sqlite_master WHERE type='table'")
              .then(({ result }) =>
                result.length > 0 ? result[0].values : [],
              );

            return { name, manager, tables };
          }),
        ),
      ),
    );
  }, [dbData, sqlLoading, sqlInitError]);

  const handleCreateClick = () => {
    openModal(
      <ModalForm
        title="Create Database"
        fields={[
          {
            name: "name",
            label: "Database Name",
            type: "text",
          },
        ]}
        submitText="Create"
        onSubmit={async (formData) => {
          const name = formData.get("name");
          const manager = new SQLiteDBManager();

          setDatabaseList((prevList) => [
            ...prevList,
            { name, manager, tables: [] },
          ]);

          const data = await manager.getData();
          dbData.addRecord({ name, data });
        }}
      />,
    );
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <h1 className="mt-8 mb-4 text-center text-3xl font-bold">Databases</h1>
      <SQLEngineSuspense>
        <ul className="mx-4 grid grid-cols-[repeat(auto-fill,_minmax(min(24rem,_90vw),_1fr))]">
          {databaseList.map((database) => (
            <li key={database.manager.id}>
              <Link
                to=""
                className="m-4 flex h-40 overflow-clip rounded-lg border border-base-3"
              >
                <div className="flex w-[33%] items-center justify-center bg-base-3">
                  <Database className="h-auto w-[33%] text-invert-1" />
                </div>
                <div className="flex-1 bg-base-2 p-4">
                  <strong className="text-xl">{database.name}</strong>
                  <p className="my-4 font-medium">
                    {database.tables.length} table
                    {database.tables.length !== 1 && "s"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
          <li className="flex">
            <button
              onClick={handleCreateClick}
              className="m-4 flex h-40 flex-1 overflow-clip rounded-lg border border-base-3"
            >
              <div className="flex w-[33%] items-center justify-center bg-base-3">
                <Plus className="h-auto w-[33%] text-invert-1" />
              </div>
              <div className="flex flex-1 flex-col justify-center bg-base-2">
                <p className="text-lg font-medium">Create New Database</p>
              </div>
            </button>
          </li>
        </ul>
      </SQLEngineSuspense>
    </main>
  );
};

export default DashboardPage;
