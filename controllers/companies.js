const Company = require("../models/Company");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc          Create a  company profile
// @route         POST /api/v1/company
// @access        Private
exports.createCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.create(req.body);

  res.status(201).json({
    message: "success",
    success: true,
    data: company,
  });
});

// @desc          Get all company profile
// @route         GET /api/v1/company
// @route         GET /api/v1/jobs/:jobId/companies
// @access        Private
exports.getCompanies = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.jobId) {
    query = Company.find({ job: req.params.jobId });
  } else {
    query = Company.find({});
  }
  const companies = await query;

  res.status(200).json({
    success: true,
    count: companies.length,
    data: companies,
  });
});

// @desc          Get a company profile
// @route         GET /api/v1/company/:id
// @access        Private
exports.getCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return next(
      new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: company,
  });
});

// @desc          Update a single Company
// @route         PUT /api/v1/company/:id
// @access        Public
exports.updateCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!company) {
    return next(
      new ErrorResponse(`Company not found with id of ${req.parms.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: company,
  });
});

// @desc          Delete a single Company
// @route         DELETE /api/v1/company/:id
// @access        Private
exports.deleteCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findByIdAndDelete(req.params.id);

  if (!company) {
    return next(
      new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
