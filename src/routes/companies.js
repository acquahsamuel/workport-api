const express = require('express');
const Company = require('../models/Company');
const companyController = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

// Nested route
// const jobRouter = require('./jobs');

// router.use('/:companyId/jobs', jobRouter);

router
  .route('/')
  .get(advancedResults(Company), companyController.getCompanies)
  .post(protect, authorize('user', 'admin'), companyController.createCompany)
  .delete(protect, authorize('admin'), companyController.deleteAllCompanies);

router
  .route('/:id')
  .get(companyController.getCompany)
  .put(protect, authorize('user', 'admin'), companyController.updateCompany)
  .delete(protect, authorize('user', 'admin'), companyController.deleteCompany);

module.exports = router;
