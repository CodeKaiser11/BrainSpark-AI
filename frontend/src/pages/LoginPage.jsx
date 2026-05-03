import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginApi(email, password);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col justify-center items-center text-[#1a1208] font-sans p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-[#e5e4e7]">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-8">Login to BrainSpark AI</p>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#e5e4e7] focus:outline-none focus:border-[#d4500a]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#e5e4e7] focus:outline-none focus:border-[#d4500a]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#d4500a] text-white rounded-xl font-semibold hover:bg-orange-700 transition"
          >
            Sign In ✨
          </button>
        </form>

      </div>
    </div>
  );
}
