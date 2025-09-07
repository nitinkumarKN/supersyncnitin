import React from 'react';
import { 
  Users, Target, Award, Globe, Heart, Lightbulb,
  Mail, Zap, Shield, Clock 
} from 'lucide-react';

export default function About() {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Former Gmail product lead with 10+ years in email technology"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-founder", 
      image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Ex-Google engineer specializing in high-performance systems"
    },
    {
      name: "Emily Watson",
      role: "Head of Design",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Award-winning designer focused on user experience and accessibility"
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Infrastructure expert with experience scaling products to millions of users"
    }
  ];

  const values = [
    {
      icon: Zap,
      title: "Speed First",
      description: "Every feature is designed to make you faster and more efficient"
    },
    {
      icon: Heart,
      title: "User Obsessed",
      description: "We listen to our users and build exactly what they need"
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description: "Your data is yours. We never read, scan, or sell your emails"
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      description: "We're constantly pushing the boundaries of what email can be"
    }
  ];

  const stats = [
    { number: "500K+", label: "Active Users" },
    { number: "10M+", label: "Emails Processed Daily" },
    { number: "99.9%", label: "Uptime" },
    { number: "150+", label: "Countries" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            We're building the future
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              of email
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            SuperSync was born from frustration with slow, cluttered email clients. 
            We believe email should be fast, beautiful, and help you get things done.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-xl leading-relaxed mb-8">
              In 2019, our founders were working at major tech companies, spending hours each day 
              wrestling with slow, cluttered email clients. They realized that despite email being 
              one of the most important tools for work, it hadn't evolved much in decades.
            </p>
            
            <p className="text-xl leading-relaxed mb-8">
              That's when they decided to build SuperSync - an email client designed from the ground 
              up for speed, simplicity, and productivity. Every feature is carefully crafted to help 
              you process email faster and focus on what matters most.
            </p>

            <p className="text-xl leading-relaxed">
              Today, SuperSync is used by over 500,000 professionals worldwide, from startup founders 
              to Fortune 500 executives. We're just getting started on our mission to make email 
              superhuman for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at SuperSync
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're a diverse team of engineers, designers, and product experts 
              passionate about reimagining email
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12">
            <Target className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              To make email superhuman for everyone. We believe that by making email faster, 
              more intuitive, and more powerful, we can help people reclaim their time and 
              focus on what truly matters.
            </p>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Want to join our mission?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always looking for talented people who share our passion for great products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
              View Open Positions
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}