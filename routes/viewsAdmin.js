const express = require("express");
const {
  getAdminIndex,
  getAdminPostJob,
  getAdminManageJob,
  getAdminInvoice
} = require("../controllers/viewsAdmin");

const router = express.Router();

router.get("/index", getAdminIndex);
router.get("/post-job", getAdminPostJob);
router.get("/manage-job", getAdminManageJob);
router.get("/invoice", getAdminInvoice);

module.exports = router;

