import React from 'react';

export default function SnapSolve() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <div className="text-6xl mb-4">📸</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Snap & Solve</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stuck on a math or science problem? Just take a photo and BrainSpark AI will explain it step-by-step.
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
            <h3 className="font-bold text-lg">Snap a Photo</h3>
            <p className="text-gray-500 text-sm">Take a clear picture of any equation or word problem.</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center text-xl font-bold mx-auto">2</div>
            <h3 className="font-bold text-lg">AI Processing</h3>
            <p className="text-gray-500 text-sm">Our OCR engine instantly reads and understands the problem.</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center text-xl font-bold mx-auto">3</div>
            <h3 className="font-bold text-lg">Step-by-Step Fix</h3>
            <p className="text-gray-500 text-sm">Get a detailed, easy-to-understand breakdown of the solution.</p>
          </div>
        </div>
      </section>

      {/* CTA Area */}
      <section className="text-center bg-brand-dark p-10 rounded-3xl text-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">Try it out</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">Upload an image of a problem from your computer or use your camera.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-brand-orange hover:bg-orange-600 font-bold rounded-xl transition-colors shadow-sm text-lg flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
            <span>📷</span> Take Photo
          </button>
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 font-bold rounded-xl transition-colors shadow-sm text-lg flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
            <span>📁</span> Upload Image
          </button>
        </div>
      </section>

    </div>
  );
}
