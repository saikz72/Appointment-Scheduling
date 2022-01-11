import { model, Schema } from 'mongoose';
import { Customer } from './Customer';

export interface Automobile {
  type: string;
  imgUrl?: string;
  customer?: Customer;
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
});

export default model<Automobile>('Automobile', AutomobileSchema);
