import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import Customer from '../models/Customer';
import Technician from '../models/Technician';
import getUserType from '../utility/AuthUtility';

const createAdmin = async (userDTO: any) => {
  const { email, password, name } = userDTO;

  //Email exist
  const emailExist = await Admin.exists({ email });
  if (emailExist) {
    throw 'Email is already taken.';
  }

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const admin = new Admin({
    name: name,
    email: email,
    password: hashPassword,
  });

  try {
    return await admin.save();
  } catch (error) {
    throw error;
  }
};

const createCustomer = async (userDTO: any) => {
  const { email, password, name } = userDTO;

  //Email exist
  const emailExist = await Customer.exists({ email });
  if (emailExist) {
    throw 'Email is already taken.';
  }

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const customer = new Customer({
    name: name,
    email: email,
    password: hashPassword,
  });

  try {
    return await customer.save();
  } catch (error) {
    throw error;
  }
};

const createTechnician = async (userDTO: any) => {
  const { email, password, name } = userDTO;

  //Email exist
  const emailExist = await Technician.exists({ email });
  if (emailExist) {
    throw 'Email is already taken.';
  }

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const technician = new Technician({
    name: name,
    email: email,
    password: hashPassword,
  });

  try {
    return await technician.save();
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userDTO: any) => {
  const { userType } = userDTO;
  if (userType === 'Admin') {
    return createAdmin(userDTO);
  } else if (userType === 'Customer') {
    return createCustomer(userDTO);
  } else if (userType === 'Technician') {
    return createTechnician(userDTO);
  }
};

export const authenticateUser = async (userDTO: any) => {
  const { email, password, userType } = userDTO;
  const User = getUserType(userType);

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
  //const token = jwt.sign({ user: user }, `${process.env.TOKEN_SECRET}`);
  //return token; // token == user
  return user;
};
