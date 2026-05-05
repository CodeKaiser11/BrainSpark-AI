export default function GoalProgress() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <span>🎯</span> Today's Goal
      </h3>
      <div className="flex justify-between text-sm mb-2 font-medium">
        <span className="text-gray-600">Daily Study Target</span>
        <span className="text-brand-orange">65%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
        <div className="bg-brand-orange h-3 rounded-full w-[65%]"></div>
      </div>
      <p className="text-sm text-gray-500">1 hour 15 mins remaining to hit your target.</p>
    </div>
  );
}
