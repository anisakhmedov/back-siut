const mongoose = require('mongoose');

const Users = new mongoose.Schema({
  user_id: {
    type: Number,
    unique: true,
    required: true
    // Автоинкремент можно добавить при необходимости
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50
  },
  password_hash: {
    type: String,
    required: true,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  user_type: {
    type: String,
    enum: ['Admin', 'Faculty', 'Student', 'Staff'],
    required: true
  },
  associated_id: {
    type: Number
    // Ссылается на student_id, faculty_id и т.д. — логическая связь, не foreign key
  },
  is_active: {
    type: Boolean,
    default: true
  },
  last_login: {
    type: Date
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('Users', Users);
