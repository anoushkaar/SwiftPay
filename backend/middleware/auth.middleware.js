import { request } from 'express';
import jwt from 'jsonwebtoken';

export const isLoggedIn = async (req, res, next) => {
  console.log('isLoggedIn called');
  console.log(req.cookies);
  
  try {
    const token = req.cookies.token;
    console.log('token', token);
    if (!token) {
      console.log('no token found');
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded', decoded);
    req.user = decoded;
    console.log('req.user', req.user);
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};
