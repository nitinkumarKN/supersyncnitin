const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();  

// Models
const User = require('./models/User');
const Contact = require('./models/Contact');
const Email = require('./models/Email');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersync';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/supersync';

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Error handling middleware for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next();
});

// Database connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Database connection event handlers
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

// Auth middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Verify user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Input validation middleware
const validateRegistration = (req, res, next) => {
  const { email, password, name } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  // Password validation
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }
  
  // Name validation
  if (name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters long' });
  }
  
  next();
};

// Routes

// User Registration
app.post('/api/auth/register', validateRegistration, async (req, res) => {
  try {
    const { email, password, name, company } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = new User({
      email: email.toLowerCase(),
      name: name.trim(),
      company: company || '',
      password: hashedPassword
    });

    await newUser.save();

    // Generate token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        company: newUser.company
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        company: user.company,
        isEmailSynced: user.isEmailSynced,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        company: user.company,
        isEmailSynced: user.isEmailSynced,
        lastEmailSync: user.lastEmailSync,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { name, company } = req.body;
    
    const updateData = {};
    if (name && name.trim().length >= 2) {
      updateData.name = name.trim();
    }
    if (company !== undefined) {
      updateData.company = company.trim();
    }
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        company: user.company,
        isEmailSynced: user.isEmailSynced,
        lastEmailSync: user.lastEmailSync
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contacts API
app.get('/api/contacts', authenticateToken, async (req, res) => {
  try {
    const { search, limit = 50, offset = 0 } = req.query;
    
    let query = { userId: req.user.id };
    
    // Add search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));
      
    const total = await Contact.countDocuments(query);
    
    res.json({ 
      contacts,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: total > parseInt(offset) + parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/contacts', authenticateToken, async (req, res) => {
  try {
    const { name, email, company, phone, notes, tags } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check for duplicate contact
    const existingContact = await Contact.findOne({
      userId: req.user.id,
      email: email.toLowerCase()
    });
    
    if (existingContact) {
      return res.status(400).json({ error: 'Contact with this email already exists' });
    }

    const newContact = new Contact({
      userId: req.user.id,
      name: name.trim(),
      email: email.toLowerCase(),
      company: company || '',
      phone: phone || '',
      notes: notes || '',
      tags: tags || []
    });

    await newContact.save();

    res.status(201).json({ 
      message: 'Contact created successfully', 
      contact: newContact 
    });
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, company, phone, notes, tags } = req.body;

    // Validate input
    if (name && name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters long' });
    }
    
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
    }

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (email) updateData.email = email.toLowerCase();
    if (company !== undefined) updateData.company = company;
    if (phone !== undefined) updateData.phone = phone;
    if (notes !== undefined) updateData.notes = notes;
    if (tags !== undefined) updateData.tags = tags;

    const contact = await Contact.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateData,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact updated successfully', contact });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOneAndDelete({ 
      _id: id, 
      userId: req.user.id 
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Email sync API
app.post('/api/email/sync', authenticateToken, async (req, res) => {
  try {
    const { provider } = req.body;

    // Check if user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Simulate email sync by creating demo emails
    const demoEmails = [
      {
        userId: req.user.id,
        messageId: `demo-${Date.now()}-1`,
        subject: 'Welcome to SuperSync - Your Email Integration is Ready!',
        sender: {
          name: 'SuperSync Team',
          email: 'hello@supersync.com'
        },
        recipients: [{
          name: user.name || 'User',
          email: req.user.email
        }],
        body: `Hi ${user.name || 'there'}!\n\nWelcome to SuperSync! We're excited to have you on board. Your email integration has been successfully set up and you can now start managing your contacts and emails in one place.\n\nHere's what you can do:\n- Sync contacts from your email\n- Manage leads and prospects\n- Track email conversations\n- Organize your network\n\nIf you have any questions, just reply to this email.\n\nBest regards,\nThe SuperSync Team`,
        isRead: false,
        isImportant: true,
        labels: ['welcome', 'setup'],
        receivedAt: new Date()
      },
      {
        userId: req.user.id,
        messageId: `demo-${Date.now()}-2`,
        subject: 'Your contacts are being synced',
        sender: {
          name: 'SuperSync Support',
          email: 'support@supersync.com'
        },
        recipients: [{
          name: user.name || 'User',
          email: req.user.email
        }],
        body: `Hi ${user.name || 'there'},\n\nYour contact sync is in progress. We're importing your contacts from ${provider || 'your email provider'} and organizing them for you.\n\nThis process usually takes a few minutes. You'll receive a notification once it's complete.\n\nIn the meantime, you can start exploring the dashboard and adding new contacts manually.\n\nThanks for choosing SuperSync!\n\nBest,\nSupport Team`,
        isRead: false,
        labels: ['sync', 'notification'],
        receivedAt: new Date(Date.now() - 1800000) // 30 minutes ago
      },
      {
        userId: req.user.id,
        messageId: `demo-${Date.now()}-3`,
        subject: 'New lead from your website contact form',
        sender: {
          name: 'Website Lead',
          email: 'leads@supersync.com'
        },
        recipients: [{
          name: user.name || 'User',
          email: req.user.email
        }],
        body: `A new lead has submitted your contact form:\n\nName: John Smith\nCompany: TechCorp Inc.\nEmail: john.smith@techcorp.com\nMessage: "Interested in learning more about your email management solution for our team of 50+ people."\n\nThis lead has been automatically added to your contacts. You can follow up directly from your dashboard.\n\nDon't let this opportunity slip away!`,
        isRead: false,
        isImportant: true,
        labels: ['lead', 'website', 'urgent'],
        receivedAt: new Date(Date.now() - 3600000) // 1 hour ago
      }
    ];

    // Remove existing demo emails for this user to avoid duplicates
    await Email.deleteMany({ 
      userId: req.user.id,
      messageId: { $regex: /^demo-/ }
    });

    // Save emails to database
    await Email.insertMany(demoEmails);

    // Update user sync status
    await User.findByIdAndUpdate(user._id, {
      isEmailSynced: true,
      lastEmailSync: new Date(),
      emailProvider: provider || 'gmail'
    });

    res.json({ 
      message: 'Email sync completed successfully',
      synced: demoEmails.length,
      emails: demoEmails.map(email => ({
        id: email.messageId,
        subject: email.subject,
        sender: email.sender,
        body: email.body.substring(0, 150) + '...',
        isRead: email.isRead,
        isImportant: email.isImportant,
        receivedAt: email.receivedAt
      }))
    });
  } catch (error) {
    console.error('Email sync error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/emails', authenticateToken, async (req, res) => {
  try {
    const { limit = 50, offset = 0, unread, important } = req.query;
    
    let query = { userId: req.user.id };
    
    // Filter options
    if (unread === 'true') {
      query.isRead = false;
    }
    if (important === 'true') {
      query.isImportant = true;
    }
    
    const emails = await Email.find(query)
      .sort({ receivedAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));
      
    const total = await Email.countDocuments(query);

    res.json({ 
      emails: emails.map(email => ({
        id: email._id,
        messageId: email.messageId,
        subject: email.subject,
        sender: email.sender,
        recipients: email.recipients,
        body: email.body,
        isRead: email.isRead,
        isImportant: email.isImportant,
        labels: email.labels,
        receivedAt: email.receivedAt
      })),
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: total > parseInt(offset) + parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get emails error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/emails/:id/read', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const email = await Email.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isRead: true },
      { new: true }
    );

    if (!email) {
      return res.status(404).json({ error: 'Email not found' });
    }

    res.json({ message: 'Email marked as read' });
  } catch (error) {
    console.error('Mark email as read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark email as important
app.put('/api/emails/:id/important', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { important } = req.body;
    
    const email = await Email.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isImportant: Boolean(important) },
      { new: true }
    );

    if (!email) {
      return res.status(404).json({ error: 'Email not found' });
    }

    res.json({ 
      message: `Email marked as ${important ? 'important' : 'not important'}`,
      email: {
        id: email._id,
        isImportant: email.isImportant
      }
    });
  } catch (error) {
    console.error('Mark email as important error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact sales lead submission
app.post('/api/contact-sales', async (req, res) => {
  try {
    const { name, email, company, phone, message, teamSize } = req.body;

    if (!name || !email || !company) {
      return res.status(400).json({ error: 'Name, email, and company are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const newLead = new Contact({
      userId: null, // Sales leads don't belong to a specific user
      name: name.trim(),
      email: email.toLowerCase(),
      company: company.trim(),
      phone: phone || '',
      notes: `Sales lead: ${message || 'No message provided'}. Team size: ${teamSize || 'Not specified'}`,
      isLead: true,
      leadSource: 'website',
      tags: ['sales-lead', 'website']
    });

    await newLead.save();

    res.status(201).json({ 
      message: 'Thank you for your interest! Our team will contact you soon.',
      leadId: newLead._id 
    });
  } catch (error) {
    console.error('Contact sales error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Dashboard stats
app.get('/api/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const [
      contactsCount,
      emailsCount,
      unreadEmailsCount,
      importantEmailsCount,
      todayEmailsCount
    ] = await Promise.all([
      Contact.countDocuments({ userId: req.user.id }),
      Email.countDocuments({ userId: req.user.id }),
      Email.countDocuments({ userId: req.user.id, isRead: false }),
      Email.countDocuments({ userId: req.user.id, isImportant: true }),
      Email.countDocuments({ 
        userId: req.user.id,
        receivedAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      })
    ]);

    res.json({
      contacts: contactsCount,
      emails: emailsCount,
      unreadEmails: unreadEmailsCount,
      importantEmails: importantEmailsCount,
      todayEmails: todayEmailsCount
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({ 
    error: isDevelopment ? err.message : 'Internal server error',
    ...(isDevelopment && { stack: err.stack })
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});