const express = require("express");
const router = express.Router();

const Job = require("../models/Job");

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "home";
  next();
});

// @desc          Delete a single Company
// @route         DELETE /api/v1/company/:id
// @access        Private
exports.getHomeIndex = async (req, res, next) => {
  const job = await Job.find({});
  res.status(200).render("home/index", {
    job
  });
};

// @desc          Delete a single Company
// @route         DELETE /api/v1/company/:id
// @access        Private
exports.getHomeJobDetails = async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  res.status(200).render("home/job-details", {
    job
  });
};

// @desc          Delete a single Company
// @route         DELETE /api/v1/company/:id
// @access        Private
exports.getHomeAbout = async (req, res, next) => {
  res, status(200).render("home/about", {});
};

// @desc          Delete a single Company
// @route         DELETE /api/v1/company/:id
// @access        Private
exports.getHomeBlog = async (req, res, next) => {
  res.status(200).render("home/blog");
};

// @desc          Delete a single Company
// @route         DELETE /api/v1/company/:id
// @access        Private
exports.getHomeJobListing = async (req, res) => {
  res.status(200).render("home/job-listing");
};

// @desc          Delete a single Company
// @route         DELETE /api/v1/company/:id
// @access        Private
exports.getHomeLogin = async (req, res, next) => {
  res.status(200).render("home/login");
};

// @desc          Delete a single Company
// @route         DELETE /api/v1/company/:id
// @access        Private
exports.getHomeRegister = async (req, res, next) => {
  res.status(200).render("home/register");
};

// @desc          Delete a single Company
// @route         DELETE /api/v1/company/:id
// @access        Private
exports.getHomeSingleBlog = async (req, res, next) => {
  res.status(200).render("home/single-blog");
};

module.exports = router;
