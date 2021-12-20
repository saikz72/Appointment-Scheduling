import express, { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';

const router: Router = express.Router();

//Login Route
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  res.send('Successfully logged in');
});

//Logout Route
router.post('/logout', (req: Request, res: Response, next: NextFunction) => {});

//Register Route
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const name: string = req.body.name;

  const user = new User({
    name: name,
    email: email,
    password: password,
  });
  //do validation and sent error code
  // find if user's email already exist
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default router;
