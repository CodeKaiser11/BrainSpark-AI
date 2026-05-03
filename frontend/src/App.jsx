import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ChatPage from './pages/ChatPage';
import SnapSolve from './pages/SnapSolve';
import MindMaps from './pages/MindMaps';
import NotesGenerator from './pages/NotesGenerator';
import SmartQuizzes from './pages/SmartQuizzes';
import YouTubePicks from './pages/YouTubePicks';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      
      {/* Routes wrapped in Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/snapsolve" element={<SnapSolve />} />
        <Route path="/mindmaps" element={<MindMaps />} />
        <Route path="/notes" element={<NotesGenerator />} />
        <Route path="/quizzes" element={<SmartQuizzes />} />
        <Route path="/youtube" element={<YouTubePicks />} />
      </Route>
      
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
