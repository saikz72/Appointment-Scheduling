import express, { Router, Request, Response, NextFunction } from 'express';

abstract class AppointmentController {
  static async createAppointment(req: Request, res: Response, next: NextFunction) {}

  static async updateAppointment(req: Request, res: Response, next: NextFunction) {}

  static async deleteAppointment(req: Request, res: Response, next: NextFunction) {}
}

export default AppointmentController;
