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

router.use('/:jobId/companies', companyRouter);

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