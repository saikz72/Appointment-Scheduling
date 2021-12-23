import { model, Schema } from 'mongoose';

export interface Service {
  name: string;
  cost: number;
  duration: number;
}

const ServiceSchema = new Schema<Service>({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

export default model<Service>('Service', ServiceSchema);
