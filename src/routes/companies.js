const express = require('express');
const Company = require('../models/Company');
const {
  getCompanies,
  createCompany,
  deleteAllCompanies,
  updateCompany,
  deleteCompany,
  getCompany,
  getMyCompany,
} = require('../controllers/company');
const {
  protect,
  authorize
} = require('../middleware/auth');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router( { mergeParams: true } );

// Nested route
// const jobRouter = require('./jobs');
// router.use('/:jobId', jobRouter);


router
  .route('/')
  .get(advancedResults(Company , 'jobs'), getCompanies)
  .post(protect, authorize('user', 'admin'), createCompany)
  .delete(protect, authorize('admin'), deleteAllCompanies);


router
  .route('/companiesListing')
  .get(protect , authorize('user' , 'admin'), getMyCompany);

router
  .route('/:companyId')
  .get(getCompany)
  .put(protect, authorize('user', 'admin'), updateCompany)
  .delete(protect, authorize('user', 'admin'), deleteCompany);

module.exports = router;