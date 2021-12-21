import { Request, Response, NextFunction } from 'express';
import OfferService from '../services/OfferService';

/**
 * Create Service Controller
 * @param req
 * @param res
 * @param next
 */
export const createService = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name;
  const duration = req.body.duration;
  const cost = req.body.cost;
  const serviceDTO = { name, duration, cost };

  try {
    const savedService = await OfferService.createService(serviceDTO);
    res.status(200).send(savedService);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteService = async (req: Request, res: Response, next: NextFunction) => {
  const serviceId = req.params.serviceId;
  try {
    await OfferService.deleteService(serviceId);
    res.status(200).send('Service deleted.');
  } catch (error) {
    res.status(400).send('Cannot delete service.');
  }
};

export const updateService = async (req: Request, res: Response, next: NextFunction) => {
  const serviceId = req.params.serviceId;
  const serviceDTO = req.body;
  try {
    const updateService = await OfferService.updateService(serviceId, serviceDTO);
    res.status(200).send(updateService);
  } catch (error) {
    res.status(400).send('Cannot update service.');
  }
};

export const getAllServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allServices = await OfferService.getAllServices();
    res.status(200).send(allServices);
  } catch (error) {
    res.status(400).send(error);
  }
};
