import express, { Router } from 'express';
import {
  login,
  logout,
  register,
  getUserInformation,
  getAllTechnicians,
  deleteAccount,
  updateAccount,
} from '../controllers/authController';
import authorize from '../middlewares/auth';

const router: Router = express.Router();

//Login Route
router.post('/auth/login', login);

//Logout Route
router.post('/auth/logout', logout); // add , authorize,

//Register Route
router.post('/auth/register', register);

//Get user information
router.post('/auth/user', getUserInformation);

//Get all technicians
router.get('/auth/getAllTechnicians', getAllTechnicians);

// delete user
router.delete('/auth/deleteAccount', deleteAccount);

// update account
router.put('/auth/update', updateAccount);

export default router;
