import Appointment from '../models/Appointment';
import Service from '../models/Service';
import Bill from '../models/Bill';
import Automobile from '../models/Automobile';
import Technician from '../models/Technician';
import Customer from '../models/Customer';

abstract class AppointmentService {
  static async createAppointment(appointmentDTO: any) {
    const { startDate, serviceId, customerId, automobileId } = appointmentDTO;
    // search for a technician to give the appointment
    // For starter, pick the technician with the least amount of scheduled appointments
    // TODO:: cannot assign same technician to the same timeslot for an appointment
    const technicians = await Technician.find();
    let technician: any;
    let minAppointment: number = 10000;
    technicians.forEach((techGuy: any) => {
      if (minAppointment > techGuy.appointments.length) {
        minAppointment = techGuy.appointments.length;
        technician = techGuy;
      }
    });

    // get service
    const service = await Service.findById(serviceId);

    // get customer
    const customer = await Customer.findById(customerId);

    //get automobile
    const automobile = await Automobile.findById(automobileId);

    // TODO:: need to do date validation

    const appointment = new Appointment({
      startDate: startDate,
      endDate: startDate, // TODO change endDate
      service: service,
      customer: customer,
      technician: technician,
      automobile: automobile,
    });

    const bill = new Bill({
      date: startDate,
      totalCost: service?.cost,
      appointment: appointment._id,
    });

    customer?.appointments?.push(appointment);
    technician.appointments.push(appointment);
    appointment.bill = bill;

    await customer?.save();
    await technician.save();
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
      const appointments = await Appointment.find({ customer: customerId })
        .populate('technician', 'name')
        .populate('service', 'name cost')
        .populate('automobile', 'licensePlate');
      console.log(appointments);
      return appointments;
    } catch (error) {
      throw error;
    }
  }

  static async getAllAppointmentsOfTechnician(technicianId: string) {
    try {
      const technician = await Technician.findById(technicianId);
      const appointments = await technician?.appointments;
      return appointments;
    } catch (error) {
      throw error;
    }
  }
}

export default AppointmentService;
