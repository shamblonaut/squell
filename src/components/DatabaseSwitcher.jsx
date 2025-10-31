import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ChevronsUpDown, Database } from "lucide-react";

import { useDatabaseList } from "@/hooks";
import { Popup } from "@/components";

const DatabaseSwitcher = ({ currentDB }) => {
  const { databaseList } = useDatabaseList();

  const [isListOpen, setIsListOpen] = useState(false);

  const filteredList = useMemo(
    () => databaseList.filter((database) => database.id !== currentDB.id),
    [databaseList, currentDB],
  );

  if (!currentDB) return;

  return (
    <div className="relative m-2 flex flex-1 gap-[1px]">
      <Link
        to={`/db/${currentDB.id}`}
        className={`${filteredList.length > 0 ? "rounded-r-none" : "rounded-r-md"} flex flex-1 items-center justify-between rounded-l-md bg-base-3 p-3 hover:bg-base-4`}
      >
        <div className="flex gap-2">
          <Database className="w-4" />
          <p className="line-clamp-1 flex-1 text-start font-bold text-ellipsis">
            {currentDB.name}
          </p>
        </div>
      </Link>
      {filteredList.length > 0 && (
        <button
          onClick={() => setIsListOpen((prev) => !prev)}
          className="flex items-center justify-between rounded-l-none rounded-r-md bg-base-3 p-3 hover:bg-base-4"
        >
          <ChevronsUpDown className="w-4" />
        </button>
      )}
      <Popup
        open={isListOpen}
        onClose={() => {
          if (isListOpen) setIsListOpen(false);
        }}
        className="mt-1"
      >
        <ul className="flex flex-col gap-2">
          {filteredList.map((database) => (
            <li key={database.id} className="flex">
              <Link
                to={`/db/${database.id}`}
                onClick={() => setIsListOpen(false)}
                className="flex-1 rounded-md p-2 text-start font-medium hover:bg-base-4"
              >
                <div className="flex gap-2">
                  <Database className="w-4" />
                  <p className="line-clamp-1 flex-1 font-bold text-ellipsis">
                    {database.name}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Popup>
    </div>
  );
};

export default DatabaseSwitcher;
