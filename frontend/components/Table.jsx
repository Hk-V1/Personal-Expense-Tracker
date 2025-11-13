export default function Table({ data, columns, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2">{col.label}</th>
            ))}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr key={row.id} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2">{row[col.key]}</td>
              ))}
              <td className="px-4 py-2 space-x-2">
                <button onClick={() => onEdit(row)} className="text-blue-500 hover:underline">Edit</button>
                <button onClick={() => onDelete(row.id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
