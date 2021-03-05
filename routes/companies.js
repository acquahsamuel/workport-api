const express = require("express");
const router = express.Router();
const {
  createCompany,
  getAllCompanies,
  getCompany,
  updateCompany,
  deleteCompany
} = require("../controllers/companies");

router.route("/").post(createCompany).get(getAllCompanies);
router.route("/:id").get(getCompany).put(updateCompany).delete(deleteCompany);

module.exports = router;

