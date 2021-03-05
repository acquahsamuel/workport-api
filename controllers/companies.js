const Company = require('../models/Company');

// @desc          Create a  company profile
// @route         POST /api/v1/company
// @access        Private
exports.createCompany = (req, res , next) =>{
    const company = Company.create(req.body.data);

    res.status(200).json({
        success : ture ,
        message : " Company created "
    })
}


// @desc          Get all company profile
// @route         GET /api/v1/company
// @access        Private
exports.getAllCompany = (req, res , next ) => {
    const company = Company.find();

    res.status(200).json({
        message : "List of all companies ",
        success : true,
        data : company.length
    })
}

// @desc          Get a company profile
// @route         GET /api/v1/company/:id
// @access        Private
exports.getCompany = (req , res , next) =>{
    const commany = Company.findById(req.params.id);

    res.status(200).json({
        message : "",
        success : true,
        data
    })
}
