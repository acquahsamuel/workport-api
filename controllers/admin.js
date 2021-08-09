const Job = require("../models/Job");
// const Company = require("../models/Company");
const express = require("express");
const router = express.Router();

// @desc          Delete a single Company
// @route         www.workport.com/index
// @access        Private
exports.getAdminIndex = async (req, res, next) => {
  await res.status(200).render("admin/index", {
    pageTitle: "Dashboard",
    path: "/admin/index",
  });
};

// @desc          Get post job
// @route         www.workport.com/index
// @access        Private
exports.getAdminPostJob = (req, res, next) => {
  res.status(200).render("admin/post-job", {
    pageTitle: "Post Job",
    path: "/admin/post-job",
  });
};

// @desc          Post a single Job
// @route         www.workport.com/index
// @access        Private
exports.postAdminJob = (req, res, next) => {
  const position = req.body.position;
  const locationAllowed = req.body.locationAllowed;
  const jobStatus = req.body.jobStatus;
  const jobCategory = req.body.jobCategory;
  const jobTags = req.body.jobTags;
  const minimumSalary = req.body.minimumSalary;
  const maximumSalary = req.body.maximumSalary;
  const currency = req.body.currency;
  const salaryInterval = req.body.salaryInterval;
  const jobDescription = req.body.jobDescription;
  const applicationURL = req.body.applicationURL;
  const applyToEmail = req.body.applyToEmail;

  const companyName = req.body.companyName;
  const companyLogo = req.body.companyLogo;
  const companyTwitter = req.body.companyTwitter;
  const companyEmail = req.body.companyEmail;

  const job = new Job({
    position: position,
    locationAllowed: locationAllowed,
    jobStatus: jobStatus,
    jobCategory: jobCategory,
    jobTags: jobTags,
    minimumSalary: minimumSalary,
    maximumSalary: maximumSalary,
    currency: currency,
    salaryInterval: salaryInterval,
    jobDescription: jobDescription,
    applicationURL: applicationURL,
    applyToEmail: applyToEmail,

    company: {
      companyName: companyName,
      companyLogo: companyLogo,
      companyTwitter: companyTwitter,
      companyEmail: companyEmail,
    },
  });

  job
    .save()
    .then((result) => {
      console.log("Job Created");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

// @desc          Get  a single Company
// @route         www.workport.com/index
// @access        Private
exports.getAdminManageJob = async (req, res, next) => {
  const jobs = await Job.find({});
  await res.status(200).render("admin/manage-job", {
    pageTitle: "Manage Job",
    path: "/admin/manage-job",
    jobs
  });
};


// @desc          Get  a  Job  
// @route         www.workport.com/index
// @access        Private
exports.getAdminManageSingleJob = async (req, res, next) => {
  // const jobs = await Job.findById();
  await res.status(200).render("admin/manage-job", {
    pageTitle: "Manage Job",
    path: "/admin/manage-job",
  });
};



// @desc          Delete a single Company
// @route         www.workport.com/index
// @access        Private
exports.getAdminInvoice = async (req, res, next) => {
  await res.status(200).render("admin/invoice", {
    pageTitle: "Invoice",
    path: "/admin/invoice",
  });
};