// src/routes/auth.ts
import express from 'express';
import { register, login,getLogin } from '../Controllers/userController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getLogin', getLogin)

export default router;
