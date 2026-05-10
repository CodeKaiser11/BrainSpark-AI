import { Link } from 'react-router-dom';

export default function FeatureGrid({ features }) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Your AI Power Suite</h2>
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-brand-orange animate-pulse"></span>
          <span className="w-3 h-3 rounded-full bg-gray-200"></span>
          <span className="w-3 h-3 rounded-full bg-gray-200"></span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 perspective-1000">
        {features.map((feature, i) => {
          const delayClass = `delay-${(i + 1) * 100}`;
          
          return feature.active ? (
            <Link 
              key={i} 
              to={feature.path} 
              className={`group relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-brand-orange hover:shadow-xl transition-all duration-500 hover:-translate-y-2 opacity-0 animate-fade-in-up ${delayClass} flex flex-col items-center text-center overflow-hidden`}
            >
              {/* Background Accent Gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-brand-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Icon Container */}
              <div className="mb-6 relative">
                <div className="text-5xl bg-orange-50 w-24 h-24 rounded-2xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-inner">
                  {feature.icon}
                </div>
                {/* Decorative particles */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-200 rounded-full blur-xl group-hover:blur-md transition-all"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-100 rounded-full blur-xl group-hover:blur-md transition-all"></div>
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-2 group-hover:text-brand-orange transition-colors">{feature.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{feature.desc}</p>
              </div>

              {/* Action Button (Flashcard Style) */}
              <div className="mt-auto flex items-center gap-2 text-brand-orange font-bold text-sm uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Launch Module <span>→</span>
              </div>
            </Link>
          ) : (
            <div 
              key={i} 
              className={`bg-gray-50/50 p-8 rounded-3xl border border-gray-100 opacity-60 flex flex-col items-center text-center grayscale animate-fade-in-up ${delayClass}`}
            >
              <div className="text-5xl bg-gray-100 w-24 h-24 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl text-gray-700 mb-2">{feature.name}</h3>
              <p className="text-gray-400 text-xs mt-1 bg-gray-200 inline-block px-3 py-1 rounded-full font-medium">Coming Soon</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
