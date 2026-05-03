import React, { useState, useRef } from 'react';
import axios from '../api/axios';
import ReactMarkdown from 'react-markdown';

export default function SnapSolve() {
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      processImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (base64Image) => {
    setLoading(true);
    setSolution(null);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/ai/solve', 
        { imageBase64: base64Image }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSolution(res.data.solution);
    } catch (err) {
      console.error(err);
      setError('Failed to process image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const processExample = async (text) => {
    setImagePreview(null);
    setLoading(true);
    setSolution(null);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/ai/solve', 
        { text: text }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSolution(res.data.solution);
    } catch (err) {
      console.error(err);
      setError('Failed to process example. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 px-4">
      
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <div className="text-6xl mb-4">📸</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Snap & Solve</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stuck on a math or science problem? Just take a photo and BrainSpark AI will explain it step-by-step.
        </p>
      </section>

      {/* CTA Area */}
      <section className="text-center bg-brand-dark p-10 rounded-3xl text-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">Try it out</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">Upload an image of a problem from your computer or use your camera.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 relative">
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            id="camera-upload"
            capture="environment"
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            disabled={loading}
            className="px-8 py-4 bg-brand-orange hover:bg-orange-600 font-bold rounded-xl transition-colors shadow-sm text-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>📷</span> {loading ? 'Processing...' : 'Take Photo'}
          </button>
          
          <input 
            type="file" 
            accept="image/*" 
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
          />
          <button 
            onClick={() => document.getElementById('file-upload').click()}
            disabled={loading}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 font-bold rounded-xl transition-colors shadow-sm text-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>📁</span> Upload Image
          </button>
        </div>
      </section>

      {/* Results Area */}
      {(loading || solution || error || imagePreview) && (
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Solution</h2>
          
          {imagePreview && (
            <div className="mb-6 flex justify-center">
              <img src={imagePreview} alt="Problem Preview" className="max-h-64 rounded-xl shadow-sm border border-gray-200" />
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center">
              {error}
            </div>
          )}

          {solution && (
            <div className="prose prose-orange max-w-none">
              <ReactMarkdown>{solution}</ReactMarkdown>
            </div>
          )}
        </section>
      )}

      {/* Examples */}
      {!solution && !loading && !imagePreview && (
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-center">Example Problems You Can Try</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Solve for x: 2x^2 + 5x - 3 = 0", "What is the capital of Australia?", "Balance this equation: H2 + O2 → H2O"].map((ex, i) => (
              <button 
                key={i}
                onClick={() => processExample(ex)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-300 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
