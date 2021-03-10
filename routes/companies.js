const express = require("express");

const {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany
} = require("../controllers/companies");
const router = express.Router();

router.route("/").get(getCompanies).post(createCompany);
router.route("/:id").get(getCompany).put(updateCompany).delete(deleteCompany);

module.exports = router;

