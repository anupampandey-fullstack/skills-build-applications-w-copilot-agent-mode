import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface ILeaderboard extends Document {
  name: string;
  points: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
});

export const LeaderboardModel: Model<ILeaderboard> = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
