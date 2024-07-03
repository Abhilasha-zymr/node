// middleware/loggingMiddleware.ts
import { Request, Response, NextFunction } from "express";
//import { strategy as LocalStrategy, passport } from "passport-local";
import Product from "../Models/productModel";



const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`
  );
  next();
};

export default loggingMiddleware ;

