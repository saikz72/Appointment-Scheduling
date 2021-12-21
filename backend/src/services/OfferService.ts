import Service from '../models/Service';

class OfferService {
  static async createService(userDTO: any) {
    const { name, duration, cost } = userDTO;

    // service name exist
    const serviceExist = await Service.exists({ name: name });
    if (serviceExist) {
      throw 'Service name already exist.';
    }

    const service = new Service({
      name: name,
      duration: duration,
      cost: cost,
    });

    try {
      return await service.save();
    } catch (error) {
      throw error;
    }
  }

  static async getAllServices() {
    const allServices = await Service.find(); //returns all services
    if (allServices.length === 0) {
      throw 'No services available.';
    }
    return allServices;
  }

  static async deleteService(serviceId: string) {
    try {
      await Service.deleteOne({ serviceId: serviceId });
    } catch (error) {
      throw 'Cannot delete.';
    }
  }

  static async updateService(serviceId: string, serviceDTO: any) {
    const filter = { serviceId: serviceId };
    const service = await Service.findOne(filter);

    const name = serviceDTO?.name === null ? service?.name : serviceDTO?.name;
    const cost = serviceDTO?.cost === null ? service?.cost : serviceDTO?.cost;
    const duration = serviceDTO?.duration === null ? service?.duration : serviceDTO?.duration;

    const update = { name, cost, duration };

    try {
      return await Service.findOneAndUpdate(filter, update, { new: true });
    } catch (error) {
      throw 'Cannot update.';
    }
  }
}

export default OfferService;
