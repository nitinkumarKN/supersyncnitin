const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  company: {
    type: String,
    trim: true
  },
  emailProvider: {
    type: String,
    enum: ['gmail', 'outlook', 'yahoo', 'other'],
    default: 'gmail'
  },
  isEmailSynced: {
    type: Boolean,
    default: false
  },
  lastEmailSync: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);