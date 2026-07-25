import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IActivity extends Document {
  userName: string;
  type: string;
  durationMinutes: number;
  points: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  userName: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  points: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const ActivityModel: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
