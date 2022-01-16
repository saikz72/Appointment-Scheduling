import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRouter from './routes/AuthRoute';
import ServiceRouter from './routes/ServiceRoute';
import BusinessRouter from './routes/BusinessRoute';
import AppointmentRouter from './routes/AppointmentRoute';
import AutomobileRouter from './routes/AutomobileRoute';

const PORT = 3000;
dotenv.config();

mongoose
  // .connect(`${process.env.DB_CONNECT}`)
  .connect(`mongodb+srv://saikz72:T2HkFBex1GBHYQZh@cluster0.phmlr.mongodb.net/eagle-eye-db?retryWrites=true&w=majority`)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log(err));

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/api', AuthRouter);
app.use('/api', ServiceRouter);
app.use('/api', BusinessRouter);
app.use('/api', AppointmentRouter);
app.use('/api', AutomobileRouter);
app.listen(PORT, () => console.log(`listening ${PORT}`));
