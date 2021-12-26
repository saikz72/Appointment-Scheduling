import { model, Schema } from 'mongoose';

export interface CreditCard {
  name: string;
  cvv: string;
  expiryDate: Date;
  number: string;
}

const CreditCardSchema = new Schema<CreditCard>({
  name: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

export default model<CreditCard>('CreditCard', CreditCardSchema);
