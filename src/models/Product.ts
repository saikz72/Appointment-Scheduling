import { model, Schema } from 'mongoose';

export interface Product {
  name: string;
  cost: number;
  description: string;
}

const ProductSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default model<Product>('Product', ProductSchema);
