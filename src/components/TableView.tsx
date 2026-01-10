import type { QueryExecResult } from "sql.js";

interface TableViewProps {
  table: QueryExecResult;
}

const TableView = ({ table }: TableViewProps) => {
  if (!table) {
    return (
      <p className="my-16 text-center text-2xl font-medium text-red">
        Error: Table not found!
      </p>
    );
  }

  return (
    <table className="w-full text-center font-[JetBrains_Mono]">
      <thead>
        <tr>
          {table.columns.map((column, index) => (
            <th key={index} className="bg-base-3 px-4 py-2">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.values.map((row, index) => (
          <tr key={index}>
            {row.map((value, index) => (
              <td key={index} className="bg-base-2 px-4 py-2">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
