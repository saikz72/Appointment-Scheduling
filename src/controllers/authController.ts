import { Request, Response, NextFunction } from 'express';
import {
  createUser,
  authenticateUser,
  getUserInfo,
  getTechnicians,
  deleteUser,
  updateUser,
} from '../services/authService';

export const getUserInformation = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId;
  const userType = req.body.userType;

  try {
    const userInfo = await getUserInfo(userId, userType);
    res.send(userInfo).status(200);
  } catch (err) {
    res.status(400).send(err);
  }
};
/**
 * Login Controller
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.userType;
  const userDTO = { email, password, userType };

  try {
    const token = await authenticateUser(userDTO);
    //res.status(200).header('auth-token', token).send(token);
    res.status(200).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Register Controller
 * TODO: create a different endpoint for creating technicians and admins
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const name: string = req.body.name;
  const userType: string = req.body.userType;
  const userDTO = { email, password, name, userType };

  try {
    const savedUser = await createUser(userDTO);
    res.status(200).send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Logout Controller
 * @param req
 * @param res
 * @param next
 */
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  res.header('auth-token', '').send('Successfully logged out.');
};

export const getAllTechnicians = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const technicians = await getTechnicians();
    res.send(technicians).status(200);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId;
  const userType = req.body.userType;
  try {
    await deleteUser(userId, userType);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await updateUser(req.body);
    res.send(updatedUser).status(200);
  } catch (err) {
    console.log('c', err);
    res.status(400).send(err);
  }
};
