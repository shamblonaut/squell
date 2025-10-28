import { Plus } from "lucide-react";

import { SQLiteDBManager } from "@/lib/sqlite";

import { useAppData, useDatabaseList, useModal } from "@/hooks";
import { DatabaseItem, ModalForm } from "@/components";

const DatabaseList = () => {
  const { dbData } = useAppData();
  const { openModal } = useModal();
  const { databaseList, setDatabaseList } = useDatabaseList();

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
        submitStyle="border-emerald-500 bg-emerald-400"
        onSubmit={async (formData) => {
          const manager = new SQLiteDBManager();

          const name = formData.get("name");
          const data = await manager.getData();
          const tables = await manager.getTables();
          const id = await dbData.addRecord({ name, data, tables });

          setDatabaseList((prevList) => [...prevList, { id, name, tables }]);
        }}
      />,
    );
  };

  return (
    <ul className="mx-8 grid grid-cols-[repeat(auto-fill,_minmax(min(24rem,_80vw),_1fr))] gap-4">
      {databaseList.map((database) => (
        <li key={database.id}>
          <DatabaseItem database={database} setDatabaseList={setDatabaseList} />
        </li>
      ))}
      <li className="flex">
        <button
          onClick={handleCreateClick}
          className="flex h-40 flex-1 flex-col items-center justify-center overflow-clip rounded-lg border-3 border-dashed border-base-3"
        >
          <div className="flex w-[33%] items-center justify-center">
            <Plus className="h-auto w-[33%] text-invert-1" />
          </div>
          <div className="flex flex-col justify-center py-2">
            <p className="text-lg font-medium">Create New Database</p>
          </div>
        </button>
      </li>
    </ul>
  );
};

export default DatabaseList;
