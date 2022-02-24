const express = require('express');
const Job = require('../models/Job');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  deleteAllJobs,
} = require('../controllers/jobs');

router
  .route('/')
  .get(advancedResults(Job, { path: 'company' }), getJobs)
  .post(protect, authorize('user', 'admin'), createJob)
  .delete(protect, authorize('admin'), deleteAllJobs);

router.route('/:id').get(getJob).put(updateJob).delete(protect, deleteJob);

module.exports = router;
