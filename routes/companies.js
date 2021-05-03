const express = require("express");

const {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companies");

// Merge in external routes
const router = express.Router({ mergeParams: true });

// Route paths
router.route("/").get(getCompanies).post(createCompany);
router.route("/:id").get(getCompany).put(updateCompany).delete(deleteCompany);

module.exports = router;
