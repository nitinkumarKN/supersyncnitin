const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  lastContactedAt: {
    type: Date
  },
  isLead: {
    type: Boolean,
    default: false
  },
  leadSource: {
    type: String,
    enum: ['website', 'email', 'referral', 'social', 'other'],
    default: 'email'
  }
}, {
  timestamps: true
});

// Indexes for better performance
contactSchema.index({ userId: 1, email: 1 });
contactSchema.index({ userId: 1, createdAt: -1 });
contactSchema.index({ userId: 1, name: 1 });

module.exports = mongoose.model('Contact', contactSchema);