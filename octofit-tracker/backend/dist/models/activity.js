import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    points: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});
export const ActivityModel = mongoose.model('Activity', activitySchema);
