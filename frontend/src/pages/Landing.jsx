import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col justify-center items-center text-brand-dark font-sans p-4">
      <div className="text-6xl mb-6">🧠</div>
      <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center tracking-tight">BrainSpark AI</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg text-center leading-relaxed">
        Your Intelligent Study Assistant powered by Gemini 2.0. Master any topic, faster.
      </p>
      <div className="flex gap-4">
        <Link to="/dashboard" className="px-8 py-3 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-700 transition shadow-sm">
          Enter BrainSpark AI
        </Link>
      </div>

      <div className="mt-16 w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="text-sm text-gray-400 font-mono">BrainSpark Interface Preview</div>
        </div>
        <div className="p-8 md:p-12 flex flex-col gap-6">
          <div className="flex gap-4 max-w-lg">
            <div className="w-10 h-10 rounded-full bg-brand-dark flex-shrink-0"></div>
            <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-sm text-gray-700">
              Explain quantum entanglement like I'm 5 years old.
            </div>
          </div>
          <div className="flex gap-4 max-w-2xl self-end flex-row-reverse">
            <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white text-xl flex-shrink-0 shadow-md">🧠</div>
            <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-2xl rounded-tr-sm text-gray-800">
              Imagine you have two magical coins. No matter how far apart they are—even if one is on Earth and the other is on Mars—if you flip one and it lands on heads, the other one will *instantly* flip to heads too! They are mysteriously connected, or "entangled", so what happens to one instantly affects the other.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
