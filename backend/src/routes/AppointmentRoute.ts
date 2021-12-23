import express, { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';

const router: Router = express.Router();

router.post('/appointment/create', AppointmentController.createAppointment);

router.put('/appointment/update/:appointmentId', AppointmentController.updateAppointment);

router.delete('/appointment/cancel/:appointmentId', AppointmentController.deleteAppointment);

router.get('/appointment/getAllAppointments', AppointmentController.getAllAppointments);

router.get('/appointment/getAllAppointmentsOfCustomer', AppointmentController.getAllAppointmentsOfCustomer);

router.get('/appointment/getAllAppointmentsOfTechnician', AppointmentController.getAllAppointmentsOfTechnician);

export default router;
