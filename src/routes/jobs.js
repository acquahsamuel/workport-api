const express = require('express');
const Job = require('../models/Job');
const jobController = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });
const advancedResults = require('../middleware/advancedResults');

// Nest route
const companyRouter = require('./companies');

router.use('/:jobId/companies', companyRouter);

router
  .route('/')
  .get(advancedResults(Job), jobController.getJobs)
  .post(protect, authorize('user', 'admin'), jobController.createJob)
  .delete(protect, authorize('admin'), jobController.deleteAllJobs);

router
  .route('/:id')
  .get(jobController.getJob)
  .put(jobController.updateJob)
  .delete(protect, jobController.deleteJob);

module.exports = router;


