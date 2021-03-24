const express = require('express');
const router = express.Router();

// @desc          Delete a single Company
// @route         www.workport.com/index
// @access        Private
exports.getAdminIndex = async (req, res, next) => {
  res.status(200).render('admin/index', {
    pageTitle: 'Dashboard',
    path: '/admin/index',
  });
};

// @desc          Delete a single Company
// @route         www.workport.com/index
// @access        Private
exports.getAdminPostJob = async (req, res, next) => {
  res.status(200).render('admin/post-job', {
    pageTitle: 'Post Job',
    path: '/admin/post-job',
  });
};

// @desc          Delete a single Company
// @route         www.workport.com/index
// @access        Private
exports.getAdminManageJob = async (req, res, next) => {
  res.status(200).render('admin/manage-job', {
    pageTitle: 'Manage Job',
    path: '/admin/manage-job',
  });
};

// @desc          Delete a single Company
// @route         www.workport.com/index
// @access        Private
exports.getAdminInvoice = async (req, res, next) => {
  res.status(200).render('admin/invoice', {
    pageTitle: 'Invoice',
    path: '/admin/invoice',
  });
};

// module.exports = router;
