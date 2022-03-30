import { model, Schema } from 'mongoose';
import { Automobile } from './Automobile';
import { Bill } from './Bill';
import { Customer } from './Customer';
import { Product } from './Product';
import { Service } from './Service';
import { Technician } from './Technician';

export interface Appointment {
  startDate: Date;
  endDate: Date;
  service: Service;
  customer: Customer;
  technician: Technician;
  noShow: boolean;
  bill: Bill;
  automobile: Automobile;
  status: string;
  products?: Product[];
  description?: string;
}

const AppointmentSchema = new Schema<Appointment>({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  noShow: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirm', 'Cancelled'],
    required: true,
    default: 'Pending',
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
  },

  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  technician: {
    type: Schema.Types.ObjectId,
    ref: 'Technician',
  },
  bill: {
    type: Schema.Types.ObjectId,
    ref: 'Bill',
  },
  automobile: {
    type: Schema.Types.ObjectId,
    ref: 'Automobile',
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  description: {
    type: String,
    required: false,
  },
});

export default model<Appointment>('Appointment', AppointmentSchema);
