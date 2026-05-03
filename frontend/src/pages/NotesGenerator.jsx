import React from 'react';

export default function NotesGenerator() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <div className="text-6xl mb-4">📝</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Smart Notes Generator</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Turn long documents, PDFs, and articles into concise, easy-to-read study notes in seconds.
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
            <h3 className="font-bold text-lg">Upload Material</h3>
            <p className="text-gray-500 text-sm">Upload a PDF, document, or paste a link to an article.</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center text-xl font-bold mx-auto">2</div>
            <h3 className="font-bold text-lg">AI Summarization</h3>
            <p className="text-gray-500 text-sm">Gemini reads and extracts the most important points.</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center text-xl font-bold mx-auto">3</div>
            <h3 className="font-bold text-lg">Save & Study</h3>
            <p className="text-gray-500 text-sm">Review the clean, formatted notes and save them to your profile.</p>
          </div>
        </div>
      </section>

      {/* CTA Area */}
      <section className="text-center bg-brand-dark p-10 rounded-3xl text-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">Process your Notes</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">Drag and drop a PDF file here or paste a large chunk of text.</p>
        <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 bg-white/5 mx-auto max-w-xl">
          <div className="text-4xl mb-4">📁</div>
          <button className="px-8 py-4 bg-brand-orange hover:bg-orange-600 font-bold rounded-xl transition-colors shadow-sm text-lg opacity-50 cursor-not-allowed">
            Upload PDF Document
          </button>
        </div>
      </section>

    </div>
  );
}
