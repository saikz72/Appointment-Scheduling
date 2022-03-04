import { Request, Response, NextFunction } from "express";
import AppointmentService from "../services/AppointmentService";

abstract class AppointmentController {
  /**
   * Book an appointment
   * @param req
   * @param res
   * @param next
   */
  static async createAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // const serviceId = req.body.serviceId;
    // const customerId = req.body.customerId;
    // const startDate = req.body.startDate;
    // const automobileId = req.body.automobileId;
    // const appointmentDTO = { startDate, customerId, serviceId, automobileId };

    try {
      const appointment = await AppointmentService.createAppointment(req.body);
      res.status(200).send(appointment);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  /**
   * Edit appointment details
   * @param req
   * @param res
   * @param next
   */
  static async updateAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const appointmentId = req.params.appointmentId;
    const appointmentDTO = req.body;

    try {
      const appointment = await AppointmentService.updateAppointment(
        appointmentId,
        appointmentDTO
      );
      res.status(200).send(appointment);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  /**
   * Cancel an appointment
   * @param req
   * @param res
   * @param next
   */
  static async deleteAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const appointmentId = req.params.appointmentId;

    try {
      const appointment = await AppointmentService.deleteAppointment(
        appointmentId
      );
      res.status(200).send("Appointment successfully deleted");
    } catch (error) {
      res.status(400).send(error);
    }
  }

  /**
   * Get all the appointments in the system [for admin]
   * @param req
   * @param res
   * @param next
   */
  static async getAllAppointments(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const appointments = await AppointmentService.getAllAppointments();
      res.status(200).send(appointments);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all the appointments of the customer
   * @param req
   * @param res
   * @param next
   */
  static async getAllAppointmentsOfCustomer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const customerId = req.params.customerId;

    try {
      const appointments =
        await AppointmentService.getAllAppointmentsOfCustomer(customerId);
      res.status(200).send(appointments);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  /**
   * Get all the appointmens of the technician
   * @param req
   * @param res
   * @param next
   */
  static async getAllAppointmentsOfTechnician(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const technicianId = req.params.technicianId;
    console.log(technicianId);
    try {
      const appointments =
        await AppointmentService.getAllAppointmentsOfTechnician(technicianId);
      res.status(200).send(appointments);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default AppointmentController;
