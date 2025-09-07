import React, { useState, useEffect } from 'react';
import { 
  Mail, Users, Inbox, Star, Plus, Search, Filter, RefreshCw, Settings, 
  BarChart3, Clock, Send, Archive, Reply, Forward, Trash, Flag, 
  MoreHorizontal, Paperclip, Calendar, Phone, MapPin, Edit3, X, 
  CheckCircle, AlertCircle, TrendingUp, Activity, FileText, Bell
} from 'lucide-react';

export default function Dashboard({ user, token, onLogout }) {
  const [activeTab, setActiveTab] = useState('emails');
  const [emails, setEmails] = useState([
    {
      id: 1,
      subject: "Welcome to SuperSync!",
      sender: { name: "SuperSync Team", email: "team@supersync.com" },
      body: "Welcome to the fastest email experience ever made. Get ready to process email 2x faster with our intelligent features and keyboard shortcuts. This is just the beginning of your journey to email superhuman status.",
      isRead: false,
      isImportant: true,
      receivedAt: new Date().toISOString(),
      labels: ["welcome"],
      hasAttachments: false
    },
    {
      id: 2,
      subject: "Your first email sync is ready",
      sender: { name: "Sarah Chen", email: "sarah@supersync.com" },
      body: "We've successfully synced your emails from your connected accounts. You can now manage all your communications from one powerful interface. Check out the keyboard shortcuts to get started!",
      isRead: true,
      isImportant: false,
      receivedAt: new Date(Date.now() - 3600000).toISOString(),
      labels: ["sync"],
      hasAttachments: true
    },
    {
      id: 3,
      subject: "Team collaboration features are live",
      sender: { name: "Marcus Rodriguez", email: "marcus@supersync.com" },
      body: "Great news! Our new team collaboration features are now available. You can now share emails, assign tasks, and collaborate with your team more efficiently than ever before.",
      isRead: false,
      isImportant: false,
      receivedAt: new Date(Date.now() - 7200000).toISOString(),
      labels: ["product-update"],
      hasAttachments: false
    },
    {
      id: 4,
      subject: "Monthly productivity report",
      sender: { name: "SuperSync Analytics", email: "analytics@supersync.com" },
      body: "Here's your monthly productivity summary. You've processed 247 emails this month, with an average response time of 1.2 hours. Your productivity has increased by 34% compared to last month!",
      isRead: true,
      isImportant: false,
      receivedAt: new Date(Date.now() - 86400000).toISOString(),
      labels: ["analytics"],
      hasAttachments: true
    }
  ]);
  
  const [contacts, setContacts] = useState([
    {
      _id: 1,
      name: "Sarah Chen",
      email: "sarah@supersync.com",
      company: "SuperSync",
      phone: "+1 (555) 123-4567",
      notes: "CEO and co-founder. Expert in email productivity and team collaboration.",
      tags: ["team", "leadership", "founder"],
      lastContactedAt: new Date(Date.now() - 86400000).toISOString(),
      isLead: false
    },
    {
      _id: 2,
      name: "Marcus Rodriguez",
      email: "marcus@supersync.com", 
      company: "SuperSync",
      phone: "+1 (555) 234-5678",
      notes: "CTO and co-founder. Technical expert in email infrastructure and security.",
      tags: ["team", "engineering", "founder"],
      lastContactedAt: new Date(Date.now() - 3600000).toISOString(),
      isLead: false
    },
    {
      _id: 3,
      name: "Emily Watson",
      email: "emily@designcorp.com",
      company: "DesignCorp",
      phone: "+1 (555) 345-6789",
      notes: "Potential client interested in team collaboration features. Follow up next week.",
      tags: ["prospect", "design", "enterprise"],
      lastContactedAt: new Date(Date.now() - 172800000).toISOString(),
      isLead: true
    },
    {
      _id: 4,
      name: "David Kim",
      email: "d.kim@techstartup.io",
      company: "TechStartup",
      notes: "Former colleague, now at a startup. Interested in our API integrations.",
      tags: ["network", "api", "startup"],
      lastContactedAt: new Date(Date.now() - 259200000).toISOString(),
      isLead: true
    }
  ]);

  const [stats, setStats] = useState({
    emails: 247,
    unreadEmails: 12,
    importantEmails: 5,
    contacts: 45,
    responseTime: "1.2h",
    productivity: "+34%"
  });

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isComposing, setIsComposing] = useState(false);
  const [composeData, setComposeData] = useState({ to: '', subject: '', body: '' });
  const [isEmailSyncing, setIsEmailSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [emailFilter, setEmailFilter] = useState('all');

  // Filter emails based on search and filter
  const filteredEmails = emails.filter(email => {
    const matchesSearch = searchQuery === '' || 
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.body.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      emailFilter === 'all' ||
      (emailFilter === 'unread' && !email.isRead) ||
      (emailFilter === 'important' && email.isImportant) ||
      (emailFilter === 'attachments' && email.hasAttachments);
    
    return matchesSearch && matchesFilter;
  });

  const syncEmails = async () => {
    setIsEmailSyncing(true);
    // Simulate sync delay
    setTimeout(() => {
      setIsEmailSyncing(false);
      // You could add new emails here in a real implementation
    }, 2000);
  };

  const markEmailAsRead = (emailId) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, isRead: true } : email
    ));
  };

  const openEmail = (email) => {
    setSelectedEmail(email);
    if (!email.isRead) {
      markEmailAsRead(email.id);
    }
  };

  const archiveEmail = (emailId) => {
    setEmails(emails.filter(email => email.id !== emailId));
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail(null);
    }
  };

  const toggleImportant = (emailId) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, isImportant: !email.isImportant } : email
    ));
  };

  const sendEmail = () => {
    // Simulate sending email
    console.log('Sending email:', composeData);
    setIsComposing(false);
    setComposeData({ to: '', subject: '', body: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SuperSync
            </span>
          </div>

          <nav className="space-y-2">
            {[
              { 
                key: 'emails', 
                icon: Inbox, 
                label: 'Inbox', 
                count: stats.unreadEmails,
                color: 'blue'
              },
              { 
                key: 'important', 
                icon: Star, 
                label: 'Important', 
                count: stats.importantEmails,
                color: 'yellow'
              },
              { 
                key: 'contacts', 
                icon: Users, 
                label: 'Contacts', 
                count: stats.contacts,
                color: 'green'
              },
              { 
                key: 'analytics', 
                icon: BarChart3, 
                label: 'Analytics',
                color: 'purple'
              },
              { 
                key: 'settings', 
                icon: Settings, 
                label: 'Settings',
                color: 'gray'
              }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${
                  activeTab === item.key 
                    ? `bg-${item.color}-50 text-${item.color}-600 border-r-2 border-${item.color}-600 shadow-sm` 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    activeTab === item.key
                      ? `bg-${item.color}-600 text-white`
                      : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize flex items-center space-x-2">
                {activeTab === 'emails' && <Inbox className="h-6 w-6 text-blue-600" />}
                {activeTab === 'important' && <Star className="h-6 w-6 text-yellow-500" />}
                {activeTab === 'contacts' && <Users className="h-6 w-6 text-green-600" />}
                {activeTab === 'analytics' && <BarChart3 className="h-6 w-6 text-purple-600" />}
                {activeTab === 'settings' && <Settings className="h-6 w-6 text-gray-600" />}
                <span>{activeTab === 'emails' ? 'Inbox' : activeTab}</span>
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>

            <div className="flex items-center space-x-4">
              {(activeTab === 'emails' || activeTab === 'important') && (
                <>
                  <button
                    onClick={syncEmails}
                    disabled={isEmailSyncing}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`h-4 w-4 ${isEmailSyncing ? 'animate-spin' : ''}`} />
                    <span>{isEmailSyncing ? 'Syncing...' : 'Sync'}</span>
                  </button>
                  
                  <button
                    onClick={() => setIsComposing(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors shadow-sm"
                  >
                    <Send className="h-4 w-4" />
                    <span>Compose</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          {(activeTab === 'emails' || activeTab === 'important') && (
            <div>
              {/* Email Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                  { 
                    label: 'Total Emails', 
                    value: stats.emails, 
                    icon: Inbox, 
                    color: 'blue',
                    trend: '+12%'
                  },
                  { 
                    label: 'Unread', 
                    value: stats.unreadEmails, 
                    icon: Mail, 
                    color: 'orange',
                    trend: '-5%'
                  },
                  { 
                    label: 'Important', 
                    value: stats.importantEmails, 
                    icon: Star, 
                    color: 'yellow',
                    trend: '+2%'
                  },
                  { 
                    label: 'Response Time', 
                    value: stats.responseTime, 
                    icon: Clock, 
                    color: 'green',
                    trend: '-15%'
                  }
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        {stat.trend && (
                          <p className={`text-xs mt-1 flex items-center ${
                            stat.trend.startsWith('+') ? 'text-green-600' : 
                            stat.trend.startsWith('-') && stat.label === 'Response Time' ? 'text-green-600' :
                            'text-red-600'
                          }`}>
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {stat.trend} from last month
                          </p>
                        )}
                      </div>
                      <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                        <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Email List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {activeTab === 'important' ? 'Important Emails' : 'Recent Emails'}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search emails..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <select
                        value={emailFilter}
                        onChange={(e) => setEmailFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All</option>
                        <option value="unread">Unread</option>
                        <option value="important">Important</option>
                        <option value="attachments">With Attachments</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {filteredEmails
                    .filter(email => activeTab === 'important' ? email.isImportant : true)
                    .map((email) => (
                    <div
                      key={email.id}
                      className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !email.isRead ? 'bg-blue-50/30' : ''
                      }`}
                      onClick={() => openEmail(email)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1 min-w-0">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-sm">
                              {email.sender.name[0].toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className={`text-sm font-medium text-gray-900 truncate ${
                                !email.isRead ? 'font-semibold' : ''
                              }`}>
                                {email.sender.name}
                              </h4>
                              {email.isImportant && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0" />
                              )}
                              {!email.isRead && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                              )}
                              {email.hasAttachments && (
                                <Paperclip className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              )}
                            </div>
                            
                            <p className={`text-sm text-gray-900 mb-1 truncate ${
                              !email.isRead ? 'font-medium' : ''
                            }`}>
                              {email.subject}
                            </p>
                            
                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                              {email.body.substring(0, 120)}...
                            </p>
                            
                            {email.labels && email.labels.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {email.labels.map((label, i) => (
                                  <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {label}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2 flex-shrink-0 ml-4">
                          <p className="text-sm text-gray-500">
                            {new Date(email.receivedAt).toLocaleDateString()}
                          </p>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleImportant(email.id);
                              }}
                              className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                            >
                              <Star className={`h-4 w-4 ${email.isImportant ? 'text-yellow-500 fill-current' : ''}`} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                archiveEmail(email.id);
                              }}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <Archive className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredEmails.length === 0 && (
                    <div className="p-12 text-center">
                      <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {searchQuery ? 'No emails found' : 'No emails yet'}
                      </h3>
                      <p className="text-gray-500 mb-6">
                        {searchQuery 
                          ? 'Try adjusting your search terms or filters.' 
                          : 'Click "Sync" to get started with your email integration.'
                        }
                      </p>
                      {!searchQuery && (
                        <button
                          onClick={syncEmails}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Sync Your Emails
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div>
              {/* Contacts Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>All Contacts</option>
                    <option>Leads</option>
                    <option>Team</option>
                    <option>Recently Added</option>
                  </select>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Contact</span>
                </button>
              </div>

              {/* Contacts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((contact) => (
                  <div key={contact._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {contact.name[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                          <p className="text-sm text-gray-500">{contact.company}</p>
                        </div>
                      </div>
                      {contact.isLead && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Lead
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{contact.email}</span>
                      </div>
                      {contact.phone && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{contact.phone}</span>
                        </div>
                      )}
                      {contact.lastContactedAt && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>Last contacted {new Date(contact.lastContactedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    {contact.notes && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {contact.notes}
                      </p>
                    )}
                    
                    {contact.tags && contact.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    title: "Email Activity",
                    icon: Activity,
                    color: "blue",
                    stats: [
                      { label: "Emails sent today", value: "24" },
                      { label: "Response rate", value: "87%", trend: "+5%" },
                      { label: "Avg response time", value: "1.2h", trend: "-15%" }
                    ]
                  },
                  {
                    title: "Productivity",
                    icon: TrendingUp,
                    color: "green",
                    stats: [
                      { label: "Emails processed", value: "247" },
                      { label: "Time saved", value: "4.2h", trend: "+12%" },
                      { label: "Efficiency", value: "+34%", trend: "+8%" }
                    ]
                  },
                  {
                    title: "Contact Growth",
                    icon: Users,
                    color: "purple",
                    stats: [
                      { label: "Total contacts", value: stats.contacts.toString() },
                      { label: "New this week", value: "12", trend: "+25%" },
                      { label: "Active leads", value: "5", trend: "+2" }
                    ]
                  }
                ].map((section, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className={`bg-${section.color}-100 p-2 rounded-lg`}>
                        <section.icon className={`h-5 w-5 text-${section.color}-600`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    </div>
                    <div className="space-y-4">
                      {section.stats.map((stat, j) => (
                        <div key={j} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{stat.label}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">{stat.value}</span>
                            {stat.trend && (
                              <span className={`text-xs ${
                                stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {stat.trend}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Accounts</label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Manage your connected email accounts and sync settings.</p>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                      Configure Email Sync
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notifications</label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Control when and how you receive notifications.</p>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                      Notification Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Email Detail Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {selectedEmail.sender.name[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedEmail.sender.name}</h3>
                  <p className="text-sm text-gray-500">{selectedEmail.sender.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Reply className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Forward className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => toggleImportant(selectedEmail.id)}
                  className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <Star className={`h-5 w-5 ${selectedEmail.isImportant ? 'text-yellow-500 fill-current' : ''}`} />
                </button>
                <button 
                  onClick={() => archiveEmail(selectedEmail.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Archive className="h-5 w-5" />
                </button>
                <button onClick={() => setSelectedEmail(null)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEmail.subject}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{new Date(selectedEmail.receivedAt).toLocaleString()}</span>
                  {selectedEmail.isImportant && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>Important</span>
                    </div>
                  )}
                  {selectedEmail.hasAttachments && (
                    <div className="flex items-center space-x-1">
                      <Paperclip className="h-4 w-4 text-gray-400" />
                      <span>Has attachments</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {selectedEmail.body}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Reply className="h-4 w-4" />
                  <span>Reply</span>
                </button>
                <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Forward className="h-4 w-4" />
                  <span>Forward</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Flag className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compose Modal */}
      {isComposing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">New Message</h3>
              <button onClick={() => setIsComposing(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="To"
                  value={composeData.to}
                  onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={composeData.subject}
                  onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <textarea
                  placeholder="Write your message..."
                  rows={12}
                  value={composeData.body}
                  onChange={(e) => setComposeData({...composeData, body: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-4">
                <button
                  onClick={sendEmail}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <Paperclip className="h-4 w-4" />
                  <span>Attach</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Calendar className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}