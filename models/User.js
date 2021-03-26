const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },

  publicationDate: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPassword: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Encrypted using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Signed JWT authentication
UserSchema.methods.getSignedJWTToken = function() {
  return jwt.sign({id: this_id}, process.env.JWT);
};

module.exports = mongoose.model('User', UserSchema);
