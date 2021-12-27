import { Request, Response, NextFunction } from 'express';
import AppointmentService from '../services/AppointmentService';

abstract class AppointmentController {
  /**
   * Book an appointment
   * @param req
   * @param res
   * @param next
   */
  static async createAppointment(req: Request, res: Response, next: NextFunction) {
    const serviceId = req.body.serviceId;
    const customerId = req.body.customerId;
    const startDate = req.body.startDate;
    const automobileId = req.body.automobileId;
    const appointmentDTO = { startDate, customerId, serviceId, automobileId };

    try {
      const appointment = await AppointmentService.createAppointment(appointmentDTO);
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
  static async updateAppointment(req: Request, res: Response, next: NextFunction) {}

  /**
   * Cancel an appointment
   * @param req
   * @param res
   * @param next
   */
  static async deleteAppointment(req: Request, res: Response, next: NextFunction) {}

  /**
   * Get all the appointments in the system [for admin]
   * @param req
   * @param res
   * @param next
   */
  static async getAllAppointments(req: Request, res: Response, next: NextFunction) {
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
  static async getAllAppointmentsOfCustomer(req: Request, res: Response, next: NextFunction) {
    const customerId = req.params.customerId;

    try {
      const appointments = await AppointmentService.getAllAppointmentsOfCustomer(customerId);
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
  static async getAllAppointmentsOfTechnician(req: Request, res: Response, next: NextFunction) {
    const technicianId = req.params.technicianId;
    console.log(technicianId);
    try {
      const appointments = await AppointmentService.getAllAppointmentsOfTechnician(technicianId);
      res.status(200).send(appointments);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default AppointmentController;
