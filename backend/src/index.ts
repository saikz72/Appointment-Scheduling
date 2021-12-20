import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth';

dotenv.config();

mongoose
  .connect(`${process.env.DB_CONNECT}`)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log(err));

const app: Application = express();
app.use(express.json());
app.use('/api', authRouter);
app.listen(3000, () => console.log('listening'));
