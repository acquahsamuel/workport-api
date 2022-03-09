const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Company = require('../models/Company');
const Job = require('../models/Job');

// @desc      Create job
// @route     POST /api/v1/getJobs
// @route     POST /api/v1/companies/:companyId/jobs
// @access    Public
// eslint-disable-next-line consistent-return
exports.getJobs = asyncHandler(async (req, res) => {
  if (req.params.companyId) {
    const jobs = await Job.find({ company: req.params.companyId });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  }
  res.status(200).json(res.advancedResults);
});

// @desc      Get single job
// @route     GET /api/v1/job/:jobId
// @access    Public
// eslint-disable-next-line consistent-return
exports.getJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorResponse(`Doc with ${req.params.id} not found `, 400));
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

// @desc      Create job
// @route     POST /api/v1/createJob
// @access    Public
// eslint-disable-next-line consistent-return
exports.createJob = asyncHandler(async (req, res) => {
  // Add user to req,body
  req.body.company = req.params.companyId;
  req.body.user = req.user.id;
  console.log(req.params.companyId);

  const company = await Company.findById(req.params.companyId);

  if (!company) {
    // eslint-disable-next-line no-undef
    return next(
      new ErrorResponse(`No compay with the id of ${req.params.companyId}`, 404)
    );
  }

  const job = await Job.create(req.body);

  res.status(201).json({
    success: true,
    data: job,
  });
});

// @desc      Update job
// @route     PATCH /api/v1/job/:jobId
// @access    Public
// eslint-disable-next-line consistent-return
exports.updateJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    return next(new ErrorResponse(`Doc with ${req.params.id} not found `, 400));
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

// @desc      Delete job
// @route     GET /api/v1/job/:jobId
// @access    Private
exports.deleteJob = asyncHandler(async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Delete all  job in
// @route     GET /api/v1/job
// @access    Private
exports.deleteAllJobs = asyncHandler(async (req, res) => {
  await Job.deleteMany();

  res.status(200).json({
    success: true,
    data: {},
  });
});
