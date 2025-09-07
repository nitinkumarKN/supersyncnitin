import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables (with custom config to reduce noise)
const envResult = dotenv.config();
if (envResult.error) {
  console.warn('⚠️ No .env file found, using default values');
} else {
  console.log('✅ Environment variables loaded from .env');
}

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/superhuman-clone';

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Database connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schemas (inline for simplicity)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  company: { type: String, default: '' },
  isEmailSynced: { type: Boolean, default: false },
  lastEmailSync: { type: Date },
  emailProvider: { type: String }
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, default: '' },
  phone: { type: String, default: '' },
  notes: { type: String, default: '' },
  tags: [{ type: String }],
  isLead: { type: Boolean, default: false },
  leadSource: { type: String }
}, { timestamps: true });

const emailSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messageId: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  sender: {
    name: String,
    email: String
  },
  recipients: [{
    name: String,
    email: String
  }],
  body: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  isImportant: { type: Boolean, default: false },
  labels: [{ type: String }],
  receivedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Models
const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Email = mongoose.model('Email', emailSchema);

// Remove database check middleware - it was causing the error
// app.use('/api', checkDBConnection); // REMOVED THIS LINE
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Routes

// Test endpoint - ADD THIS RIGHT AFTER THE ROOT ROUTE
app.post('/api/test', (req, res) => {
  console.log('🧪 TEST ENDPOINT HIT!');
  console.log('📥 Request body:', req.body);
  console.log('🌐 Request headers:', req.headers);
  res.json({ 
    message: 'Test endpoint working!', 
    receivedData: req.body,
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'SuperSync API Server',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile'
      },
      contacts: 'GET|POST|PUT|DELETE /api/contacts',
      emails: 'GET /api/emails',
      sync: 'POST /api/email/sync',
      stats: 'GET /api/dashboard/stats'
    }
  });
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Registration attempt:', { email: req.body.email, name: req.body.name });
    
    const { email, password, name, company } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = new User({
      email,
      name,
      company: company || '',
      password: hashedPassword
    });

    await newUser.save();
    console.log('User created successfully:', newUser._id);

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
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login attempt:', { email: req.body.email });
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login successful for:', user.email);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        company: user.company,
        isEmailSynced: user.isEmailSynced
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
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
        lastEmailSync: user.lastEmailSync
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contacts API
app.get('/api/contacts', authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json({ contacts });
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

    const newContact = new Contact({
      userId: req.user.id,
      name,
      email,
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

    const contact = await Contact.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      {
        name: name,
        email: email,
        company: company || '',
        phone: phone || '',
        notes: notes || '',
        tags: tags || []
      },
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
    const user = await User.findById(req.user.id);

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
          email: user.email
        }],
        body: `Hi there!\n\nWelcome to SuperSync! We're excited to have you on board. Your email integration has been successfully set up and you can now start managing your contacts and emails in one place.\n\nHere's what you can do:\n- Sync contacts from your email\n- Manage leads and prospects\n- Track email conversations\n- Organize your network\n\nIf you have any questions, just reply to this email.\n\nBest regards,\nThe SuperSync Team`,
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
          email: user.email
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
          email: user.email
        }],
        body: `A new lead has submitted your contact form:\n\nName: John Smith\nCompany: TechCorp Inc.\nEmail: john.smith@techcorp.com\nMessage: "Interested in learning more about your email management solution for our team of 50+ people."\n\nThis lead has been automatically added to your contacts. You can follow up directly from your dashboard.\n\nDon't let this opportunity slip away!`,
        isRead: false,
        isImportant: true,
        labels: ['lead', 'website', 'urgent'],
        receivedAt: new Date(Date.now() - 3600000) // 1 hour ago
      }
    ];

    // Save emails to database
    await Email.insertMany(demoEmails);

    // Update user sync status
    await User.findByIdAndUpdate(req.user.id, {
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
    const emails = await Email.find({ userId: req.user.id })
      .sort({ receivedAt: -1 })
      .limit(50);

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
      }))
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

// Contact sales lead submission
app.post('/api/contact-sales', async (req, res) => {
  try {
    const { name, email, company, phone, message, teamSize } = req.body;

    if (!name || !email || !company) {
      return res.status(400).json({ error: 'Name, email, and company are required' });
    }

    const newLead = new Contact({
      userId: null, // Sales leads don't belong to a specific user
      name,
      email,
      company,
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
    const contactsCount = await Contact.countDocuments({ userId: req.user.id });
    const emailsCount = await Email.countDocuments({ userId: req.user.id });
    const unreadEmailsCount = await Email.countDocuments({ 
      userId: req.user.id, 
      isRead: false 
    });
    const importantEmailsCount = await Email.countDocuments({ 
      userId: req.user.id, 
      isImportant: true 
    });

    res.json({
      contacts: contactsCount,
      emails: emailsCount,
      unreadEmails: unreadEmailsCount,
      importantEmails: importantEmailsCount
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
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`API Documentation: http://localhost:${PORT}/`);
});