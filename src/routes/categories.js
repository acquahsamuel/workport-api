const express = require('express');

const {
  protect,
  authorize
} = require('../middleware/auth');
const {
  getCategories,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
  deleteAllCategory
} = require('../controllers/category');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));
router.route('/').get(getCategories).post(createCategory);

router
  .route('/:categoryId')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory)
  .delete(deleteAllCategory);

module.exports = router;