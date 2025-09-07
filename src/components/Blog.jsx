import React from 'react';
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';

export default function Blog() {
  const featuredPost = {
    title: "The Future of Email: AI-Powered Productivity",
    excerpt: "Discover how artificial intelligence is revolutionizing email management and helping professionals reclaim their time.",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Sarah Chen",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Product"
  };

  const posts = [
    {
      title: "10 Keyboard Shortcuts That Will Transform Your Email Workflow",
      excerpt: "Master these essential shortcuts to process email 2x faster and become truly superhuman.",
      image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Marcus Rodriguez",
      date: "March 12, 2024",
      readTime: "5 min read",
      category: "Tips"
    },
    {
      title: "Building a Secure Email Infrastructure at Scale",
      excerpt: "How we built SuperSync's security architecture to protect millions of emails while maintaining blazing fast performance.",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "David Kim",
      date: "March 10, 2024",
      readTime: "12 min read",
      category: "Engineering"
    },
    {
      title: "The Psychology of Email: Why Design Matters",
      excerpt: "Exploring how thoughtful design reduces cognitive load and helps users focus on what matters most.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Emily Watson",
      date: "March 8, 2024",
      readTime: "7 min read",
      category: "Design"
    },
    {
      title: "Email Analytics: Understanding Your Communication Patterns",
      excerpt: "Learn how to use data to optimize your email habits and improve your productivity.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Alex Thompson",
      date: "March 5, 2024",
      readTime: "6 min read",
      category: "Analytics"
    },
    {
      title: "Remote Work and Email: Best Practices for Distributed Teams",
      excerpt: "How to maintain effective communication and collaboration when your team is spread across the globe.",
      image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Lisa Park",
      date: "March 3, 2024",
      readTime: "9 min read",
      category: "Remote Work"
    },
    {
      title: "SuperSync vs Traditional Email Clients: A Performance Comparison",
      excerpt: "Detailed benchmarks showing how SuperSync outperforms traditional email clients in speed and efficiency.",
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Tom Wilson",
      date: "March 1, 2024",
      readTime: "10 min read",
      category: "Performance"
    }
  ];

  const categories = ["All", "Product", "Tips", "Engineering", "Design", "Analytics", "Remote Work"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            The SuperSync
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Insights, tips, and stories from the team building the future of email
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{featuredPost.author}</p>
                      <p className="text-gray-500 text-sm">{featuredPost.date}</p>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  index === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{post.author}</p>
                        <p className="text-gray-500 text-xs">{post.date}</p>
                      </div>
                    </div>
                    
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
                      <span>Read</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stay in the loop
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest insights, tips, and product updates delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">
              Subscribe
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            No spam, unsubscribe at any time
          </p>
        </div>
      </section>
    </div>
  );
}