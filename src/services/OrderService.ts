import Product from '../models/Product';

abstract class OrderService {
  static async createOrder() {}

  static async updateOrder() {}

  static async cancelOrder() {}

  static async getOrdersOfCustomer() {}

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
