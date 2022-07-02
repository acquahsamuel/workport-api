const express = require('express');
const Company = require('../models/Company');
const {
  getCompanies,
  createCompany,
  deleteAllCompanies,
  updateCompany,
  deleteCompany,
  getCompany
} = require('../controllers/company');
const {
  protect,
  authorize
} = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

// Nested route
// const jobRouter = require('./jobs');
// router.use('/:companyId/jobs', jobRouter);

router
  .route('/')
  .get(advancedResults(Company), getCompanies)
  .post(protect, authorize('user', 'admin'), createCompany)
  .delete(protect, authorize('admin'), deleteAllCompanies);

router
  .route('/:id')
  .get(getCompany)
  .put(protect, authorize('user', 'admin'), updateCompany)
  .delete(protect, authorize('user', 'admin'), deleteCompany);

module.exports = router;