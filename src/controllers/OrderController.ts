import { Request, Response, NextFunction } from 'express';
import OrderService from '../services/OrderService';

abstract class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {}

  static async updateOrder(req: Request, res: Response, next: NextFunction) {}

  static async cancelOrder(req: Request, res: Response, next: NextFunction) {}

  static async getOrdersOfCustomer(req: Request, res: Response, next: NextFunction) {}

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
