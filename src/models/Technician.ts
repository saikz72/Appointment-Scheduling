import { model, Schema } from 'mongoose';
import { Appointment } from './Appointment';
import { User } from './User';

export interface Technician extends User {
  appointments?: Appointment[];
}

const TechnicianSchema = new Schema<Technician>({
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
  userType: {
    type: String,
    default: 'Technician',
  },
});

export default model<Technician>('Technician', TechnicianSchema);
