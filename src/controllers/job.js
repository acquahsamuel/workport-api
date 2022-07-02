const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Company = require('../models/Company');
const Job = require('../models/Job');

// @desc      Create job
// @route     POST /api/v1/getJobs
// @route     POST /api/v1/companies/:companyId/jobs
// @access    Public
exports.getJobs = asyncHandler(async (req, res) => {
  // const jobs = await Job.find().populate({
  //   path: 'company',
  //   select: 'companyName companyUrl companyTwitter companyLogo'
  // });

  // if (!jobs) {
  //   return next(new ErrorResponse(`No jobs found`, 400));
  // }

  // res.status(200).json({
  //   success: true,
  //   count: jobs.length,
  //   data: jobs,
  // });
  await res.status(200).json(res.advancedResults);
})



// @desc      Get single job
// @route     GET /api/v1/job/:jobId
// @access    Public
exports.getJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    return next(new ErrorResponse(`Doc with ${req.params.jobId} not found `, 400));
  }

  return res.status(200).json({
    success: true,
    data: job,
  });
});

// @desc      Create job
// @route     POST /api/v1/createJob
// @access    Public
exports.createJob = asyncHandler(async (req, res) => {
  // Add user to req,body
  // req.user.id = is coming from protect middleware
  req.body.userId = req.user.id;

  const job = await Job.create(req.body);

  return res.status(201).json({
    success: true,
    data: job,
  });
});

// @desc      Update job
// @route     PATCH /api/v1/job/:jobId
// @access    Public
exports.updateJob = asyncHandler(async (req, res, next) => {
  let job = await Job.findById(req.params.jobId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    return next(new ErrorResponse(`Doc with ${req.params.jobId} not found `, 400));
  }

  if (job.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to update this job`, 401));
  }

  job = await Job.findByIdAndUpdate(req.params.jobId, req.body, {
    new: true,
    runValidators: true,
  })

  return res.status(200).json({
    success: true,
    data: job,
  });
});


// @desc      Delete job
// @access    Private
exports.deleteJob = asyncHandler(async (req, res) => {
  await Job.findByIdAndDelete(req.params.jobId);

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