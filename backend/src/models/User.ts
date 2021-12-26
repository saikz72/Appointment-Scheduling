import { model, Schema } from 'mongoose';
import { Appointment } from './Appointment';
import { Automobile } from './Automobile';
import { CreditCard } from './CreditCard';

export interface User {
  name: string;
  email: string;
  password: string;
  userType: string;
  appointments: Appointment[];
  creditCard?: CreditCard;
  automobile?: Automobile[];
}

const UserSchema = new Schema<User>({
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
  userType: {
    type: String,
    enum: ['Customer', 'Technician', 'Admin'],
    required: true,
    default: 'Customer',
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
  automobile: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Automobile',
      required: false,
    },
  ],
});

export default model<User>('User', UserSchema);
