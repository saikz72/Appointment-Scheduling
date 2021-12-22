import { model, Schema } from 'mongoose';

export interface Timeslot {
  startDate: Date;
  endDate: Date;
}

const TimeslotSchema = new Schema<Timeslot>({
  startDate: Date,
  endDate: Date,
});

export default model<Timeslot>('Timeslot', TimeslotSchema);
