const express = require("express");
const router = express.Router();

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "home";
  next();
});

router.get("/", (req, res, next) => {
  res.render("home/index");
});

router.get("/about", (req, res) => {
  res.render("home/about");
});

router.get("/contact", (req, res) => {
  res.render("home/contact");
});

router.get("/job-listing", (req, res) => {
  res.render("home/job-listing");
});

router.get("/job-details", (req, res) => {
  res.render("home/job-details");
});

router.get("/login", (req, res) => {
  res.render("home/login");
});

router.get("/register", (req, res) => {
  res.render("home/register");
});

router.get("/about", (req, res) => {
  res.render("home/about");
});

router.get("/elements", (req, res) => {
  res.render("home/elements");
});

module.exports = router;
