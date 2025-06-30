// ========================================
// App Component - Main Application Entry Point
// ========================================
// Handles routing, authentication state, and global app configuration

import React, { useEffect, useState } from 'react'
import HomePageLander from '../components/HomePageLander'
import Login from '../components/Login'
import apiService from './services/api'
import './App.css'

function App() {
  // ========================================
  // State Management
  // ========================================

  const [currentPage, setCurrentPage] = useState('homepage'); // 'homepage' | 'login'
  const [user, setUser] = useState(null);                     // Current authenticated user
  const [loading, setLoading] = useState(true);               // App initialization loading state

  // ========================================
  // Authentication Check on App Start
  // ========================================
  // Verifies if user is already logged in by checking token validity

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if token exists in localStorage
        const token = apiService.getToken();

        if (token) {
          // Verify token with backend and get user data
          const userData = await apiService.getUserProfile();
          setUser(userData.user || userData);
        }
      } catch (err) {
        // Token is invalid or expired, remove it
        console.error('Token verification failed:', err);
        apiService.removeToken();
      } finally {
        // Mark app as loaded regardless of auth status
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // ========================================
  // Global App Configuration
  // ========================================
  // Handles scroll behavior and global CSS setup

  useEffect(() => {
    // Force scroll to top on every page load/reload
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Execute scroll to top immediately and after a short delay
    scrollToTop();
    setTimeout(scrollToTop, 50);

    // Add beforeunload listener to reset scroll position
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Add global CSS to hide scrollbars across browsers
    const style = document.createElement('style');
    style.textContent = `
            html, body {
                scrollbar-width: none !important; /* Firefox */
                -ms-overflow-style: none !important; /* Internet Explorer 10+ */
            }
            
            html::-webkit-scrollbar, body::-webkit-scrollbar {
                display: none !important; /* Safari and Chrome */
            }
            
            * {
                scrollbar-width: none !important; /* Firefox */
                -ms-overflow-style: none !important; /* Internet Explorer 10+ */
            }
            
            *::-webkit-scrollbar {
                display: none !important; /* Safari and Chrome */
            }
        `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.head.removeChild(style);
    };
  }, []);

  // ========================================
  // Navigation Handlers
  // ========================================

  /**
   * Navigate to login page
   */
  const navigateToLogin = () => {
    setCurrentPage('login');
  };

  /**
   * Navigate back to homepage
   */
  const navigateToHomepage = () => {
    setCurrentPage('homepage');
  };

  // ========================================
  // Authentication Event Handlers
  // ========================================

  /**
   * Handle successful login/registration
   * @param {Object} userData - User data from backend
   */
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentPage('homepage');
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    apiService.removeToken();
    setUser(null);
  };

  // ========================================
  // Page Rendering Logic
  // ========================================

  /**
   * Render the appropriate page based on current state
   * @returns {JSX.Element} The page component to render
   */
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <Login
            onBack={navigateToHomepage}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      default:
        return (
          <HomePageLander
            onLoginClick={navigateToLogin}
            hideLoginButton={currentPage === 'login'}
            user={user}
            onLogout={handleLogout}
          />
        );
    }
  };

  // ========================================
  // Loading State
  // ========================================
  // Show loading screen while checking authentication

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-400 text-xl">Loading...</div>
      </div>
    );
  }

  // ========================================
  // Main App Render
  // ========================================

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;
