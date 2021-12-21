import express, { Router } from 'express';
import { createService, deleteService, updateService, getAllServices } from '../controllers/ServiceController';

const router: Router = express.Router();

// Create Service Route
router.post('/service/create', createService);

// Delete Service Route
router.delete('/service/delete/:serviceId', deleteService);

// Update Service Route
router.put('/service/update/:serviceId', updateService);

// Get all services Route
router.get('/service', getAllServices);

export default router;
