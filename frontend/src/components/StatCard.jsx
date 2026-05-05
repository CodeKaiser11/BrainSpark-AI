export default function StatCard({ stat }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${stat.bg}`}>
        {stat.icon}
      </div>
      <div className="text-3xl font-bold mb-1">{stat.value}</div>
      <div className="text-gray-500 font-medium text-sm">{stat.label}</div>
    </div>
  );
}
