import { model, Schema } from 'mongoose';

export interface Automobile {
  type: string;
  imgUrl?: string;
}

const AutomobileSchema = new Schema<Automobile>({
  type: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: false,
  },
});

export default model<Automobile>('Automobile', AutomobileSchema);
