const express = require("express");
const router = express.Router();

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});

router.get("/", (req, res, next) => {
  res.render("admin/index");
});

router.get("/profile", (req, res) => {
  res.render("admin/profile");
});

router.get("/form-basic", (req, res) => {
  res.render("admin/form-basic");
});


module.exports = router;


