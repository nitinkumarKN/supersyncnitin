import React from 'react';
import { 
  Zap, Mail, Search, Calendar, Users, Shield, 
  Smartphone, Globe, BarChart3, Clock, Star, CheckCircle 
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process emails 2x faster with keyboard shortcuts and smart automation",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Mail,
      title: "Smart Compose",
      description: "AI-powered email composition with intelligent suggestions and templates",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Search,
      title: "Instant Search",
      description: "Find any email in milliseconds with our advanced search technology",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Calendar,
      title: "Calendar Integration",
      description: "Seamlessly schedule meetings and manage your calendar from your inbox",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share emails, assign tasks, and collaborate with your team efficiently",
      color: "from-pink-400 to-pink-600"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption and compliance",
      color: "from-red-400 to-red-600"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Full-featured mobile apps for iOS and Android with offline support",
      color: "from-indigo-400 to-indigo-600"
    },
    {
      icon: Globe,
      title: "Multi-Account",
      description: "Manage multiple email accounts from different providers in one place",
      color: "from-teal-400 to-teal-600"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track your email productivity and get insights on your communication patterns",
      color: "from-cyan-400 to-cyan-600"
    }
  ];

  const keyboardShortcuts = [
    { key: "E", action: "Archive email" },
    { key: "R", action: "Reply to email" },
    { key: "F", action: "Forward email" },
    { key: "Cmd+K", action: "Quick search" },
    { key: "Cmd+Enter", action: "Send email" },
    { key: "J/K", action: "Navigate emails" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Features that make you
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              superhuman
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Every feature is designed to help you process email faster, stay organized, 
            and focus on what matters most.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Keyboard Shortcuts
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Process email at the speed of thought with powerful keyboard shortcuts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyboardShortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{shortcut.action}</span>
                  <kbd className="bg-white/20 text-white px-3 py-1 rounded-lg font-mono text-sm">
                    {shortcut.key}
                  </kbd>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speed Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Speed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every interaction is optimized to be blazingly fast
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-400 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">100ms</h3>
              <p className="text-gray-600">Average response time</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">2x</h3>
              <p className="text-gray-600">Faster than traditional email</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-400 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">99.9%</h3>
              <p className="text-gray-600">Uptime guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to become superhuman?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who have transformed their email workflow
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg">
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}