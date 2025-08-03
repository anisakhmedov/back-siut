const mongoose = require('mongoose');

const Semesters = new mongoose.Schema({
  semester_name: {
    type: String,
    required: true,
    maxlength: 50
  },
  semester_code: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  is_current: {
    type: Boolean,
    default: false
  },
  registration_start: {
    type: Date
  },
  registration_end: {
    type: Date
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('Semesters', Semesters);