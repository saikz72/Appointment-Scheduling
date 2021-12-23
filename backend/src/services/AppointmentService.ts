import Appointment from '../models/Appointment';
import Service from '../models/Service';
import User from '../models/User';
import Bill from '../models/Bill';

abstract class AppointmentService {
  static async createAppointment(appointmentDTO: any) {
    const { startDate, services, customerId } = appointmentDTO;

    // search for a technician to give the appointment
    // For starter, pick the technician with the least amount of scheduled appointments
    // TODO:: cannot assign same technician to the same timeslot for an appointment
    const technicians = await User.find({ userType: 'Technician' });
    let chosenTechnician;
    let minAppointments = 1000;
    technicians.forEach((technician) => {
      const appointments = technician.appointments;
      if (minAppointments > appointments.length) {
        minAppointments = appointments.length;
        chosenTechnician = technician;
      }
    });

    // get services
    const allServices: any = [];
    for (const serviceName in services) {
      let service: any;
      try {
        service = await Service.findById(services[serviceName]);
      } catch (error) {
        throw error;
      }
      allServices.push(service);
    }

    // get users
    let customer: any;
    try {
      customer = await User.findById(customerId);
    } catch (error) {
      throw error;
    }
    const users = [customer, chosenTechnician];

    // TODO:: need to do date validation

    const appointment = new Appointment({
      startDate: startDate,
      endDate: startDate, // TODO change endDate
      services: allServices,
      users: users,
    });

    const bill = new Bill({
      date: startDate,
      totalCost: 100,
      appointment: appointment._id,
      customer: customer?._id,
    });

    await bill.save();

    const savedAppointment = await appointment.save();
    return savedAppointment;
  }

  static async updateAppointment(appointmentId: string, appointmentDTO: any) {}

  static async getAllAppointments() {}

  static async getAllAppointmentsOfCustomer(customerId: string) {}

  static async getAllAppointmentsOfTechnician(technicianId: string) {}
}

export default AppointmentService;
