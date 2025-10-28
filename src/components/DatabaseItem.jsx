import { useState } from "react";
import { Link } from "react-router";
import { Database, EllipsisVertical, SquarePen, Trash } from "lucide-react";

import { useAppData, useModal } from "@/hooks";
import { ModalForm, Popup } from "@/components";

const DatabaseItem = ({ database, setDatabaseList }) => {
  const { openModal } = useModal();
  const { dbData } = useAppData();

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleEdit = () => {
    openModal(
      <ModalForm
        title="Edit Database"
        fields={[
          {
            name: "name",
            label: "Database Name",
            type: "text",
            defaultValue: database.name,
          },
        ]}
        submitText="Save"
        submitStyle="border-emerald-500 bg-emerald-400"
        onSubmit={async (formData) => {
          const name = formData.get("name");
          await dbData.updateRecord(database.id, { name });

          setDatabaseList((prevList) => {
            const dbList = [...prevList];
            for (let i = 0; i < dbList.length; i++) {
              if (dbList[i].id !== database.id) continue;

              dbList.splice(i, 1, { ...dbList[i], name });
            }
            return dbList;
          });
        }}
      />,
    );

    setIsOptionsOpen(false);
  };

  const handleRemove = () => {
    openModal(
      <ModalForm
        title={`Remove ${database.name}?`}
        fields={[
          {
            name: "confirm",
            type: "custom",
            content: (
              <div>
                <p>Are you sure you want to remove this database?</p>
                <p className="mt-2 font-bold text-red">
                  Warning: This action is irreversible
                </p>
              </div>
            ),
          },
        ]}
        submitText="Confirm"
        submitStyle="border-red bg-red"
        onSubmit={async () => {
          await dbData.removeRecord(database.id);

          setDatabaseList((prevList) =>
            prevList.filter((db) => db.id !== database.id),
          );
        }}
      />,
    );

    setIsOptionsOpen(false);
  };

  return (
    <div className="relative">
      <Link
        to={`/db/${database.id}`}
        className="flex h-40 overflow-clip rounded-lg border border-base-3 bg-base-2"
      >
        <div className="flex w-[33%] items-center justify-center bg-base-3">
          <Database className="h-auto w-[33%] text-invert-1" />
        </div>
        <div className="flex-1 p-4">
          <strong className="text-xl">{database.name}</strong>
          <p className="my-4 font-medium">
            {database.tables.length} table
            {database.tables.length !== 1 && "s"}
          </p>
        </div>
      </Link>
      <div className="absolute top-0 right-0 m-2">
        <button
          onClick={() => setIsOptionsOpen((prev) => !prev)}
          className="h-min rounded-md border border-base-4 bg-base-3 px-1"
        >
          <EllipsisVertical className="w-4" />
        </button>
        <Popup
          open={isOptionsOpen}
          onClose={() => setIsOptionsOpen(false)}
          rightAligned={true}
        >
          <div className="flex min-w-28 flex-col gap-1 font-bold">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 rounded-md px-2 py-1 text-start hover:bg-base-4"
            >
              <SquarePen className="w-4 stroke-2" />
              Edit
            </button>
            <button
              onClick={handleRemove}
              className="flex items-center gap-2 rounded-md px-2 py-1 text-start text-red hover:bg-base-4"
            >
              <Trash className="w-4 stroke-3" />
              Remove
            </button>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default DatabaseItem;
