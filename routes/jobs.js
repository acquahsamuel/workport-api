const express = require('express');

//@desc      from => jobs controller
const {
  createJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');
const router = express.Router();

const Job = require('../models/Job');
const advancedResults = require('../middleware/advancedResults');


/*
 *
 * @des varification here
 *
 *  
 */
router.route('/').get(getJobs).post(createJob);
router.route('/:id').get(getJob).put(updateJob).delete(deleteJob);

module.exports = router;
