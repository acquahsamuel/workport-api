const express = require("express");

//@desc      from => jobs controller
const {
  createJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob
} = require("../controllers/jobs");

const router = express.Router();

/*
 * @desc  slash( / ) means route which is 
 * 
 * /api/v1/jobs
 * /api/v1/jobs/:id
 * 
*/

router.route("/").get(getJobs).post(createJob);

router.route("/:id").get(getJob).put(updateJob).delete(deleteJob);

module.exports = router;
