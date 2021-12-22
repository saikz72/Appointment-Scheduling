import { model, Schema } from 'mongoose';
import { Bill } from './Bill';
import { Service } from './Service';
import { User } from './User';

interface Appointment {
  startDate: Date;
  endDate: Date;
  services: Service;
  user: User;
  bill: Bill;
}

const AppointmentSchema = new Schema<Appointment>({
  startDate: Date,
  endDate: Date,
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  bill: {
    type: Schema.Types.ObjectId,
    ref: 'Bill',
  },
});

export default model<Appointment>('Appointment', AppointmentSchema);
