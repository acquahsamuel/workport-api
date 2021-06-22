const express = require("express");
const {
  getAdminIndex,
  getAdminPostJob,
  getAdminManageJob,
  getAdminInvoice,
  postAdminJob,
} = require("../controllers/admin");

const router = express.Router();

router.get("/index", getAdminIndex);
router.get("/post-job", getAdminPostJob);

router.post("/post-job", postAdminJob);
router.get("/manage-job", getAdminManageJob);
router.get("/invoice", getAdminInvoice);

module.exports = router;
