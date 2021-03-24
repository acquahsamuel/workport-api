const Job = require('../models/Job');
const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/async');

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'home';
  next();
});

// @desc          Get Job listings
// @route         www.workport.com/index
// @access        Public
exports.getHomeIndex = asyncHandler(async (req, res, next) => {
  const jobs = await Job.find({});
  res.status(200).render('home/index', {
    jobs,
  });
  next();
});



// @desc          Get Job listings
// @route         www.workport.com/job-details
// @access        Public
exports.getHomeJobDetails = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  res.status(200).render(`home/job-details`, {
    job,
  });
  next();
});

// @desc          Get Job listings
// @route         www.workport.com/about
// @access        Public
exports.getHomeAbout = asyncHandler(async (req, res, next) => {
  res.status(200).render('home/about');
  next();
});

// @desc          Get Job listings
// @route         www.workport.com/blog
// @access        Public
exports.getHomeBlog = asyncHandler(async (req, res, next) => {
  res.status(200).render('home/blog');
  next();
});

// @desc          Get Job listings
// @route         www.workport.com/job-listings
// @access        Public
exports.getHomeJobListing = asyncHandler(async (req, res, next) => {
  const job = await Job.find();
  res.status(200).render(`home/job-listing`, {
    job,
  });
  next();
});

// @desc          Get Job listings
// @route         www.workport.com/login
// @access        Public
exports.getHomeLogin = asyncHandler(async (req, res, next) => {
  res.status(200).render('home/login');
  next();
});

// @desc          Get Job listings
// @route         www.workport.com/register
// @access        Public
exports.getHomeRegister = asyncHandler(async (req, res, next) => {
  res.status(200).render('home/register');
  next();
});

// @desc          Get Job listings
// @route         www.workport.com/single-blog
// @access        Public
exports.getHomeSingleBlog = asyncHandler(async (req, res, next) => {
  res.status(200).render('home/single-blog');
  next();
});

module.exports = {
  router,
  getHomeIndex: this.getHomeIndex,
  getHomeJobDetails: this.getHomeJobDetails,
  getHomeAbout: this.getHomeAbout,
  getHomeBlog: this.getHomeBlog,
  getHomeJobListing: this.getHomeJobListing,
  getHomeLogin: this.getHomeLogin,
  getHomeRegister: this.getHomeRegister,
  getHomeSingleBlog: this.getHomeSingleBlog,
};
