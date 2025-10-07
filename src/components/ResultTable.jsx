const ResultTable = ({ table }) => {
  return (
    <table className="w-full border-collapse border-2 border-invert-2 text-center font-[JetBrains_Mono] lg:mx-auto">
      <thead>
        <tr>
          {table.columns.map((column, index) => (
            <th
              key={index}
              className="min-w-min border-2 border-invert-2 px-8 py-2"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.values.map((row, index) => (
          <tr key={index}>
            {row.map((value, index) => (
              <td
                key={index}
                className="min-w-min border-2 border-invert-2 px-8 py-2"
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;
