import { Link } from 'react-router-dom';

export default function FeatureGrid({ features }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Your Study Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {features.map((feature, i) => (
          feature.active ? (
            <Link key={i} to={feature.path} className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-brand-orange hover:shadow-md transition-all cursor-pointer flex items-center gap-4">
              <div className="text-4xl bg-orange-50 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">{feature.icon}</div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-brand-orange transition-colors">{feature.name}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            </Link>
          ) : (
            <div key={i} className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 opacity-60 cursor-not-allowed flex items-center gap-4">
              <div className="text-4xl bg-gray-100 w-16 h-16 rounded-xl flex items-center justify-center grayscale">{feature.icon}</div>
              <div>
                <h3 className="font-bold text-lg text-gray-700">{feature.name}</h3>
                <p className="text-gray-500 text-xs mt-1 bg-gray-200 inline-block px-2 py-0.5 rounded-full">Coming Soon</p>
              </div>
            </div>
          )
        ))}
      </div>
    </section>
  );
}
