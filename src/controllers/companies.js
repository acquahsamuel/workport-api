const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Company = require("../models/Company");

// @desc      Create job
// @route     POST /api/v1/getJobs
// @access    Public
exports.getCompanies = asyncHandler(async (req, res, next) => {
  //Populate (embedding document in document)
  const companies = await Company.find().populate({
    path: "jobs",
    select: "jobDescription  jobStatus jobCategory"
  });

  if (!companies) {
    return next(new ErrorResponse(`No Companies`, 400));
  }

  res.status(200).json({
    success: true,
    count: companies.length,
    data: companies
  });
});

// @desc      Create job
// @route     POST /api/v1/createJob
// @access    Public
exports.createCompany = asyncHandler(async (req, res, next) => {
  req.body.user = req.user;
  const company = await Company.create(req.body);

  res.status(201).json({
    success: true,
    data: company
  });
});

// @desc      Update job
// @route     PATCH /api/v1/job/:jobId
// @access    Public
exports.updateCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!company) {
    return next(
      new ErrorResponse(`Company with ${req.params.id} not found `, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: company
  });
});

// @desc      Get single company
// @route     GET /api/v1/job/:jobId
// @access    Public
exports.getCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    return next(
      new ErrorResponse(`Company with ${req.params.id} not found `, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: company
  });
});

// @desc      Delete job
// @route     GET /api/v1/job/:jobId
// @access    Public
exports.deleteCompany = asyncHandler(async (req, res, next) => {
  await Company.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
