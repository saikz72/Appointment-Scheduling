import { Request, Response, NextFunction } from 'express';
import BusinessService from '../services/BusinessService';

abstract class BusinessController {
  static async createBusiness(req: Request, res: Response, next: NextFunction) {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const email = req.body.email;
    const businessDTO = { name, phoneNumber, address, email };

    try {
      const business = await BusinessService.createBusiness(businessDTO);
      res.status(200).send(business);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async updateBusiness(req: Request, res: Response, next: NextFunction) {
    const businessId = req.params.businessId;
    const businessDTO = req.body;

    try {
      const updatedBusiness = await BusinessService.updateBusiness(businessId, businessDTO);
      res.status(200).send(updatedBusiness);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async getBusiness(req: Request, res: Response, next: NextFunction) {
    try {
      const business = await BusinessService.getBusiness();
      res.status(200).send(business);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default BusinessController;
