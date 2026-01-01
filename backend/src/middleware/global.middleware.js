// store global errors here

const global_Error_Middleware = (err, req, res, next) => {

  try {
    let error = {...error};
    error.message = err.message;
    console.error(err);
    
    // Mongoose Errors for Database
    if (err.name === 'CastError') {
      const message = 'Resource not found';
      error = new Error(message);
      error.statusCode = '404';
    }
    if (err.code === 1100) {
      const message = 'Duplicated Field Already in Used';
      error = new Error(message);
      error.statusCode = '400';
    }
    // Compiles all error we have
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(value => value.message);
      error = new Error(message.join(', '));
      error.statusCode = '400';
    }


    // Generated Error Response
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Internal Server Error'
    });

  } catch (error) {
    next(error);
  }
  
};

export default global_Error_Middleware;




