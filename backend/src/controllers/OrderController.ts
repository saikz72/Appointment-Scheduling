import { Request, Response, NextFunction } from 'express';
import OrderService from '../services/OrderService';

abstract class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderService.createOrder(req.body);
      res.send(order).status(200);
    } catch (err) {
      res.send(err).status(400);
    }
  }

  static async updateOrder(req: Request, res: Response, next: NextFunction) {}

  static async cancelOrder(req: Request, res: Response, next: NextFunction) {
    const orderId = req.params.orderId;
    try {
      await OrderService.cancelOrder(orderId);
      res.send('Order has been cancell').status(200);
    } catch (err) {
      throw err;
    }
  }

  static async getOrdersOfCustomer(req: Request, res: Response, next: NextFunction) {
    const customerId = req.params.customerId;
    try {
      const orders = await OrderService.getOrdersOfCustomer(customerId);
      res.send(orders).status(200);
    } catch (err) {
      res.send(err).status(400);
    }
  }

  // products
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await OrderService.createProduct(req.body);
      res.send(product).status(200);
    } catch (err) {
      res.send(err).status(400);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.productId;
    try {
      const updatedProduct = await OrderService.updateProduct(productId, req.body);
      res.send(updatedProduct).status(200);
    } catch (err) {
      console.log('e', err);
      res.send(err).status(400);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.productId;
    try {
      const product = await OrderService.deleteProduct(productId);
      res.send('Product deleted successfully').status(200);
    } catch (err) {
      res.send(err).status(400);
    }
  }

  static async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await OrderService.getAllProducts();
      res.send(products).status(200);
    } catch (err) {
      res.send(err).status(400);
    }
  }
}

export default OrderController;
