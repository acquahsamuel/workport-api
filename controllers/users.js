const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc          Create new User
// @route         POST /api/v1/user
// @access        Private
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    message: 'data',
    // data: user
  });
});

// @desc          Get all  Users
// @route         GET /api/v1/user/:id
// @access        Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    message: 'data',
    data: users,
  });
});

// @desc          Get a User
// @route         GET /api/v1/user/:id
// @access        Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id);

  if (!user) {
    next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: 'data',
    data: user,
  });
});

// @desc          Update a user
// @route         PUT /api/v1/user/:id
// @access        Public
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!user) {
    next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: 'data',
    data: user,
  });
});

// @desc          Delete a user
// @route         DELETE /api/v1/user/:id
// @access        Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
   await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'data',
    data : {}
  });
});
