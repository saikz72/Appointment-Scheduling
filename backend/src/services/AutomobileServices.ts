import Automobile from '../models/Automobile';
import User from '../models/User';

abstract class AutomobileService {
  static async createAutomobile(automobileDTO: any) {
    const { type, imgUrl, userId } = automobileDTO;
    const owner = await User.findById(userId);
    const automobile = new Automobile({
      type,
      imgUrl,
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

  static async deleteAutomobile(automobileId: string) {
    try {
      await Automobile.deleteOne({ automobileId: automobileId });
    } catch (error) {
      throw error;
    }
  }
}

export default AutomobileService;
