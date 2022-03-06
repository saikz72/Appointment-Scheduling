import { model, Schema } from "mongoose";
import { User } from "./User";

export interface Admin extends User {}

const AdminSchema = new Schema<Admin>({
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
    default: "Admin",
  },
});

export default model<Admin>("Admin", AdminSchema);
