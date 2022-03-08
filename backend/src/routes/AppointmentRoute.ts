import express, { Router } from "express";
import AppointmentController from "../controllers/AppointmentController";

const router: Router = express.Router();

router.post("/appointment/create", AppointmentController.createAppointment);

router.put(
  "/appointment/update/:appointmentId",
  AppointmentController.updateAppointment
);

router.delete(
  "/appointment/cancel/:appointmentId",
  AppointmentController.deleteAppointment
);

router.get(
  "/appointment/getAllAppointments",
  AppointmentController.getAllAppointments
);

router.get(
  "/appointment/getAllAppointmentsOfCustomer/:customerId",
  AppointmentController.getAllAppointmentsOfCustomer
);

router.get(
  "/appointment/getAllPendingAppointmentsOfCustomer/:customerId",
  AppointmentController.getAllPendingAppointmentsOfCustomer
);

router.get(
  "/appointment/getAllConfirmAppointmentsOfCustomer/:customerId",
  AppointmentController.getAllConfirmAppointmentsOfCustomer
);

router.get(
  "/appointment/getAllCancelAppointmentsOfCustomer/:customerId",
  AppointmentController.getAllCancelAppointmentsOfCustomer
);

router.get(
  "/appointment/getAllAppointmentsOfTechnician/:technicianId",
  AppointmentController.getAllAppointmentsOfTechnician
);

export default router;
