import { model, Schema } from 'mongoose';
import { Appointment } from './Appointment';
import { User } from './User';

export interface Bill {
  date: Date;
  totalCost: number;
  appointment: Appointment;
  user: User;
  paid: boolean;
}

const BillSchema = new Schema<Bill>({
  date: {
    type: Date,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
    default: false,
  },
  appointment: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default model<Bill>('Bill', BillSchema);
