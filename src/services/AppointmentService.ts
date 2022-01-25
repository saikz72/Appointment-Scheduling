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

  static async updateAppointment(appointmentId: string, appointmentDTO: any) {
    const appointment = await Appointment.findById(appointmentId);
    if (appointment === null) {
      throw new Error('Could not find appointment with given ID.');
    }

    const startDate = appointmentDTO.startDate;
    const automobileId = appointmentDTO.automobileId;
    const serviceId = appointmentDTO.serviceId;

    const service = await Service.findById(serviceId);
    if (service !== null) {
      appointment.service = service;
    }

    // TODO:: need to do date validation
    if (startDate) {
      appointment.startDate = startDate;
    }

    const automobile = await Automobile.findById(automobileId);
    if (automobile !== null) {
      appointment.automobile = automobile;
    }

    return await appointment.save();
  }

  static async getAllAppointments() {
    try {
      const appointments = await Appointment.find();
      return appointments;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAppointment(appointmentId: string) {
    // TODO :: check date range before allowing delete
    try {
      const appointment = await Appointment.findByIdAndDelete(appointmentId);
      return appointment;
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
      return appointments;
    } catch (error) {
      throw error;
    }
  }

  static async getAllAppointmentsOfTechnician(technicianId: string) {
    try {
      const appointments = await Appointment.find({ technician: technicianId })
        .populate('customer', 'name email')
        .populate('service', 'name')
        .populate('automobile', 'licensePlate');
      return appointments;
    } catch (error) {
      throw error;
    }
  }
}

export default AppointmentService;
