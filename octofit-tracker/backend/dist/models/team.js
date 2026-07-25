import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    captain: { type: String, required: true },
    points: { type: Number, required: true },
    memberCount: { type: Number, required: true },
});
export const TeamModel = mongoose.model('Team', teamSchema);
