import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  captain: string;
  points: number;
  memberCount: number;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  captain: { type: String, required: true },
  points: { type: Number, required: true },
  memberCount: { type: Number, required: true },
});

export const TeamModel: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
