const express = require('express')
const Job = require('../models/Job')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse');


// @access        Public
exports.getHomeIndex = asyncHandler(async (req, res, next) => {
  const jobs = await Job.find({})
  const totalJobs = jobs.length;
  res.status(200).render('home/index', {
    pageTitle: 'Homepage',
    jobs: jobs,
    path: '/home/index',
    totalJobs
  })
})


// @access        Public
exports.getHomeJobDetails = asyncHandler(async (req, res, next) => {
  const job = await Job.findOne({ slug: req.params.slug })

  if (!job) {
    return next(
      new ErrorResponse(`Job not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).render(`home/job-details`, {
    pageTitle: 'Job Details',
    path: '/home/job-details',
    job,
  })
})

// @access        Public
exports.getHomeJobListing = asyncHandler(async (req, res, next) => {
  const job = await Job.find();
  const totalJobs = job.length;
  res.status(200).render(`home/job-listing`, {
    pageTitle: 'Job Listings',
    path: '/home/job-listing',
    job,
    totalJobs
  })
})


// @access        Public
exports.getHomeLogin = asyncHandler(async (req, res, next) => {
  await res.status(200).render('home/login', {
    pageTitle: 'Account Login',
    path: '/home/login',
  })
})


// @access        Public
exports.getHomeSignup = asyncHandler(async (req, res, next) => {
  await res.status(200).render('home/signup', {
    pageTitle: 'Account Registration',
    path: '/home/signup',
  })
})
