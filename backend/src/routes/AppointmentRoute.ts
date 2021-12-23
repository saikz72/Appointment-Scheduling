import express, { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';

const router: Router = express.Router();

router.post('/appointment/create', AppointmentController.createAppointment);

router.put('/appointment/update/:appointmentId', AppointmentController.updateAppointment);

router.delete('/appointment/cancel/:appointmentId', AppointmentController.deleteAppointment);

export default router;
