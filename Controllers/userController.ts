// src/controllers/authController.ts
import { Request, Response } from 'express';
import { User} from '../Models/userModel';

import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret'; // Should be an environment variable

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};
export const getLogin =async(req:Request,res:Response)=>{

        try {
            const users = await User.find();
            res.status(200).json(users);
          } catch (error: any) {
            res.status(500).json({ message: error.message });
          }
    
}
