const Company = require("../models/Company");
const ErrorResponse = require("../utils/errorResponse");

// @desc          Create a  company profile
// @route         POST /api/v1/company
// @access        Private
exports.createCompany = async (req, res, next) => {
  const company = await Company.create(req.body);
  res.status(201).json({
    message: "success",
    success: true,
    count: company.length,
    data: company
  });
};

// @desc          Get all company profile
// @route         GET /api/v1/company
// @access        Private
exports.getCompanies = async (req, res, next) => {
  try {
    const company = await Company.find();

    res.status(200).json({
      message: "success ",
      success: true,
      count: company.length,
      data: company
    });
  } catch (err) {
    next(err);
  }
};

// @desc          Get a company profile
// @route         GET /api/v1/company/:id
// @access        Private
exports.getCompany = async(req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return next(
        new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      message: "success",
      success: true,
      data: company
    });
  } catch (err) {
   next(err);
  }
};

// @desc          Update a single Company
// @route         PUT /api/v1/company/:id
// @access        Public
exports.updateCompany = async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!company) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({
    message: "Success",
    success: true,
    data: company
  });
  next(err);
};

// @desc          Delete a single Company
// @route         DELETE /api/v1/company/:id
// @access        Private
exports.deleteCompany = async (req, res, next) => {
  const company = await Company.findByIdAndDelete(req.params.id);

  if (!company) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({
    message: "success",
    success: true,
    data: {}
  });
  next(err);
};
