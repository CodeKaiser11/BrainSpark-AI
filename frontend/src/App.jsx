import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ChatPage from './pages/ChatPage';

function Landing() {
  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col justify-center items-center text-[#1a1208] font-sans p-4">
      <div className="text-6xl mb-6">🧠</div>
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">BrainSpark AI</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg text-center leading-relaxed">
        Your Intelligent Study Assistant powered by Gemini 2.0. Master any topic, faster.
      </p>
      <div className="flex gap-4">
        <a href="/login" className="px-8 py-3 bg-[#d4500a] text-white rounded-xl font-bold hover:bg-orange-700 transition shadow-sm">
          Log In
        </a>
        <a href="/register" className="px-8 py-3 bg-white border border-[#e5e4e7] rounded-xl font-bold hover:bg-gray-50 transition shadow-sm">
          Register
        </a>
      </div>
    </div>
  );
}

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
