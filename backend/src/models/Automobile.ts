import { model, Schema } from 'mongoose';
import { Customer } from './Customer';

export interface Automobile {
  type: string;
  imgUrl?: string;
  customer?: Customer;
  licensePlate?: string;
  year?: string;
  model?: string;
}

const AutomobileSchema = new Schema<Automobile>({
  type: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: false,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  licensePlate: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
  model: {
    type: String,
    required: false,
  },
});

export default model<Automobile>('Automobile', AutomobileSchema);
