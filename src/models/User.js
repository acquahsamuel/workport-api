const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpCode = require('otp-generator');

const OPTLENGTH = 5;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    otpCode: {
      type: Number,
      select: false,
    },

    resetPasswordToken: String,
    resetPassword: Date,
  },
  { timestamps: true }
);

// Generate Otp Code
UserSchema.pre('save', async function (next) {
  const code = otpCode.generate(OPTLENGTH, {
    digits: true,
    specialChars: false,
    alphabets: false,
    upperCase: false,
  });
  this.otpCode = code;
  next();
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 *
 * @returns
 * id = refers to user id in database
 */
UserSchema.methods.getSignedJwtToken = function () {
  // eslint-disable-next-line no-underscore-dangle
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

/**
 *
 * @param {*} candidatePassword
 * @returns
 * Match user entered password to hashed password in database
 */
UserSchema.methods.matchPassword = async function (candidatePassword) {
  // eslint-disable-next-line no-return-await
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
 *
 * @returns
 */
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
