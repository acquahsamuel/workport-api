const express = require("express");
const router = express.Router();

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});

router.get("/", (req, res, next) => {
  
  res.render("admin/index");
});

router.get("/blank", (req, res, next) => {
  res.render("admin/blank");
});

router.get("/post-job", (req, res) => {
  res.render("admin/post-job");
});

router.get("/manage-job", (req, res) => {
  res.render("admin/manage-job");
});

router.get("/invoice", (req, res) => {
  res.render("admin/invoice");
});

module.exports = router;
