const Job = require("../models/Job");
const Companies = require("../models/Company");

const express = require("express");
const router = express.Router();

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "home";
  next();
});

// @desc          Get Job listings
// @route         www.workport.com/index
// @access        Public
exports.getHomeIndex = async (req, res, next) => {
  const job = await Job.find({});
  res.status(200).render("home/index", {
    job
  });
  next();
};

// @desc          Get Job listings
// @route         www.workport.com/job-details
// @access        Public
exports.getHomeJobDetails = async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  res.status(200).render(`home/job-details`, {
    job
  });
};

// @desc          Get Job listings
// @route         www.workport.com/about
// @access        Public
exports.getHomeAbout = async (req, res, next) => {
  res, status(200).render("home/about", {});
  next();
};

// @desc          Get Job listings
// @route         www.workport.com/blog
// @access        Public
exports.getHomeBlog = async (req, res, next) => {
  res.status(200).render("home/blog");
  next();
};

// @desc          Get Job listings
// @route         www.workport.com/job-listings
// @access        Public
exports.getHomeJobListing = async (req, res, next) => {
  const job = await Job.find({});
  res.status(200).render(`home/job-listing`, {
    job
  });
  next();
};

// @desc          Get Job listings
// @route         www.workport.com/login
// @access        Public
exports.getHomeLogin = async (req, res, next) => {
  res.status(200).render("home/login");
  next();
};

// @desc          Get Job listings
// @route         www.workport.com/register
// @access        Public
exports.getHomeRegister = async (req, res, next) => {
  res.status(200).render("home/register");
  next();
};

// @desc          Get Job listings
// @route         www.workport.com/single-blog
// @access        Public
exports.getHomeSingleBlog = async (req, res, next) => {
  res.status(200).render("home/single-blog");
  next();
};

// module.exports = router;

module.exports = {
  router,
  getHomeIndex: this.getHomeIndex,
  getHomeJobDetails: this.getHomeJobDetails,
  getHomeAbout: this.getHomeAbout,
  getHomeBlog: this.getHomeBlog,
  getHomeJobListing: this.getHomeJobListing,
  getHomeLogin: this.getHomeLogin,
  getHomeRegister: this.getHomeRegister,
  getHomeSingleBlog: this.getHomeSingleBlog
};
