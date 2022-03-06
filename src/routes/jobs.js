const express = require('express');
const jobController = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(jobController.getJobs)
  .post(protect, authorize('user', 'admin'), jobController.createJob)
  .delete(protect, authorize('admin'), jobController.deleteAllJobs);

router
  .route('/:id')
  .get(jobController.getJob)
  .put(jobController.updateJob)
  .delete(protect, jobController.deleteJob);

/** Company controller */
const companyController = require('../controllers/companyController');

// /api/v1/companies/:name/jobs
router
  .route('/:jobId/companies')
  .post(authorize('users'), companyController.createCompany);

module.exports = router;
