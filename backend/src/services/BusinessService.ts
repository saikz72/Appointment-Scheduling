import Business from '../models/Business';

abstract class BusinessService {
  static async createBusiness(businessDTO: any) {
    const { name, phoneNumber, address, email } = businessDTO;
    const business = new Business({
      name,
      phoneNumber,
      email,
      address,
    });

    try {
      const savedBusiness = await business.save();
      return savedBusiness;
    } catch (error) {
      throw error;
    }
  }

  static async updateBusiness(businessId: string, businessDTO: any) {
    const update = businessDTO;
    try {
      return Business.findByIdAndUpdate(businessId, update, { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async getBusiness() {
    try {
      const business = await Business.find();
      return business[0]; // Only 1 business should exist
    } catch (error) {
      throw error;
    }
  }
}

export default BusinessService;
