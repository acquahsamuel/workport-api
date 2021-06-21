const express = require("express");

//@desc      from => jobs controller
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = express.Router();

module.exports = router;
