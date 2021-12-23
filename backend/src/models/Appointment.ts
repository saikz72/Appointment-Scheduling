import { model, Schema } from 'mongoose';
import { Service } from './Service';
import { User } from './User';

export interface Appointment {
  startDate: Date;
  endDate: Date;
  services: Service[];
  users: User[];
  noShow: boolean;
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
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export default model<Appointment>('Appointment', AppointmentSchema);
