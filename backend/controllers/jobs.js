const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Job = require('../models/Job');

// @desc      Create job
// @route     POST /api/v1/getJobs
// @access    Public
exports.getJobs = asyncHandler(async (req, res, next) => {
    const jobs = await Job.find({});

    res.status(200).json({
        success: true,
        count: jobs.length,
        message: jobs
    });
});


// @desc      Create job
// @route     POST /api/v1/createJob
// @access    Public
exports.createJob = asyncHandler(async (req, res, next) => {
    const job = await Job.create(req.body);

    res.status(201).json({
        success: true,
        data: job
    });
});


// @desc      Update job
// @route     PATCH /api/v1/job/:jobId
// @access    Public
exports.updateJob = asyncHandler(async (req, res, next) => {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!job) {
        return (next(new ErrorResponse(`Job with ${req.params.id} not found `, 400)))
    }

    res.status(200).json({
        success: true,
        data: job
    });
});



// @desc      Get single job
// @route     GET /api/v1/job/:jobId
// @access    Public
exports.getJob = asyncHandler(async (req, res, next) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
        return (next(new ErrorResponse(`Job with ${req.params.id} not found `, 400)))
    }

    res.status(200).json({
        success: true,
        data: job
    });
});



// @desc      Delete job
// @route     GET /api/v1/job/:jobId
// @access    Public
exports.deleteJob = asyncHandler(async (req, res, next) => {
    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: {}
    });
});