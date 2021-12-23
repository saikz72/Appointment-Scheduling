import express, { Router, Request, Response, NextFunction } from 'express';
import AppointmentService from '../services/AppointmentService';

abstract class AppointmentController {
  /**
   * Book an appointment
   * @param req
   * @param res
   * @param next
   */
  static async createAppointment(req: Request, res: Response, next: NextFunction) {
    const services = req.body.services; //[{name: serviceId}, ...]
    const users = req.body.users; //[{customer: customerId}, {technician: technicianId}]
    const startDate = req.body.startDate;
    const appointmentDTO = { startDate, users, services };

    console.log(appointmentDTO);
    try {
      const appointment = AppointmentService.createAppointment(appointmentDTO);
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
  static async getAllAppointments(req: Request, res: Response, next: NextFunction) {}

  /**
   * Get all the appointments of the customer
   * @param req
   * @param res
   * @param next
   */
  static async getAllAppointmentsOfCustomer(req: Request, res: Response, next: NextFunction) {}

  /**
   * Get all the appointmens of the technician
   * @param req
   * @param res
   * @param next
   */
  static async getAllAppointmentsOfTechnician(req: Request, res: Response, next: NextFunction) {}
}

export default AppointmentController;
