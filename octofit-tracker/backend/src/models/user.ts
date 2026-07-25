import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  fitnessLevel: string;
  team: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  fitnessLevel: { type: String, required: true },
  team: { type: String, required: true },
});

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);
