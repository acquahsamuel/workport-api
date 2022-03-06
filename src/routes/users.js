const express = require('express');

const { protect, authorize } = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/').get(userController.getUsers).post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
