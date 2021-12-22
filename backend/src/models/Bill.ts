import { model, Schema } from 'mongoose';

export interface Bill {
  date: Date;
  totalCost: number;
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
});

export default model<Bill>('Bill', BillSchema);
