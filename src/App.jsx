import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ContactSales from './components/ContactSales';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import Features from './components/Features';
import Pricing from './components/Pricing';
import About from './components/About';
import Blog from './components/Blog';

// API Configuration - FIXED
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  console.log('🌐 Making API call to:', url);
  console.log('📤 Request config:', { ...config, body: config.body ? 'DATA_PRESENT' : 'NO_BODY' });

  try {
    const response = await fetch(url, config);
    console.log('📥 Response status:', response.status);
    
    const data = await response.json();
    console.log('📥 Response data:', data);

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`❌ API call failed for ${endpoint}:`, error);
    throw error;
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for existing session
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      fetchUserProfile(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (authToken) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await apiCall('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      setUser(data.user);
      setToken(authToken);
      setIsAuthenticated(true);
      setCurrentView('dashboard');
      localStorage.setItem('token', authToken);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      localStorage.removeItem('token');
      setError('Session expired. Please login again.');
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    localStorage.setItem('token', authToken);
    setShowAuthModal(false);
    setError(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setCurrentView('home');
    setError(null);
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setCurrentView('dashboard');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLogin = () => {
    setShowAuthModal(true);
  };

  const renderCurrentView = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return isAuthenticated ? (
          <Dashboard user={user} token={token} onLogout={handleLogout} />
        ) : (
          <>
            <Header 
              isAuthenticated={isAuthenticated} 
              user={user} 
              onLogin={handleLogin} 
              onLogout={handleLogout}
              currentView={currentView}
              onNavigate={setCurrentView}
            />
            <Hero onGetStarted={handleGetStarted} />
          </>
        );
      case 'features':
        return (
          <>
            <Header 
              isAuthenticated={isAuthenticated} 
              user={user} 
              onLogin={handleLogin} 
              onLogout={handleLogout}
              currentView={currentView}
              onNavigate={setCurrentView}
            />
            <Features />
          </>
        );
      case 'pricing':
        return (
          <>
            <Header 
              isAuthenticated={isAuthenticated} 
              user={user} 
              onLogin={handleLogin} 
              onLogout={handleLogout}
              currentView={currentView}
              onNavigate={setCurrentView}
            />
            <Pricing />
          </>
        );
      case 'about':
        return (
          <>
            <Header 
              isAuthenticated={isAuthenticated} 
              user={user} 
              onLogin={handleLogin} 
              onLogout={handleLogout}
              currentView={currentView}
              onNavigate={setCurrentView}
            />
            <About />
          </>
        );
      case 'blog':
        return (
          <>
            <Header 
              isAuthenticated={isAuthenticated} 
              user={user} 
              onLogin={handleLogin} 
              onLogout={handleLogout}
              currentView={currentView}
              onNavigate={setCurrentView}
            />
            <Blog />
          </>
        );
      case 'contact-sales':
        return (
          <>
            <Header 
              isAuthenticated={isAuthenticated} 
              user={user} 
              onLogin={handleLogin} 
              onLogout={handleLogout}
              currentView={currentView}
              onNavigate={setCurrentView}
            />
            <ContactSales />
          </>
        );
      default:
        return (
          <>
            <Header 
              isAuthenticated={isAuthenticated} 
              user={user} 
              onLogin={handleLogin} 
              onLogout={handleLogout}
              currentView={currentView}
              onNavigate={setCurrentView}
            />
            <Hero onGetStarted={handleGetStarted} />
            <ContactSales />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setError(null)}
                className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {renderCurrentView()}
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
        apiCall={apiCall}
      />

      {/* Navigation */}
      {!isAuthenticated && (
        <nav className="fixed bottom-6 right-6 space-y-2">
          <button
            onClick={() => setCurrentView('home')}
            className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
              currentView === 'home' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentView('features')}
            className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
              currentView === 'features' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => setCurrentView('pricing')}
            className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
              currentView === 'pricing' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => setCurrentView('about')}
            className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
              currentView === 'about' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            About
          </button>
          <button
            onClick={() => setCurrentView('blog')}
            className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
              currentView === 'blog' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Blog
          </button>
          <button
            onClick={() => setCurrentView('contact-sales')}
            className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
              currentView === 'contact-sales' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Contact Sales
          </button>
          {isAuthenticated && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                currentView === 'dashboard' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </button>
          )}
        </nav>
      )}
    </div>
  );
}

export default App;