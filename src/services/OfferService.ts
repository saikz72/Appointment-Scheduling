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
      throw error;
    }
  }

  static async updateService(serviceId: string, serviceDTO: any) {
    const name = serviceDTO?.name;
    const cost = serviceDTO?.cost;
    const duration = serviceDTO?.duration;
    const update = { name, cost, duration };

    const serviceExist = await Service.exists({ name: name });
    if (serviceExist) {
      throw 'Service name already exist.';
    }

    try {
      return await Service.findByIdAndUpdate(serviceId, update, { new: true });
    } catch (error) {
      throw error;
    }
  }
}

export default OfferService;
