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

    try {
      // 1. Client-side PDF Parsing
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let extractedText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        extractedText += pageText + '\n';
      }

      if (!extractedText || extractedText.trim() === '') {
        throw new Error('Could not extract text from this PDF.');
      }

      // 2. Send to Backend
      const token = localStorage.getItem('token');
      const res = await axios.post('/ai/upload', 
        { fileText: extractedText, fileName: file.name }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to generate notes from PDF.');
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
      const res = await axios.post('/ai/upload', 
        { fileText: textInput, fileName: 'Pasted Text' }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(res.data);
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
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Generated Notes</h2>

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
            <div className="space-y-8">
              {/* Summary */}
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h3 className="font-bold text-lg text-brand-orange mb-2">Summary</h3>
                <p className="text-gray-800 leading-relaxed">{notes.summary}</p>
              </div>

              {/* Key Points */}
              {notes.keyPoints && notes.keyPoints.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4 border-b pb-2">Key Points</h3>
                  <ul className="space-y-2">
                    {notes.keyPoints.map((point, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-brand-orange">•</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Formulas */}
              {notes.formulas && notes.formulas.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4 border-b pb-2">Formulas & Key Concepts</h3>
                  <ul className="space-y-2">
                    {notes.formulas.map((formula, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-brand-orange">∑</span>
                        <span className="text-gray-700 font-medium">{formula}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Flashcards */}
              {notes.flashcards && notes.flashcards.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4 border-b pb-2">Study Questions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {notes.flashcards.map((card, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <p className="font-bold text-gray-900 mb-2">Q: {card.q}</p>
                        <p className="text-gray-600 text-sm">A: {card.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

    </div>
  );
}
