export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 text-center">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
