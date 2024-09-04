import { Schema, model, models, Document } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

export const User = models?.User || model<IUser>("User", userSchema);
