import React, { useState, useRef } from 'react';
import axios from '../api/axios';
import ReactMarkdown from 'react-markdown';

export default function NotesGenerator() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(null);
  const [error, setError] = useState(null);
  const [textInput, setTextInput] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }

    setLoading(true);
    setNotes(null);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('isPdf', true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/ai/notes', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` 
        }
      });
      setNotes(res.data.notes);
    } catch (err) {
      console.error(err);
      setError('Failed to generate notes from PDF.');
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const generateFromText = async () => {
    if (!textInput.trim()) return;

    setLoading(true);
    setNotes(null);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/ai/notes', 
        { text: textInput }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(res.data.notes);
    } catch (err) {
      console.error(err);
      setError('Failed to generate notes from text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 px-4">
      
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <div className="text-6xl mb-4">📝</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Smart Notes Generator</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Turn long documents, PDFs, and articles into concise, easy-to-read study notes in seconds.
        </p>
      </section>

      {/* CTA Area */}
      <section className="bg-brand-dark p-10 rounded-3xl text-white shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Process your Notes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PDF Upload */}
          <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 bg-white/5 text-center flex flex-col justify-center items-center h-full">
            <div className="text-4xl mb-4">📁</div>
            <p className="text-gray-400 mb-4 text-sm">Upload a PDF document to summarize.</p>
            <input 
              type="file" 
              accept=".pdf" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              disabled={loading}
              className="px-6 py-3 bg-brand-orange hover:bg-orange-600 font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50"
            >
              Upload PDF
            </button>
          </div>

          {/* Text Input */}
          <div className="border-2 border-white/10 rounded-2xl p-6 bg-white/5 flex flex-col h-full">
            <p className="text-gray-400 mb-2 text-sm">Or paste a large chunk of text:</p>
            <textarea 
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full flex-1 bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 outline-none resize-none min-h-[120px]"
              placeholder="Paste article, transcript, or study material here..."
            />
            <button 
              onClick={generateFromText}
              disabled={loading || !textInput.trim()}
              className="mt-4 px-6 py-3 bg-brand-orange hover:bg-orange-600 font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50 w-full"
            >
              Generate Notes
            </button>
          </div>
        </div>
      </section>

      {/* Results Area */}
      {(loading || notes || error) && (
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Generated Notes</h2>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
              <p className="text-gray-500">Reading and summarizing document...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center">
              {error}
            </div>
          )}

          {notes && (
            <div className="prose prose-orange max-w-none">
              <ReactMarkdown>{notes}</ReactMarkdown>
            </div>
          )}
        </section>
      )}

    </div>
  );
}
