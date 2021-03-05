const Company = require('../models/Company');


// @desc          Create a  company profile
// @route         POST /api/v1/company
// @access        Private
exports.createCompany = async (req, res , next) =>{
    const company = await Company.create(req.body.data);

    res.status(200).json({
        success : ture ,
        message : "Company created"
    })
}


// @desc          Get all company profile
// @route         GET /api/v1/company
// @access        Private
exports.getAllCompanies = async(req, res , next ) => {
    const company = await Company.find();

    res.status(200).json({
        message : "List of all companies ",
        success : true,
        data : company.length
    })
}

// @desc          Get a company profile
// @route         GET /api/v1/company/:id
// @access        Private
exports.getCompany = async(req , res , next) =>{
    const company = await Company.findById(req.params.id);

    res.status(200).json({
        message : "success",
        success : true,
        data
    })
}



// @desc          Update a single Job
// @route         PUT /api/v1/job/:id 
// @access        Public
exports.updateCompany = async(req, res ,next) =>{
    const company = await Company.findByIdAndUpdate(req.params.id);
  
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
  exports.deleteCompany = async(req, res ,next) =>{
    const company = await Company.findByIdAndDelete(req.params.id);
  
    res.status(200).json({
      success: true,
      count: job.length,
      message : "success",
    });
  }
  