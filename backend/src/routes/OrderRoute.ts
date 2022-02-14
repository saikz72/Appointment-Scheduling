import express, { Router } from 'express';
import OrderController from '../controllers/OrderController';

const router: Router = express.Router();

//Orders
router.post('/order', OrderController.createOrder);
router.delete('/order/:orderId', OrderController.cancelOrder);
router.put('/order/:orderId', OrderController.updateOrder);
router.get('/order/:customerId', OrderController.getOrdersOfCustomer);

//Products
router.post('/product', OrderController.createProduct);
router.delete('/product/:productId', OrderController.deleteProduct);
router.put('/product/:productId', OrderController.updateProduct);
router.get('/product', OrderController.getAllProducts);

export default router;
