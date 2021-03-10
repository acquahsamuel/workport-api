const express = require("express");

//@desc      from => jobs controller
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/users");

const router = express.Router();

/*
 * @desc  slash( / ) means route which is 
 * 
 * /api/v1/user
 * /api/v1/users/:id
 * 
*/

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
