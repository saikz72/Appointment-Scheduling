import { Request, Response, NextFunction } from 'express';
import { createUser, authenticateUser } from '../services/authService';

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
