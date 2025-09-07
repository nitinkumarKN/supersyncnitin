const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messageId: {
    type: String,
    required: true,
    unique: true
  },
  subject: {
    type: String,
    required: true
  },
  sender: {
    name: String,
    email: {
      type: String,
      required: true,
      lowercase: true
    }
  },
  recipients: [{
    name: String,
    email: {
      type: String,
      required: true,
      lowercase: true
    }
  }],
  body: {
    type: String,
    required: true
  },
  htmlBody: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isImportant: {
    type: Boolean,
    default: false
  },
  labels: [{
    type: String,
    trim: true
  }],
  threadId: {
    type: String
  },
  receivedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better performance
emailSchema.index({ userId: 1, receivedAt: -1 });
emailSchema.index({ userId: 1, isRead: 1 });
emailSchema.index({ userId: 1, isImportant: 1 });
emailSchema.index({ messageId: 1 }, { unique: true });

module.exports = mongoose.model('Email', emailSchema);