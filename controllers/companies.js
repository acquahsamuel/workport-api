const Company = require('../models/Company');


// @desc          Create a  company profile
// @route         POST /api/v1/company
// @access        Private
exports.createCompany = async (req, res , next) =>{
    const company = await Company.create(req.body);
    res.status(201).json({
        success : ture ,
        data : company,
        message : "Company created"
    })
}


// @desc          Get all company profile
// @route         GET /api/v1/company
// @access        Private
exports.getCompanies = async(req, res , next ) => {
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

    if(!company){
     return res.status(400).json({ success : false })
    }

    res.status(200).json({
        message : "success",
        success : true,
        data
    })

}





// @desc          Update a single Company
// @route         PUT /api/v1/company/:id 
// @access        Public
exports.updateCompany = async(req, res ,next) =>{
    const company = await Company.findByIdAndUpdate(req.params.id , req.body, {
      new : true,
      runValidators : true
    });

    if(!company){
      return res.status(400).json({ success : false });
    }
  
    res.status(200).json({
      success: true,
      message : "success",
      data: company
    });
  }
  
  
  // @desc          Delete a single Company
  // @route         DELETE /api/v1/company/:id 
  // @access        Private
  exports.deleteCompany = async(req, res ,next) =>{
    const company = await Company.findByIdAndDelete(req.params.id);
 
    if(!company){
      return res.status(400).json({ success : false });
    }
  
    res.status(200).json({
      success: true,
      message : "success",
      data : {}
    });


  }
  