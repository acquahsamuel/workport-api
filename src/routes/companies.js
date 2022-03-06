const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(companyController.getCompanies)
  .post(protect, authorize('user', 'admin'), companyController.createCompany);

router
  .route('/:id')
  .get(companyController.getCompany)
  .put(protect, authorize('user', 'admin'), companyController.updateCompany)
  .delete(protect, authorize('user', 'admin'), companyController.deleteCompany);

module.exports = router;
