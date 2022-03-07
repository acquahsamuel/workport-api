const express = require('express');
const companyController = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(companyController.getCompanies)
  .post(protect, authorize('user', 'admin'), companyController.createCompany)
  .delete(protect, authorize('admin'), companyController.deleteAllCompanies);

router
  .route('/:id')
  .get(companyController.getCompany)
  .put(protect, authorize('user', 'admin'), companyController.updateCompany)
  .delete(protect, authorize('user', 'admin'), companyController.deleteCompany);

module.exports = router;
