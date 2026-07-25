import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    name: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
});
export const LeaderboardModel = mongoose.model('Leaderboard', leaderboardSchema);
