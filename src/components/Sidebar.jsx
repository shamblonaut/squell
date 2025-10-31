import { Link, useParams } from "react-router";
import { PanelLeftClose, Table } from "lucide-react";

import { useSQLEngine } from "@/hooks";

import { DatabaseSwitcher } from "@/components";

import logo from "/logo.svg";

const Sidebar = ({ open, close }) => {
  const { tableName } = useParams();

  const { database } = useSQLEngine();

  if (!open || !database) return;
  return (
    <div
      onClick={close}
      className="fixed inset-0 z-1 flex items-center justify-center bg-overlay backdrop-blur-xs lg:relative lg:w-[max(16vw,_16rem)]"
    >
      <aside
        onClick={(event) => event.stopPropagation()}
        className="h-[90svh] w-[90vw] rounded-xl border border-base-3 bg-base-2 lg:h-full lg:w-full lg:rounded-none lg:border-0 lg:border-r lg:border-base-3"
      >
        <div className="flex h-16 justify-between border-b border-base-3 p-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Squell Logo" className="h-auto w-8" />
            <h1 className="text-3xl font-bold text-purple">SQUELL</h1>
          </Link>
          <button onClick={close}>
            <PanelLeftClose className="w-5 text-invert-1" />
          </button>
        </div>
        {database && (
          <div className="flex h-16 items-center justify-center border-b border-base-3">
            <DatabaseSwitcher currentDB={database} />
          </div>
        )}
        <div className="flex h-16 items-center border-b border-base-3 py-4 font-bold">
          <div className="px-4">Tables</div>
        </div>
        <div>
          {database?.tables && (
            <ul className="flex flex-col gap-1 px-2 py-4">
              {database.tables.map((table, index) => (
                <li key={index}>
                  <Link
                    to={`/db/${database.id}/table/${table[1]}`}
                    className={`${table[1] === tableName ? "bg-base-3" : ""} flex w-full gap-2 rounded-sm p-2 hover:bg-base-3`}
                  >
                    <Table className="w-4 text-invert-1" />
                    <p>{table[1]}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
