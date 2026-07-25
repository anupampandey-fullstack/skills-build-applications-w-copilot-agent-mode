import mongoose from 'mongoose';
import { User, Team, Activity, Leaderboard, Workout } from '../models/index.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
export async function seedDatabase(disconnectAfterRun = true) {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await mongoose.connection.dropDatabase();
        await User.create([
            {
                name: 'Ava Patel',
                email: 'ava.patel@example.com',
                age: 16,
                fitnessLevel: 'Intermediate',
                team: 'River Runners',
            },
            {
                name: 'Noah Chen',
                email: 'noah.chen@example.com',
                age: 15,
                fitnessLevel: 'Beginner',
                team: 'Peak Performers',
            },
            {
                name: 'Mia Gomez',
                email: 'mia.gomez@example.com',
                age: 17,
                fitnessLevel: 'Advanced',
                team: 'River Runners',
            },
        ]);
        await Team.create([
            {
                name: 'River Runners',
                captain: 'Ava Patel',
                points: 142,
                memberCount: 4,
            },
            {
                name: 'Peak Performers',
                captain: 'Noah Chen',
                points: 119,
                memberCount: 3,
            },
        ]);
        await Activity.create([
            {
                userName: 'Ava Patel',
                type: 'Running',
                durationMinutes: 35,
                points: 35,
                date: new Date('2026-07-20T07:30:00.000Z'),
            },
            {
                userName: 'Noah Chen',
                type: 'Cycling',
                durationMinutes: 28,
                points: 28,
                date: new Date('2026-07-21T06:15:00.000Z'),
            },
            {
                userName: 'Mia Gomez',
                type: 'Strength',
                durationMinutes: 45,
                points: 45,
                date: new Date('2026-07-22T17:10:00.000Z'),
            },
        ]);
        await Leaderboard.create([
            { name: 'Ava Patel', points: 142, rank: 1 },
            { name: 'Mia Gomez', points: 129, rank: 2 },
            { name: 'Noah Chen', points: 119, rank: 3 },
        ]);
        await Workout.create([
            {
                title: 'Morning Sprint Interval',
                description: 'A fast-paced cardio session for endurance.',
                difficulty: 'Intermediate',
                durationMinutes: 25,
            },
            {
                title: 'Core Strength Circuit',
                description: 'Build core strength with bodyweight exercises.',
                difficulty: 'Beginner',
                durationMinutes: 20,
            },
            {
                title: 'Power Mobility Flow',
                description: 'Improve flexibility and mobility after training.',
                difficulty: 'Advanced',
                durationMinutes: 30,
            },
        ]);
        console.log('Database seeding complete');
        if (disconnectAfterRun) {
            await mongoose.disconnect();
        }
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
if (process.argv[1]?.includes('seed.ts')) {
    seedDatabase();
}
