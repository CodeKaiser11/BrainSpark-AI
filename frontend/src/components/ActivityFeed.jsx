export default function ActivityFeed({ activities }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <span>⏱️</span> Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex gap-4 items-start relative">
            {i !== activities.length - 1 && (
              <div className="absolute left-4 top-10 bottom-[-16px] w-px bg-gray-100"></div>
            )}
            <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 z-10">
              {activity.icon}
            </div>
            <div>
              <div className="font-medium text-sm">{activity.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
