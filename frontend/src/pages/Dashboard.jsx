import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col text-[#1a1208] font-sans">
      <header className="bg-white border-b border-[#e5e4e7] p-4 flex justify-between items-center">
        <div className="font-bold text-xl flex items-center gap-2">
          <span className="text-2xl">🧠</span> BrainSpark AI
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium">Hi, {user.name || 'Student'}!</span>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 border border-[#e5e4e7] rounded-lg text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e5e4e7]">
            <h3 className="text-gray-500 font-medium mb-2">Current Streak</h3>
            <div className="text-3xl font-bold text-[#d4500a]">{user.streak || 0} Days 🔥</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e5e4e7]">
            <h3 className="text-gray-500 font-medium mb-2">Total XP</h3>
            <div className="text-3xl font-bold text-[#d4500a]">{user.xp || 0} XP ✨</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e5e4e7]">
            <h3 className="text-gray-500 font-medium mb-2">Chats Completed</h3>
            <div className="text-3xl font-bold text-[#1a1208]">0</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Study Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/chat" className="block bg-white p-6 rounded-2xl shadow-sm border border-[#e5e4e7] hover:border-[#d4500a] transition group cursor-pointer">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-[#d4500a] transition">AI Tutor Chat</h3>
            <p className="text-gray-600">Ask questions, get explanations, and master complex topics with Gemini 2.0.</p>
          </Link>
          <div className="bg-[#f0ece5] p-6 rounded-2xl shadow-sm border border-[#e5e4e7] opacity-60 cursor-not-allowed">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">Notes Generator (Soon)</h3>
            <p className="text-gray-600">Upload PDFs and get AI-generated summaries and flashcards.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
