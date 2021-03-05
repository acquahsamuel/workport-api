const Job = require("../models/Job");


// @desc          Create a  Job
// @route         POST /api/v1/job
// @access        Private
exports.createJob = async (req, res, next) => {
  const job = await Job.create(req.body);

  res.status(200).json({
    success: true,
    message : "Job Created",
    data: job
  });
};


// @desc          Get all  Jobs
// @route         GET /api/v1/job/:id 
// @access        Public
exports.getAllJobs = async (req, res, next) => {
  const job = await Job.find({});

  res.status(200).json({
    success: true,
    count: job.length,
    message : "success",
    data: job
  });
};


// @desc          Get a single Job
// @route         GET /api/v1/job/:id 
// @access        Public
exports.getJob = async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  res.status(200).json({
    success: true,
    count: job.length,
    message : "success",
    data: job
  });
};

// @desc          Update a single Job
// @route         PUT /api/v1/job/:id 
// @access        Public
exports.updateJob = async(req, res ,next) =>{
  const job = await Job.findByIdAndUpdate(req.params.id);

  res.status(200).json({
    success: true,
    count: job.length,
    message : "success",
    data: job
  });
}


// @desc          Delete a single Job
// @route         DELETE /api/v1/job/:id 
// @access        Private
exports.deleteJob = async(req, res ,next) =>{
  const job = await Job.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    count: job.length,
    message : "success",
    data: job
  });
}
