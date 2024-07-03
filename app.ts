import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRoutes from './Routes/productRoutes';
import userRoutes from './Routes/userRoutes'
import { Request, Response, NextFunction } from 'express'
import loggingMiddleware from './middleware/midleware';
import { log } from 'console';
import router from './Routes/productRoutes';
import { authMiddleware } from './middleware/userMiddleware';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(loggingMiddleware)
app.use('/', productRoutes);
app.use('/',userRoutes)


app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route',user:(req as any).user});
});




mongoose.connect('mongodb://localhost:27017/ProductModel').then(() => {
  console.log('Connected to MongoDB');
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(error => {
  console.log('Error connecting to MongoDB', error);
});


export default app;

