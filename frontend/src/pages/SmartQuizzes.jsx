import React, { useState } from 'react';
import axios from '../api/axios';

export default function SmartQuizzes() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setQuiz(null);
    setError(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
    setShowExplanation(false);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/ai/quiz', 
        { topic, difficulty }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuiz(res.data.quiz);
    } catch (err) {
      console.error(err);
      setError('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (option) => {
    if (showExplanation) return;
    setSelectedAnswer(option);
    setShowExplanation(true);
    
    if (option === quiz[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 px-4">
      
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Adaptive Smart Quizzes</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Test your knowledge on any topic. The AI adjusts the difficulty based on your performance.
        </p>
      </section>

      {/* CTA Area */}
      {!quiz && !loading && (
        <section className="text-center bg-brand-dark p-10 rounded-3xl text-white shadow-md">
          <h2 className="text-2xl font-bold mb-4">Start Testing</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">Enter a topic to generate a quick 5-question quiz.</p>
          <div className="max-w-lg mx-auto relative">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input 
                type="text" 
                placeholder="E.g., World Geography, Python Programming..." 
                className="flex-1 bg-white/10 border border-white/20 rounded-xl py-4 px-6 text-white placeholder-gray-400 outline-none"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generateQuiz()}
              />
              <select 
                className="bg-white/10 border border-white/20 rounded-xl py-4 px-6 text-white outline-none"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy" className="text-black">Easy</option>
                <option value="medium" className="text-black">Medium</option>
                <option value="hard" className="text-black">Hard</option>
              </select>
            </div>
            <button 
              onClick={generateQuiz}
              disabled={loading || !topic.trim()}
              className="w-full px-8 py-4 bg-brand-orange hover:bg-orange-600 font-bold rounded-xl transition-colors shadow-sm text-lg disabled:opacity-50"
            >
              Create Quiz
            </button>
          </div>
        </section>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
          <p className="text-gray-500 font-medium">Generating your customized quiz...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center font-medium">
          {error}
        </div>
      )}

      {/* Quiz Area */}
      {quiz && !quizFinished && (
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Question {currentQuestionIndex + 1} of {quiz.length}</h2>
            <span className="text-brand-orange font-bold">Score: {score}</span>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900">{quiz[currentQuestionIndex].question}</h3>
          </div>

          <div className="space-y-4">
            {quiz[currentQuestionIndex].options.map((option, idx) => {
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-lg ";
              
              if (!showExplanation) {
                btnClass += "border-gray-200 hover:border-brand-orange hover:bg-orange-50 bg-white";
              } else {
                if (option === quiz[currentQuestionIndex].answer) {
                  btnClass += "border-green-500 bg-green-50 text-green-700";
                } else if (option === selectedAnswer) {
                  btnClass += "border-red-500 bg-red-50 text-red-700";
                } else {
                  btnClass += "border-gray-200 bg-gray-50 opacity-50";
                }
              }

              return (
                <button 
                  key={idx}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showExplanation}
                  className={btnClass}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-2">Explanation</h4>
              <p className="text-blue-900">{quiz[currentQuestionIndex].explanation}</p>
              
              <button 
                onClick={nextQuestion}
                className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
              >
                {currentQuestionIndex < quiz.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            </div>
          )}
        </section>
      )}

      {/* Quiz Results */}
      {quizFinished && (
        <section className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl text-gray-600 mb-8">
            You scored <span className="font-bold text-brand-orange">{score}</span> out of {quiz.length}
          </p>
          
          <button 
            onClick={() => {
              setQuiz(null);
              setTopic('');
            }}
            className="px-8 py-4 bg-brand-dark hover:bg-black text-white font-bold rounded-xl transition-colors shadow-sm text-lg"
          >
            Try Another Topic
          </button>
        </section>
      )}

    </div>
  );
}
