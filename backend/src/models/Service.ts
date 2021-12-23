import { model, Schema } from 'mongoose';
import { Appointment } from './Appointment';

export interface Service {
  name: string;
  cost: number;
  duration: number;
  appointments: Appointment[];
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
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
    },
  ],
});

export default model<Service>('Service', ServiceSchema);
