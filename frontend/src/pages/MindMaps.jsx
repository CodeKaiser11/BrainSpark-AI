import React from 'react';

export default function MindMaps() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <div className="text-6xl mb-4">🧠</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Mind Maps</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Visualize complex topics instantly. Type any subject and let AI generate a beautifully structured mind map.
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
            <h3 className="font-bold text-lg">Enter a Topic</h3>
            <p className="text-gray-500 text-sm">Provide a broad subject or a specific concept you want to explore.</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center text-xl font-bold mx-auto">2</div>
            <h3 className="font-bold text-lg">AI Generation</h3>
            <p className="text-gray-500 text-sm">BrainSpark connects the dots and extracts key subtopics.</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center text-xl font-bold mx-auto">3</div>
            <h3 className="font-bold text-lg">Explore & Expand</h3>
            <p className="text-gray-500 text-sm">Navigate the interactive map to deepen your understanding.</p>
          </div>
        </div>
      </section>

      {/* CTA Area */}
      <section className="text-center bg-brand-dark p-10 rounded-3xl text-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">Generate your Map</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">Enter any topic below to see the magic happen.</p>
        <div className="max-w-lg mx-auto relative">
          <input 
            type="text" 
            placeholder="E.g., Quantum Mechanics, The French Revolution..." 
            className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-6 text-white placeholder-gray-400 outline-none"
            disabled
          />
          <button className="mt-4 w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-orange-600 font-bold rounded-xl transition-colors shadow-sm text-lg opacity-50 cursor-not-allowed">
            Generate Mind Map
          </button>
        </div>
      </section>

    </div>
  );
}
