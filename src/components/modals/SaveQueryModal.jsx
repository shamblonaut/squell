import { useContext, useState } from "react";

import { ModalContext } from "@/contexts";

const SaveQueryModal = ({ onSubmit }) => {
  const { closeModal } = useContext(ModalContext);

  const [queryName, setQueryName] = useState("Untitled Query");

  return (
    <div className="flex min-w-72 flex-col gap-8 text-lg">
      <h1 className="text-center text-2xl font-bold">Save Query</h1>
      <div className="flex flex-col gap-4 px-2">
        <label htmlFor="query-name">Assign a name to your query:</label>
        <input
          className="rounded-md border border-base-3 bg-base-2 px-3 py-1"
          name="query-name"
          id="query-name"
          type="text"
          value={queryName}
          onChange={(event) => setQueryName(event.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <button
          className="flex-1 rounded-md border border-base-3 bg-base-2 py-2 font-bold"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="flex-1 rounded-md border border-emerald-500 bg-emerald-400 py-2 font-bold"
          onClick={() => {
            onSubmit({ queryName: queryName || "Untitled Query" });
            closeModal();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SaveQueryModal;
