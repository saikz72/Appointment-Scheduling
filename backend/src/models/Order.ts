import { model, Schema } from 'mongoose';
import { Customer } from './Customer';
import { Product } from './Product';

export interface Order {
  products: Product[];
  customer: Customer;
}

const OrderSchema = new Schema<Order>({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
});

export default model<Order>('Order', OrderSchema);
