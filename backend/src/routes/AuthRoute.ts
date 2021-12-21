import express, { Router } from 'express';
import { login, logout, register } from '../controllers/AuthController';
import authorize from '../middlewares/Auth';

const router: Router = express.Router();

//Login Route
router.post('/auth/login', login);

//Logout Route
router.post('/auth/logout', authorize, logout);

//Register Route
router.post('/auth/register', register);

export default router;
