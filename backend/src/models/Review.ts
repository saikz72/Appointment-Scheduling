import { model, Schema } from 'mongoose';

export interface Review {
  name: string;
  cost: number;
  description: string;
}

const ReviewSchema = new Schema<Review>({
  description: {
    type: String,
    required: true,
  },
});

export default model<Review>('Review', ReviewSchema);
