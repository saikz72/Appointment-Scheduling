import { model, Schema } from 'mongoose';

interface User {
  name: string;
  email: string;
  password: string;
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
});

export default model<User>('User', UserSchema);
