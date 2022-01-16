import Automobile from '../models/Automobile';
import Customer from '../models/Customer';

abstract class AutomobileService {
  static async createAutomobile(automobileDTO: any) {
    const { type, imgUrl, licensePlate, year, model, customerId } = automobileDTO;
    const owner = await Customer.findById(customerId);
    const automobile = new Automobile({
      type,
      imgUrl,
      customer: owner,
      licensePlate,
      year,
      model,
    });

    owner?.automobiles?.push(automobile);

    try {
      const saveAutomobile = await automobile.save();
      owner?.save();
      return saveAutomobile;
    } catch (error) {
      throw error;
    }
  }

  static async updateAutomobile(automobileId: string, automobileDTO: any) {
    const update = automobileDTO;
    try {
      return await Automobile.findByIdAndUpdate(automobileId, update, { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async getAllAutomobiles() {
    try {
      return await Automobile.find();
    } catch (error) {
      throw error;
    }
  }

  static async getCustomerAutomobiles(customerId: string) {
    try {
      const customer = await Customer.findById(customerId).populate('automobiles');
      return customer.automobiles;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAutomobile(automobileId: string) {
    try {
      await Automobile.deleteOne({ automobileId: automobileId });
    } catch (error) {
      throw error;
    }
  }
}

export default AutomobileService;
