import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRouter from './routes/AuthRoute';
import ServiceRouter from './routes/ServiceRoute';
import BusinessRouter from './routes/BusinessRoute';

const PORT = 3000;
dotenv.config();

mongoose
  .connect(`${process.env.DB_CONNECT}`)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log(err));

const app: Application = express();
app.use(express.json());
app.use('/api', AuthRouter);
app.use('/api', ServiceRouter);
app.use('/api', BusinessRouter);
app.listen(PORT, () => console.log(`listening ${PORT}`));
