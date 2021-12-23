import express, { Router } from 'express';
import BusinessController from '../controllers/BusinessController';

const router: Router = express.Router();

router.post('/business', BusinessController.createBusiness);

router.put('/business/:businessId', BusinessController.updateBusiness);

router.get('/business', BusinessController.getBusiness);

export default router;
