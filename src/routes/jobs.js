const express = require('express');
const Job = require('../models/Job');
const {
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob,
  deleteAllJobs
} = require('../controllers/job');
const {
  protect,
  authorize
} = require('../middleware/auth');

const router = express.Router({
  mergeParams: true
});
const advancedResults = require('../middleware/advancedResults');

// Nest route
const companyRouter = require('./companies');

// Re-router into other 
// get all jobs for a specific company
// /api/v1/jobs/compayId/jobs
router.use('/:companyId/jobs', companyRouter);



router
  .route('/')
  .get(advancedResults(Job), getJobs)
  .post(protect, authorize('user', 'admin'), createJob)
  .delete(protect, authorize('admin'), deleteAllJobs);

router
  .route('/:id')
  .get(getJob)
  .put(updateJob)
  .delete(protect, deleteJob);

module.exports = router;