const express = require("express");
const router = express.Router();

/**
 * @Testing_
 */
const Jobs = require('../models/Job');


router.all("/*", (req, res, next) => {
  req.app.locals.layout = "home";
  next();
});


router.get("/", (req, res, next) => {
  Jobs.find()
  .then(job => {
    res.render("home/index", {
      job
    });
  })
  .catch(error => {
    console.log("There was something wrong" + error);
  });
});


router.get("/job-details/:id", (req, res) => {
  Jobs.findById(req.params.id)
 .then(job => {
   res.render("home/job-details", {
     job
   });
 })
 .catch(error => {
   console.log("There was something wrong" + error);
 });
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
