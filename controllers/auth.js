const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.register = asyncHandler(async (req, res, next) => {
  const {name, email, password, role} = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });



});

exports.login = (req, res, next) => {
  const {email, password} = req.body;

  //@des  Validate email && Password
  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  // const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
};

exports.getMe = (req, res, next) => {};
