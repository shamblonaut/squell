import { useContext, useState } from "react";

import { ModalContext } from "@/contexts";

const LoadQueryModal = ({ queries, onSubmit }) => {
  const { closeModal } = useContext(ModalContext);

  const [selectedQuery, setSelectedQuery] = useState(queries[0]);

  const quantity = queries.length;
  return (
    <div className="flex min-w-72 flex-col gap-8 text-lg">
      <h1 className="text-center text-2xl font-bold">Load Query</h1>
      <div className="flex flex-col gap-4 px-2">
        {quantity > 0 ? (
          <div className="flex flex-col gap-2">
            <label htmlFor="query-selector">Select query to load:</label>
            <select
              className="rounded-md border border-base-3 bg-base-2 px-3 py-1"
              name="query-selector"
              id="query-selector"
              onChange={(event) =>
                setSelectedQuery(queries[event.target.value])
              }
            >
              {queries.map((query, index) => (
                <option key={index} value={index}>
                  [{query.id}] {query.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="text-center">There are no saved queries!</p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          className="flex-1 rounded-md border border-base-3 bg-base-2 py-2 font-bold"
          onClick={closeModal}
        >
          Cancel
        </button>
        {quantity > 0 && (
          <button
            className="flex-1 rounded-md border border-emerald-500 bg-emerald-400 py-2 font-bold"
            onClick={() => {
              onSubmit({ selectedQuery });
              closeModal();
            }}
          >
            Load
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadQueryModal;
