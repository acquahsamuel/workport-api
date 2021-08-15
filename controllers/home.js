const Job = require("../models/Job");
const express = require("express");
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
  const slug = req.params.slug;
  const job = await Job.findById(slug);
  // const job = await Job.findById(jobId);

  res.status(200).render(`home/job-details`, {
    pageTitle: "Job Details",
    path: "/home/job-details",
    job,
    // company
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
exports.getHomeSignup = asyncHandler(async (req, res, next) => {
  await res.status(200).render("home/signup", {
    pageTitle: "Account Registration",
    path: "/home/signup",
  });
});