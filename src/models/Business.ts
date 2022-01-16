import { model, Schema } from 'mongoose';

export interface Business {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  //Add opening and closing hours
}

const BusinessSchema = new Schema<Business>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default model<Business>('Business', BusinessSchema);
