const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Category = require('../models/Category');

// @desc      Create job
// @route     POST /api/v1/category
// @access    Public
// eslint-disable-next-line consistent-return
exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();

  if (!categories) {
    return next(new ErrorResponse(`No Categories`, 400));
  }

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});



// @desc      Create job
// @route     POST /api/v1/category
// @access    Public
exports.createCategory = asyncHandler(async (req, res) => {
    // Add user to req,body
    const category = await Category.create(req.body);
  
    return res.status(201).json({
      success: true,
      data: category,
    });
  });


// @desc      Update job
// @route     PATCH /api/v1/category/:categoryId
// @access    Public
// eslint-disable-next-line consistent-return
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(
      new ErrorResponse(`Category with ${req.params.id} not found `, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc      Get single company
// @route     GET /api/v1/category/:categoryId
// @access    Public
// eslint-disable-next-line consistent-return
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(
      new ErrorResponse(`Category with ${req.params.id} not found `, 400)
    );
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc      Delete job
// @route     GET /api/v1/job/:jobId
// @access    Public
exports.deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Delete all companies in
// @route     GET /api/v1/companies
// @access    Private
exports.deleteAllCategory = asyncHandler(async (req, res) => {
  await Category.deleteMany();

  res.status(200).json({
    success: true,
    data: {},
  });
});
