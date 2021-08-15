const express = require("express");
const {
  getHomeIndex,
  getHomeJobDetails,
  getHomeJobListing,
  getHomeLogin,
  getHomeSignup,
} = require("../controllers/home");
const router = express.Router();

router.get("/", getHomeIndex);
router.get("/job-details/:slug", getHomeJobDetails);
router.get("/job-listing", getHomeJobListing);
router.get("/login", getHomeLogin);
router.get("/signup", getHomeSignup);


module.exports = router;

