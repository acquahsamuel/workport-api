const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  // console.log(err.stack.red);

  // @Error          CastError
  if (err.name === 'CastError') {
    const message = `Resources not found with id  ${err.value}`;
    error = new ErrorResponse(message, 404);
    console.log(error);
  }

  // @Error           Duplicate field
  if (err.name === 'MongoError' && err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
    console.log(error);
  }

  // @Error           Empty fields
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
    console.log(error);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
