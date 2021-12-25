import { model, Schema } from 'mongoose';
import { Appointment } from './Appointment';

export interface User {
  name: string;
  email: string;
  password: string;
  userType: string;
  appointments: Appointment[];
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
});

export default model<User>('User', UserSchema);
