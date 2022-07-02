const express = require('express');

const {
  protect,
  authorize
} = require('../middleware/auth');
const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser
} = require('../controllers/user');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/').get(getUsers).post(createUser);

router
  .route('/:userId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;