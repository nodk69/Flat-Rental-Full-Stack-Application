const Table = ({ data, columns }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              {columns.map((col) => (
                <th key={col} className="p-3">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b">
                {columns.map((col) => (
                  <td key={col} className="p-3">{row[col.toLowerCase()]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;
  