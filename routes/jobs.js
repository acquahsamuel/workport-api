const express = require("express");
const router = express.Router();
const {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    deleteAllJobs,
} = require("../controllers/jobs");

const Job = require('../models/Job');
const advancedResults = require('../middleware/advancedResults');

const {
    protect
} = require("../middleware/auth");

router.route('/')
    .get(advancedResults(Job, {
            path: 'company'
        }),
        getJobs
    )
    .post(createJob);

router.route('/:id')
    .get(getJob)
    .put(updateJob)
    .delete(protect, deleteJob)
    .delete(protect, deleteAllJobs);

module.exports = router;