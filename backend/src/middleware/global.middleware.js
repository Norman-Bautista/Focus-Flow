const global_Error_Middleware = (err, req, res, next) => {
  console.error('❌ Error:', err.message);
  
  let statusCode = 500;
  let message = 'Internal Server Error';
  
  // Mongoose Errors for Database
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  } else if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicated Field Already in Use';
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  } else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    message = err.message;
  }
  
  // Hide stack trace in production
  const response = {
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };
  
  res.status(statusCode).json(response);
};

export default global_Error_Middleware;


