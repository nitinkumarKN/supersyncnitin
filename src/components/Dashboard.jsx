import React, { useState, useEffect } from 'react';
import { 
  Mail, Users, Inbox, Star, Plus, Search, Filter,
  RefreshCw, Settings, BarChart3, Clock, Send, Archive,
  Reply, Forward, Trash, Flag, MoreHorizontal, Paperclip,
  Calendar, Phone, MapPin, Edit3, X
} from 'lucide-react';

export default function Dashboard({ user, token, onLogout }) {
  const [activeTab, setActiveTab] = useState('emails');
  const [emails, setEmails] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailSyncing, setIsEmailSyncing] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isComposing, setIsComposing] = useState(false);
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    body: ''
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [emailsRes, contactsRes, statsRes] = await Promise.all([
        fetch('/api/emails', { headers }),
        fetch('/api/contacts', { headers }),
        fetch('/api/dashboard/stats', { headers })
      ]);

      const emailsData = await emailsRes.json();
      const contactsData = await contactsRes.json();
      const statsData = await statsRes.json();

      setEmails(emailsData.emails || []);
      setContacts(contactsData.contacts || []);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncEmails = async () => {
    setIsEmailSyncing(true);
    try {
      const response = await fetch('/api/email/sync', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ provider: 'gmail' })
      });

      if (response.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error syncing emails:', error);
    } finally {
      setIsEmailSyncing(false);
    }
  };

  const markEmailAsRead = async (emailId) => {
    try {
      await fetch(`/api/emails/${emailId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setEmails(emails.map(email => 
        email.id === emailId ? { ...email, isRead: true } : email
      ));
    } catch (error) {
      console.error('Error marking email as read:', error);
    }
  };

  const openEmail = (email) => {
    setSelectedEmail(email);
    if (!email.isRead) {
      markEmailAsRead(email.id);
    }
  };

  const closeEmail = () => {
    setSelectedEmail(null);
  };

  const startCompose = () => {
    setIsComposing(true);
    setComposeData({ to: '', subject: '', body: '' });
  };

  const handleComposeChange = (field, value) => {
    setComposeData(prev => ({ ...prev, [field]: value }));
  };

  const sendEmail = () => {
    // Simulate sending email
    console.log('Sending email:', composeData);
    setIsComposing(false);
    setComposeData({ to: '', subject: '', body: '' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
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
            <button
              onClick={() => setActiveTab('emails')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'emails' 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Inbox className="h-5 w-5" />
              <span>Emails</span>
              {stats.unreadEmails > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {stats.unreadEmails}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'contacts' 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Contacts</span>
              <span className="text-gray-400 text-sm">{stats.contacts || 0}</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'emails' && 'Emails'}
                {activeTab === 'contacts' && 'Contacts'}
                {activeTab === 'analytics' && 'Analytics'}
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>

            <div className="flex items-center space-x-4">
              {activeTab === 'emails' && (
                <button
                  onClick={syncEmails}
                  disabled={isEmailSyncing}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${isEmailSyncing ? 'animate-spin' : ''}`} />
                  <span>Sync Emails</span>
                </button>
              )}
              
              {activeTab === 'emails' && (
                <button
                  onClick={startCompose}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Compose</span>
                </button>
              )}

              <button
                onClick={onLogout}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'emails' && (
            <div>
              {/* Email Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <Inbox className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Emails</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.emails || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <Mail className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Unread</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.unreadEmails || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <Star className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Important</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.importantEmails || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Today</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {emails.filter(email => 
                          new Date(email.receivedAt).toDateString() === new Date().toDateString()
                        ).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email List */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Recent Emails</h3>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search emails..."
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Filter className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {emails.map((email) => (
                    <div
                      key={email.id}
                      className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !email.isRead ? 'bg-blue-50/30' : ''
                      }`}
                      onClick={() => openEmail(email)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {email.sender.name ? email.sender.name[0].toUpperCase() : 'U'}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <h4 className={`text-sm font-medium text-gray-900 ${
                                  !email.isRead ? 'font-semibold' : ''
                                }`}>
                                  {email.sender.name || email.sender.email}
                                </h4>
                                {email.isImportant && (
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                )}
                                {!email.isRead && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                )}
                              </div>
                              <p className={`text-sm text-gray-900 mt-1 ${
                                !email.isRead ? 'font-medium' : ''
                              }`}>
                                {email.subject}
                              </p>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {email.body.substring(0, 120)}...
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4 flex flex-col items-end space-y-2">
                          <p className="text-sm text-gray-500">
                            {new Date(email.receivedAt).toLocaleDateString()}
                          </p>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Archive email
                              }}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <Archive className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Delete email
                              }}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {emails.length === 0 && (
                    <div className="p-12 text-center">
                      <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No emails yet</h3>
                      <p className="text-gray-500 mb-6">
                        Click "Sync Emails" to get started with your email integration.
                      </p>
                      <button
                        onClick={syncEmails}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Sync Your Emails
                      </button>
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
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Contact</span>
                </button>
              </div>

              {/* Contacts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((contact) => (
                  <div key={contact._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {contact.name[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-500">{contact.company}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{contact.email}</p>
                      {contact.phone && (
                        <p className="text-sm text-gray-600">{contact.phone}</p>
                      )}
                      {contact.notes && (
                        <p className="text-sm text-gray-500 italic">{contact.notes}</p>
                      )}
                    </div>
                    {contact.tags && contact.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {contact.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {contacts.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts yet</h3>
                  <p className="text-gray-500 mb-6">
                    Start by syncing your emails or adding contacts manually.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={syncEmails}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Sync Emails
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Add Contact
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Activity</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Emails received today</span>
                    <span className="font-semibold text-gray-900">
                      {emails.filter(email => 
                        new Date(email.receivedAt).toDateString() === new Date().toDateString()
                      ).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response rate</span>
                    <span className="font-semibold text-green-600">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg response time</span>
                    <span className="font-semibold text-gray-900">2.4h</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Growth</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total contacts</span>
                    <span className="font-semibold text-gray-900">{stats.contacts || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">New this week</span>
                    <span className="font-semibold text-green-600">+12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active leads</span>
                    <span className="font-semibold text-blue-600">5</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Email open rate</span>
                    <span className="font-semibold text-green-600">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Click rate</span>
                    <span className="font-semibold text-blue-600">23%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conversion rate</span>
                    <span className="font-semibold text-purple-600">12%</span>
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
            {/* Email Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {selectedEmail.sender.name ? selectedEmail.sender.name[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedEmail.sender.name || selectedEmail.sender.email}
                  </h3>
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
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Archive className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash className="h-5 w-5" />
                </button>
                <button
                  onClick={closeEmail}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Email Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedEmail.subject}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{new Date(selectedEmail.receivedAt).toLocaleString()}</span>
                  {selectedEmail.isImportant && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>Important</span>
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

            {/* Quick Actions */}
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
            {/* Compose Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">New Message</h3>
              <button
                onClick={() => setIsComposing(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Compose Form */}
            <div className="p-6 space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="To"
                  value={composeData.to}
                  onChange={(e) => handleComposeChange('to', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={composeData.subject}
                  onChange={(e) => handleComposeChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Write your message..."
                  rows={12}
                  value={composeData.body}
                  onChange={(e) => handleComposeChange('body', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Compose Actions */}
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