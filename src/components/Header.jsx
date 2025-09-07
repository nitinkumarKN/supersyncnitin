import React, { useState } from 'react';
import { Mail, Menu, X, User, LogOut, ChevronDown, Home, Zap, DollarSign, Users, BookOpen, Phone } from 'lucide-react';

export default function Header({ isAuthenticated, user, onLogin, onLogout, currentView, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SuperSync
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    currentView === 'dashboard' 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-8">
                <button
                  onClick={() => onNavigate('home')}
                  className={`flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors ${
                    currentView === 'home' ? 'text-blue-600 font-medium' : ''
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                    className={`flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors ${
                      currentView === 'features' ? 'text-blue-600 font-medium' : ''
                    }`}
                  >
                    <Zap className="h-4 w-4" />
                    <span>Product</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {isProductDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => { onNavigate('features'); setIsProductDropdownOpen(false); }}
                        className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Zap className="h-4 w-4" />
                        Features
                      </button>
                      <button
                        onClick={() => { onNavigate('features'); setIsProductDropdownOpen(false); }}
                        className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Mail className="h-4 w-4" />
                        <span>Email Sync</span>
                      </button>
                      <button
                        onClick={() => { onNavigate('features'); setIsProductDropdownOpen(false); }}
                        className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Users className="h-4 w-4" />
                        <span>Team Collaboration</span>
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onNavigate('pricing')}
                  className={`flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors ${
                    currentView === 'pricing' ? 'text-blue-600 font-medium' : ''
                  }`}
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Pricing</span>
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className={`flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors ${
                    currentView === 'about' ? 'text-blue-600 font-medium' : ''
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>About</span>
                </button>
                <button
                  onClick={() => onNavigate('blog')}
                  className={`flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors ${
                    currentView === 'blog' ? 'text-blue-600 font-medium' : ''
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Blog</span>
                </button>
                <button
                  onClick={() => onNavigate('contact-sales')}
                  className={`flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors ${
                    currentView === 'contact-sales' ? 'text-blue-600 font-medium' : ''
                  }`}
                >
                  <Phone className="h-4 w-4" />
                  <span>Contact</span>
                </button>
                <button
                  onClick={onLogin}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onLogin}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-2">
                <button
                  onClick={() => { onNavigate('dashboard'); setIsMenuOpen(false); }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
                <div className="flex items-center space-x-2 px-4 py-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => { onNavigate('features'); setIsMenuOpen(false); }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Zap className="h-4 w-4" />
                  <span>Features</span>
                </button>
                <button
                  onClick={() => { onNavigate('pricing'); setIsMenuOpen(false); }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Pricing</span>
                </button>
                <button
                  onClick={() => { onNavigate('about'); setIsMenuOpen(false); }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Users className="h-4 w-4" />
                  <span>About</span>
                </button>
                <button
                  onClick={() => { onNavigate('blog'); setIsMenuOpen(false); }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Blog</span>
                </button>
                <button
                  onClick={() => { onNavigate('contact-sales'); setIsMenuOpen(false); }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Contact Sales</span>
                </button>
                <button
                  onClick={onLogin}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onLogin}
                  className="block w-full text-left px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}