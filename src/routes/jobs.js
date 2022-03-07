const express = require('express');
const jobController = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Include other resource routers
const companyRouter = require('./companies');

// api/v1/jobs/:companyId/job
router.use('/:companyId/jobs', companyRouter);

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

module.exports = router;

// api/v1/company/companyId/job
