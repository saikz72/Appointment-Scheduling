import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (userDTO: any) => {
  const { email, password, name } = userDTO;

  //Email exist
  const emailExist = await User.exists({ email });
  if (emailExist) {
    throw 'Email is already taken.';
  }

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    password: hashPassword,
  });

  try {
    return await user.save();
  } catch (error) {
    throw error;
  }
};

export const authenticateUser = async (userDTO: any) => {
  const { email, userType, password } = userDTO;

  // check if email exist
  const user = await User.findOne({ email, userType });
  if (!user) {
    throw 'Email/Role is incorrect.';
  }
  // check if passwod is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw 'Incorrect password.';
  }
  const token = jwt.sign({ user: user }, `${process.env.TOKEN_SECRET}`);
  return token; // token == user
};
