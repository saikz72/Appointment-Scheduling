import Customer from '../models/Customer';
import Order from '../models/Order';
import Product from '../models/Product';

abstract class OrderService {
  static async createOrder(options: any) {
    const { customerId, products } = options;
    const customer = await Customer.findById(customerId);

    const order = new Order({
      customer: customer,
      products: [],
    });

    products.forEach(async (productId: string) => {
      const product = await Product.findById(productId);
      if (product !== null) order.products.push(product);
    });

    customer?.orders?.push(order);
    await customer?.save();
    return await order.save();
  }

  static async updateOrder() {}

  static async cancelOrder(orderId: string) {
    const order = await Order.findById(orderId);
    if (order === null) throw new Error('Order does not exist');
    const customerId = order.customer;
    const customer = await Customer.findById(customerId);
    const customerOrders = customer?.orders?.filter((customerOrder) => {
      order._id.toString() === customerOrder.toString();
    });
    return await Order.findByIdAndDelete(orderId);
  }

  static async getOrdersOfCustomer(customerId: string) {
    const customer = await Customer.findById(customerId);
    return customer?.orders;
  }

  // Products
  static async createProduct(options: any) {
    const { name, cost, description } = options;
    const exist = await Product.exists({ name: name });
    if (exist) {
      throw new Error('Product already exist, please update instead.');
    }
    const product = new Product({
      name: name,
      cost: cost,
      description: description,
    });
    return await product.save();
  }

  static async updateProduct(productId: string, options: any) {
    const { name, description, cost } = options;
    const product = await Product.findById(productId);

    if (product === null) {
      throw new Error('Could not find product');
    }
    if (name !== null && name !== undefined) {
      const exists = await Product.findOne({ name: name });
      if (exists) {
        throw new Error('Product name already exists');
      }
      product.name = name;
    }

    if (description !== null && description !== undefined) {
      product.description = description;
    }

    if (cost !== null && cost !== undefined) {
      product.cost = cost;
    }

    return await product.save();
  }

  static async deleteProduct(productId: string) {
    const product = await Product.findByIdAndDelete(productId);
    return product;
  }

  static async getAllProducts() {
    const products = await Product.find();
    return products;
  }
}

export default OrderService;
