const mongoose = require('mongoose');
const { isEmail, isIn } = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
    validate: {
      validator: isEmail,
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum password length
  },
  role: {
    type: String,
    enum: ['customer','admin','HR','Manager'],
    default: 'customer'
},
  resetPasswordToken: String,            // New field for the reset token
  resetPasswordExpires: Date,           // New field for token expiration
  otp: String, // New field for OTP
});

module.exports = mongoose.model('LoginTesting', userSchema);
