import React from 'react';

export default function YouTubePicks() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <div className="text-6xl mb-4">▶️</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Smart YouTube Picks</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Don't waste time searching. BrainSpark finds the best educational videos for any topic.
        </p>
        <div className="inline-block mt-4 px-4 py-1 bg-gray-200 text-gray-700 font-bold rounded-full text-sm uppercase tracking-wide">
          Coming Soon in Phase 6
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center text-xl font-bold mx-auto">1</div>
            <h3 className="font-bold text-lg">Search Topic</h3>
            <p className="text-gray-500 text-sm">Tell us what you want to learn today.</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center text-xl font-bold mx-auto">2</div>
            <h3 className="font-bold text-lg">Curated Results</h3>
            <p className="text-gray-500 text-sm">Our AI analyzes video transcripts and ratings to find the highest quality content.</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center text-xl font-bold mx-auto">3</div>
            <h3 className="font-bold text-lg">Watch & Learn</h3>
            <p className="text-gray-500 text-sm">Watch the video directly in the app and take notes automatically.</p>
          </div>
        </div>
      </section>

      {/* CTA Area */}
      <section className="text-center bg-brand-dark p-10 rounded-3xl text-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">Find Videos</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">Enter a topic and let AI curate a playlist for you.</p>
        <div className="max-w-lg mx-auto relative">
          <input 
            type="text" 
            placeholder="E.g., Organic Chemistry, Basics of Economics..." 
            className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-6 text-white placeholder-gray-400 outline-none"
            disabled
          />
          <button className="mt-4 w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-orange-600 font-bold rounded-xl transition-colors shadow-sm text-lg flex items-center justify-center mx-auto gap-2 opacity-50 cursor-not-allowed">
            <span>🔍</span> Find Videos
          </button>
        </div>
      </section>

    </div>
  );
}
