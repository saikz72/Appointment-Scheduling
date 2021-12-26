import express, { Router } from 'express';
import AutomobileController from '../controllers/AutomobileController';

const router: Router = express.Router();

router.post('/automobile/create', AutomobileController.createAutomobile);

router.put('/automobile/update/:automobileId', AutomobileController.updateAutomobile);

router.get('/automobile', AutomobileController.getAllAutomobiles);

router.delete('/automobile/delete/:automobileId', AutomobileController.deleteAutomobile);

export default router;
