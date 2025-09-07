import React from 'react';
import { ArrowRight, Mail, Users, Zap } from 'lucide-react';

export default function Hero({ onGetStarted }) {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            The fastest email
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              experience ever made
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            SuperSync combines the power of email management with intelligent contact 
            sync and lead tracking. Built for teams who value speed and efficiency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Process emails 2x faster with keyboard shortcuts and smart automation
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Sync</h3>
              <p className="text-gray-600">
                Automatically sync contacts and emails from all your providers
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lead Tracking</h3>
              <p className="text-gray-600">
                Never miss an opportunity with intelligent lead management
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}