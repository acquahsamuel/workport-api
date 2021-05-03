const express = require("express");

// Importing controllers
const {
  createJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");
const router = express.Router();

const Companies = require("../models/Company");
const Jobs = require('../models/Job');

// Advanced results query
const advancedResults = require("../middleware/advancedResults");

//Include other resources routers
const companiesRouter = require("./companies");

// Re-route in other resource routers
router.use("/:jobId/companies", companiesRouter);

// Route paths
router
  .route("/")
  .get(advancedResults(Jobs, "jobs"), getJobs)
  .post(createJob);
router.route("/:id").get(getJob).put(updateJob).delete(deleteJob);

module.exports = router;
