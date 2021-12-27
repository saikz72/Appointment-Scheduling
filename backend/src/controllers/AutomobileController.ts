import { Request, Response, NextFunction } from 'express';
import AutomobileService from '../services/AutomobileServices';

abstract class AutomobileController {
  static async createAutomobile(req: Request, res: Response, next: NextFunction) {
    const type = req.body.type;
    const imgUrl = req.body?.imgUrl;
    const customerId = req.body.customerId;
    const automobileDTO = { type, imgUrl, customerId };

    try {
      const automobile = await AutomobileService.createAutomobile(automobileDTO);
      res.status(200).send(automobile);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async updateAutomobile(req: Request, res: Response, next: NextFunction) {
    const automobileId = req.params.automobileId;
    const automobileDTO = req.body;

    try {
      const updatedAutomobile = await AutomobileService.updateAutomobile(automobileId, automobileDTO);
      res.status(200).send(updatedAutomobile);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async getAllAutomobiles(req: Request, res: Response, next: NextFunction) {
    try {
      const automobiles = await AutomobileService.getAllAutomobiles();
      res.status(200).send(automobiles);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async deleteAutomobile(req: Request, res: Response, next: NextFunction) {
    const automobileId = req.params.automobileId;
    try {
      await AutomobileService.deleteAutomobile(automobileId);
      res.status(200).send('Automobile deleted.');
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default AutomobileController;
