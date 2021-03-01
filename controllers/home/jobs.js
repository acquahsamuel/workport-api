const Job = require("../../models/Job");

exports.getJobs = async (req, res, next) => {
  const job = await Job.find({});
  console.log(job);

    res.status(200).json({
    success: true,
    count: job.length,
    data: job
  });
};

exports.createJob = async(req, res , next) => {
  const job = await Job.create(req.body);
  res.status(200).json({ 
    success : true,
    data : job
  })
}
