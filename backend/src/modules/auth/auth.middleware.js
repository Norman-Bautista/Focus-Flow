import jwt from 'jsonwebtoken';
import User from '../../models/users.model.js';
import { ACCESS_TOKEN_SECRET } from '../../config/env.js';

const authorize_Middleware = async (req, res, next) => {
  try {
    let token;

    /** req.headers.authorization is a HTTP request object that display authorization access and information */
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // No token provided
    if (!token) {
      const error = new Error('Unauthorized: No token provided');
      error.statusCode = 401;
      return next(error);
    }

    // Verify JWT using .verify function from jwt package
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);

    // User not found
    if (!user) {
      const error = new Error('Unauthorized: User not found');
      error.statusCode = 401;
      return next(error);
    }

    req.user = user;
    next();

  } catch (error) {
    error.statusCode = 401;
    error.message = 'Unauthorized: Invalid or expired token';
    next(error);
  }
};

export default authorize_Middleware;
