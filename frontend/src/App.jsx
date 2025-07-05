// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import HomePageLander from '../components/HomePageLander';
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import QuestionListPage from '../components/QuestionListPage';
import AdminPage from '../components/AdminPage';
import CreateQuestionPage from '../components/CreateQuestionPage';
import QuestionSolvePage from '../components/QuestionSolvePage';
import apiService from './services/api';
import './App.css';

function MainApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = apiService.getToken();
        if (token) {
          const userData = await apiService.getUserProfile();
          setUser(userData.user || userData);
        }
      } catch (err) {
        console.error('Token verification failed:', err);
        apiService.removeToken();
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    navigate('/');
  };

  const handleLogout = () => {
    apiService.removeToken();
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-400 text-xl">Loading...</div>
      </div>
    );
  }

  const hideNavbar = location.pathname.startsWith('/auth/login') || location.pathname.startsWith('/auth/register');

  return (
    <>
      {!hideNavbar && <Navbar user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<HomePageLander user={user} />} />
        <Route path="/login" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/login" element={<Login onLoginSuccess={handleLoginSuccess} isRegister={false} />} />
        <Route path="/auth/register" element={<Login onLoginSuccess={handleLoginSuccess} isRegister={true} />} />
        <Route path="/questions" element={<QuestionListPage />} />
        <Route path="/admin" element={user && user.isAdmin ? <AdminPage user={user} /> : <Navigate to="/" replace />} />
        <Route path="/admin/create-new-question" element={user && user.isAdmin ? <CreateQuestionPage user={user} /> : <Navigate to="/" replace />} />
        <Route path="/question/:slug" element={<QuestionSolvePage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
