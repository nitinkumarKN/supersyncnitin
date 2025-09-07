import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Mail, Users, Zap, Play, CheckCircle, Star, Clock, 
  Shield, Smartphone, TrendingUp, Globe, Keyboard, Monitor
} from 'lucide-react';

export default function Hero({ onGetStarted }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const testimonials = [
    {
      text: "SuperSync has transformed how I handle email. I'm processing 2x more emails in half the time.",
      author: "Sarah Johnson",
      role: "Product Manager at Stripe",
      avatar: "SJ"
    },
    {
      text: "The keyboard shortcuts are game-changing. I can't imagine going back to traditional email clients.",
      author: "Michael Chen",
      role: "CEO at TechCorp",
      avatar: "MC"
    },
    {
      text: "Finally, an email client that understands speed and efficiency. This is the future of email.",
      author: "Jessica Wu",
      role: "VP Engineering at Airbnb",
      avatar: "JW"
    }
  ];

  const stats = [
    { number: "2x", label: "Faster email processing", icon: Zap },
    { number: "100ms", label: "Average response time", icon: Clock },
    { number: "500K+", label: "Active users worldwide", icon: Users },
    { number: "99.9%", label: "Uptime guarantee", icon: Shield }
  ];

  const features = [
    {
      icon: Keyboard,
      title: "Keyboard-First Design",
      description: "Navigate at the speed of thought with powerful shortcuts",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and security compliance",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Smartphone,
      title: "Cross-Platform",
      description: "Native apps for every device and operating system",
      color: "from-green-500 to-green-600"
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Track productivity and optimize your email workflow",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const companies = [
    "Google", "Microsoft", "Stripe", "Airbnb", "Uber", "Netflix", "Spotify", "Dropbox"
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium">4.9/5 rating</span>
              <span className="text-gray-400">•</span>
              <span>2,847 reviews</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="font-medium">500K+ users</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="font-medium">SOC 2 Compliant</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            The most productive
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">
              email app ever made
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            What if you could be done with email in <span className="font-semibold text-blue-600">half the time</span>? 
            SuperSync is the email client that makes you feel superhuman.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
            >
              <span>Get SuperSync for Free</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center space-x-3"
            >
              <div className="bg-blue-100 p-1 rounded-full group-hover:bg-blue-200 transition-colors">
                <Play className="h-4 w-4 text-blue-600 ml-0.5" />
              </div>
              <span>Watch 2-min Demo</span>
            </button>
          </div>

          {/* Key Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all group">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <div className={`bg-gradient-to-r ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Customer Testimonial Carousel */}
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 mb-20 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {testimonials[currentTestimonial].avatar}
                  </span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Social Proof - Company Logos */}
          <div className="text-center">
            <p className="text-gray-500 mb-8 font-medium">Trusted by teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">SuperSync Demo</h3>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 mb-4 inline-block">
                  <Play className="h-16 w-16 text-blue-600" />
                </div>
                <p className="text-gray-600">Demo video would play here</p>
                <p className="text-sm text-gray-500 mt-2">See SuperSync in action</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
}