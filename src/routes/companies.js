const express = require('express');

const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companies');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getCompanies)
  .post(protect, authorize('user', 'admin'), createCompany);

router.route('/:id').get(getCompany).put(updateCompany).delete(deleteCompany);

module.exports = router;
