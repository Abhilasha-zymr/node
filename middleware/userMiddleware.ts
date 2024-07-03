// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const secret = 'your_jwt_secret'; // Should be an environment variable


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  // If the token is not present, return a 401 Unauthorized response
  if (!token) 
    return res.status(401).json({ message: 'No token provided' });

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, secret);
    // Attach the decoded token payload to the request object
    (req as any).user = decoded;
    // Call the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
