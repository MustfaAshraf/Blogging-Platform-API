import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '15m'
    }); 
};

export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
        expiresIn: '7d'
    }); 
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw new Error('Token verification failed');
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};