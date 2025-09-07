import React, { useState, useEffect } from 'react';
import { getAuthToken, getUserData, removeAuthToken } from './utils/auth';
import Header from './components/Header';
import Hero from './components/Hero';
import ContactSales from './components/ContactSales';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import Features from './components/Features';
import Pricing from './components/Pricing';
import About from './components/About';
import Blog from './components/Blog';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedToken = getAuthToken();
    const savedUser = getUserData();
    
    if (savedToken) {
      if (savedUser) {
        // Use cached user data
        setUser(savedUser);
        setToken(savedToken);
        setIsAuthenticated(true);
        setCurrentView('dashboard');
        setIsLoading(false);
      } else {
        // Fetch fresh user data
        fetchUserProfile(savedToken);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async (authToken) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(authToken);
        setIsAuthenticated(true);
        setCurrentView('dashboard');
      } else {
        removeAuthToken();
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      removeAuthToken();
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    removeAuthToken();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setCurrentView('home');
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

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderCurrentView = () => {
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
            <ContactSales />
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
      {renderCurrentView()}
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />

    </div>
  );
}

export default App;