import { model, Schema } from 'mongoose';
import { Appointment } from './Appointment';
import { Automobile } from './Automobile';
import { CreditCard } from './CreditCard';
import { Order } from './Order';
import { User } from './User';

export interface Customer extends User {
  creditCard?: CreditCard;
  automobiles?: Automobile[];
  appointments?: Appointment[];
  orders?: Order[];
}

const CustomerSchema = new Schema<Customer>({
  name: {
    type: String,
    required: true,
    min: 6,
  },

  email: {
    type: String,
    required: true,
    min: 6,
  },

  password: {
    type: String,
    required: true,
    min: 6,
  },
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
    },
  ],
  creditCard: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CreditCard',
      required: false,
    },
  ],
  automobiles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Automobile',
      required: false,
    },
  ],
  userType: {
    type: String,
    default: 'Customer',
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: false,
    },
  ],
});

export default model<Customer>('Customer', CustomerSchema);
