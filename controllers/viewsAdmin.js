const express = require("express");
const router = express.Router();

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});

// @desc          Delete a single Company
// @route         www.workport.com/index
// @access        Private
exports.getAdminIndex = async (req, res, next) => {
  res.status(200).render("admin/index");
};



// @desc          Delete a single Company
// @route         www.workport.com/index
// @access        Private
exports.getAdminPostJob = async (req, res, next) => {
  res.status(200).render("admin/post-job");
};

// @desc          Delete a single Company
// @route         www.workport.com/index
// @access        Private
exports.getAdminManageJob = async (req, res, next) => {
  res.status(200).render("admin/manage-job");
};

// @desc          Delete a single Company
// @route         www.workport.com/index
// @access        Private
exports.getAdminInvoice = async (req, res, next) => {
  res.status(200).render("admin/invoice");
};



// module.exports = router;


