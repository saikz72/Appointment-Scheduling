import Appointment from '../models/Appointment';

abstract class AppointmentService {
  static async createAppointment(appointmentDTO: any) {
    const { startDate, services, users } = appointmentDTO;
    return '';
  }

  static async updateAppointment(appointmentId: string, appointmentDTO: any) {}

  static async getAllAppointments() {}

  static async getAllAppointmentsOfCustomer(customerId: string) {}

  static async getAllAppointmentsOfTechnician(technicianId: string) {}
}

export default AppointmentService;
