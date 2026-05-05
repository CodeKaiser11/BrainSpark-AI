import React, { useState } from 'react';
import axios from '../api/axios';

export default function YouTubePicks() {
  const [topic, setTopic] = useState('');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState(null);

  const findVideos = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setVideos(null);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/ai/youtube', 
        { 
          params: { topic, filter },
          headers: { Authorization: `Bearer ${token}` } 
        }
      );
      setVideos(res.data.videos);
    } catch (err) {
      console.error(err);
      setError('Failed to find videos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8 px-4">
      
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <div className="text-6xl mb-4">▶️</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Smart YouTube Picks</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Don't waste time searching. BrainSpark finds the best educational videos for any topic.
        </p>
      </section>

      {/* CTA Area */}
      <section className="text-center bg-brand-dark p-10 rounded-3xl text-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">Find Videos</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">Enter a topic and let AI curate a playlist for you.</p>
        <div className="max-w-xl mx-auto relative">
          <input 
            type="text" 
            placeholder="E.g., Organic Chemistry, Basics of Economics..." 
            className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-6 text-white placeholder-gray-400 outline-none"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && findVideos()}
          />
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['All', 'Tutorials', 'Lectures', 'Quick Summaries'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors border ${
                  filter === f 
                  ? 'bg-brand-orange text-white border-brand-orange' 
                  : 'bg-white/10 text-gray-300 border-white/10 hover:bg-white/20'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button 
            onClick={findVideos}
            disabled={loading || !topic.trim()}
            className="mt-6 w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-orange-600 font-bold rounded-xl transition-colors shadow-sm text-lg flex items-center justify-center mx-auto gap-2 disabled:opacity-50"
          >
            <span>🔍</span> {loading ? 'Curating...' : 'Find Videos'}
          </button>
        </div>
      </section>

      {/* Loading & Error */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
          <p className="text-gray-500 font-medium">Curating the best content for you...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center font-medium">
          {error}
        </div>
      )}

      {/* Results Area */}
      {videos && videos.length > 0 && (
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Recommended for you</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((vid, i) => (
              <div key={i} className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-gray-50">
                <div className="aspect-video bg-gray-200 relative overflow-hidden flex items-center justify-center group">
                  {vid.videoId && vid.videoId.length === 11 ? (
                     <img 
                      src={`https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`} 
                      alt={vid.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="text-4xl">📹</div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl pl-1">
                      ▶
                    </div>
                  </div>
                  <a 
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(vid.title + ' ' + vid.channel)}`}
                    target="_blank" rel="noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`Search for ${vid.title}`}
                  ></a>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2 line-clamp-2">{vid.title}</h3>
                  <p className="text-brand-orange font-medium text-sm mb-4">{vid.channel}</p>
                  <p className="text-gray-600 text-sm flex-1">{vid.reason}</p>
                  
                  <a 
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(vid.title + ' ' + vid.channel)}`}
                    target="_blank" rel="noreferrer"
                    className="mt-6 w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl text-center transition-colors text-sm"
                  >
                    Search on YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
