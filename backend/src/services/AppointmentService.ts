import Appointment from '../models/Appointment';
import Service from '../models/Service';
import User from '../models/User';
import Bill from '../models/Bill';
import Automobile from '../models/Automobile';
import AppointmentUtility from '../utility/AppointmentUtility';

abstract class AppointmentService {
  static async createAppointment(appointmentDTO: any) {
    const { startDate, services, customerId, automobileId } = appointmentDTO;

    // search for a technician to give the appointment
    // For starter, pick the technician with the least amount of scheduled appointments
    // TODO:: cannot assign same technician to the same timeslot for an appointment
    const technicians = await User.find({ userType: 'Technician' });
    let chosenTechnician: any;
    let minAppointment: number = 10000;
    technicians.forEach((technician: any) => {
      if (minAppointment > technician.appointments.length) {
        minAppointment = technician.appointments.length;
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
    console.log(users);
    //get automobile
    const automobile = await Automobile.findById(automobileId);

    // TODO:: need to do date validation

    const appointment = new Appointment({
      startDate: startDate,
      endDate: startDate, // TODO change endDate
      services: allServices,
      users: users,
      automobile: automobile,
    });

    const bill = new Bill({
      date: startDate,
      totalCost: AppointmentUtility.getTotalCostFromServices(allServices),
      appointment: appointment._id,
    });

    customer.appointments.push(appointment);
    chosenTechnician.appointments.push(appointment);

    await customer.save();
    await chosenTechnician.save();
    await bill.save();

    const savedAppointment = await appointment.save();
    return savedAppointment;
  }

  static async updateAppointment(appointmentId: string, appointmentDTO: any) {}

  static async getAllAppointments() {
    try {
      const appointments = await Appointment.find();
      return appointments;
    } catch (error) {
      throw error;
    }
  }

  static async getAllAppointmentsOfCustomer(customerId: string) {
    try {
      const appointments = await Appointment.find({ users: { $all: [customerId] } });
      console.log(appointments);
      return appointments;
    } catch (error) {
      throw error;
    }
  }

  static async getAllAppointmentsOfTechnician(technicianId: string) {
    try {
      const appointments = await Appointment.find({ users: { $all: [technicianId] } });
      console.log(appointments);
      return appointments;
    } catch (error) {
      throw error;
    }
  }
}

export default AppointmentService;
