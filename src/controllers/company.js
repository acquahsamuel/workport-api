const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Company = require('../models/Company');

// @desc      Create job
// @route     POST /api/v1/companies
// @route     POST /api/v1/companies/:companyId/jobs
// @access    Public
// eslint-disable-next-line consistent-return
exports.getCompanies = asyncHandler(async (req, res, next) => {
  const companies = await Company.find();

  if (!companies) {
    return next(new ErrorResponse(`No Companies`, 400));
  }

  res.status(200).json({
    success: true,
    count: companies.length,
    data: companies,
  });
});

// @desc      Create job
// @route     POST /api/v1/createJob
// @access    Public
exports.createCompany = asyncHandler(async (req, res) => {
  if (!req.body.user) req.body.user = req.user;
  if (!req.body.job) req.body.job = req.params.job;

  const company = await Company.create(req.body);

  res.status(201).json({
    success: true,
    data: company,
  });
});

// @desc      Update job
// @route     PATCH /api/v1/job/:jobId
// @access    Public
// eslint-disable-next-line consistent-return
exports.updateCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!company) {
    return next(
      new ErrorResponse(`Company with ${req.params.id} not found `, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: company,
  });
});

// @desc      Get single company
// @route     GET /api/v1/job/:jobId
// @access    Public
// eslint-disable-next-line consistent-return
exports.getCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    return next(
      new ErrorResponse(`Company with ${req.params.id} not found `, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: company,
  });
});


// @desc      Get my company listing
exports.getMyCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.find({ user: req.user.id });
  if (!company) {
    return next(
      new ErrorResponse(`Company with ${req.params.id} not found `, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: company,
  });
})


// @desc      Delete job
// @route     GET /api/v1/job/:jobId
// @access    Public
exports.deleteCompany = asyncHandler(async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Delete all companies in
// @route     GET /api/v1/companies
// @access    Private
exports.deleteAllCompanies = asyncHandler(async (req, res) => {
  await Company.deleteMany();

  res.status(200).json({
    success: true,
    data: {},
  });
});
