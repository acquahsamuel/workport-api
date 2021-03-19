const Job = require("../models/Job");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc          Create a  Job
// @route         POST /api/v1/job
// @access        Private
exports.createJob = asyncHandler(async (req, res, next) => {
  const job = await Job.create(req.body);

  res.status(200).json({
    success: true,
    message: "Job Created",
    data: job
  });
});

// @desc          Get all  Jobs
// @route         GET /api/v1/job/:id
// @access        Public
exports.getJobs = asyncHandler(async (req, res, next) => {
  const job = await Job.find({});

  res.status(200).json({
    success: true,
    count: job.length,
    message: "success",
    data: job
  });
});

// @desc          Get a single Job
// @route         GET /api/v1/job/:id
// @access        Public
exports.getJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(
      new ErrorResponse(`Job not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "success",
    data: job
  });
});

// @desc          Update a single Job
// @route         PUT /api/v1/job/:id
// @access        Public
exports.updateJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!job) {
    return next(
      new ErrorResponse(`Job not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "success",
    data: job
  });
});

// @desc          Delete a single Job
// @route         DELETE /api/v1/job/:id
// @access        Private
exports.deleteJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job) {
    return next(
      new ErrorResponse(`Job not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    count: job.length,
    message: "success",
    data: {}
  });
});
