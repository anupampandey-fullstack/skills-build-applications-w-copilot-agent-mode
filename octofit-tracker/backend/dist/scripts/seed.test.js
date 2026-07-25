import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import { seedDatabase } from './seed.js';
import { User, Team, Activity, Leaderboard, Workout } from '../models/index.js';
test('seedDatabase populates the octofit_db collections', async () => {
    await mongoose.connect('mongodb://localhost:27017/octofit_db');
    try {
        await mongoose.connection.dropDatabase();
        await seedDatabase(false);
        const userCount = await User.countDocuments();
        const teamCount = await Team.countDocuments();
        const activityCount = await Activity.countDocuments();
        const leaderboardCount = await Leaderboard.countDocuments();
        const workoutCount = await Workout.countDocuments();
        assert.equal(userCount, 3);
        assert.equal(teamCount, 2);
        assert.equal(activityCount, 3);
        assert.equal(leaderboardCount, 3);
        assert.equal(workoutCount, 3);
    }
    finally {
        await mongoose.disconnect();
    }
});
