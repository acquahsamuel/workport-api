const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email"
      ]
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false
    },
    resetPasswordToken: String,
    resetPassword: Date
  },
  { timestamps: true }
);

// Encrypt password using bcrypt
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  //id = refers to user id in database
  return jwt.sign({ id: this._id }, keys.JWT_SECRET, {
    expiresIn: keys.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
