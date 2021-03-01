const User = require("../models/User");

// @desc          Create new User
// @route         POST /api/v1/user
// @access        Private
exports.createUser = async (req, res, next) => {
  //   const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    message: "User Created"
    // data: user
  });
};

// @desc          Get all  Users
// @route         GET /api/v1/user/:id
// @access        Public
exports.getUsers = async (req, res, next) => {
//   const user = User.find();

  res.status(200).json({
    success: true,
    message: "Single User"
  });
};

// @desc          Get a User
// @route         GET /api/v1/user/:id
// @access        Public
exports.getUser = async (req, res, next) => {
//   const user = await User.findByIdAndUpdate(req.params.id);

  res.status(200).json({
    success: true,
    message: "Single User"
  });
};



// @desc          Update a user
// @route         PUT /api/v1/user/:id 
// @access        Public
exports.updateUser = async(req, res ,next) =>{
    // const user = await User.findByIdAndUpdate(req.params.id);
  
    res.status(200).json({
      success : true,
      message : 'update user'
    })
  }
  
  
  // @desc          Delete a user
  // @route         DELETE /api/v1/user/:id 
  // @access        Private
  exports.deleteUser = async(req, res ,next) =>{
    // const user = await User.findByIdAndDelete(req.params.id);
  
    res.status(200).json({
      success : true,
      message : 'delete user'
    })
  }