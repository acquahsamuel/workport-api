const Job = require("../models/Job");
const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/async");


// @desc          Get Job listings
// @route         www.workport.com/index
// @access        Public
exports.getHomeIndex = asyncHandler(async (req, res, next) => {
  const jobs = await Job.find({});
  res.status(200).render("home/index", {
    pageTitle: "Homepage",
    jobs: jobs,
    path: "/home/index",
  });
});


// @desc          Get Job listings
// @route         www.workport.com/job-details
// @access        Public
exports.getHomeJobDetails = asyncHandler(async (req, res, next) => {
  const jobId = req.params.jobId;
  // console.log(jobId);
  const job = await Job.findById(jobId);
  res.status(200).render(`home/job-details`, {
    pageTitle: "Job Details",
    path: "/home/job-details",
    job,
  });
});

// @desc          Get Job listings
// @route         www.workport.com/about
// @access        Public
exports.getHomeAbout = asyncHandler(async (req, res, next) => {
  await res.status(200).render("home/about", {
    pageTitle: "About Us",
    path: "/home/about",
  });
});

// @desc          Get Job listings
// @route         www.workport.com/blog
// @access        Public
exports.getHomeBlog = asyncHandler(async (req, res, next) => {
  await res.status(200).render("home/blog", {
    pageTitle: "Blog",
    path: "/home/blog",
  });
});

// @desc          Get Job listings
// @route         www.workport.com/job-listings
// @access        Public
exports.getHomeJobListing = asyncHandler(async (req, res, next) => {
  const job = await Job.find();
  res.status(200).render(`home/job-listing`, {
    pageTitle: "Job Listings",
    path: "/home/job-listing",
    job,
  });
});

// @desc          Get Job listings
// @route         www.workport.com/login
// @access        Public
exports.getHomeLogin = asyncHandler(async (req, res, next) => {
  await res.status(200).render("home/login", {
    pageTitle: "Account Login",
    path: "/home/login",
  });
});

// @desc          Get Job listings
// @route         www.workport.com/register
// @access        Public
exports.getHomeRegister = asyncHandler(async (req, res, next) => {
  await res.status(200).render("home/register", {
    pageTitle: "Account Registration",
    path: "/home/register",
  });
});

// @desc          Get Job listings
// @route         www.workport.com/single-blog
// @access        Public
exports.getHomeSingleBlog = asyncHandler(async (req, res, next) => {
  await res.status(200).render("home/single-blog", {
    pageTitle: "Single Blog",
    path: "/home/single-blog",
  });
});

// @desc          Get Job listings
// @route         www.workport.com/single-blog
// @access        Public
exports.getHome404 = asyncHandler(async (req, res, next) => {
  await res.status(200).render("home/error-404", {
    pageTitle: "404",
    path: "/home/error-404",
  });
  next();
});
