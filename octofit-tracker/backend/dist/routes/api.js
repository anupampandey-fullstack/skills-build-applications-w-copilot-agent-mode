import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
export function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
}
async function sendCollection(res, endpoint, data) {
    res.json({
        endpoint,
        baseUrl: getApiBaseUrl(),
        data,
    });
}
export function registerRoutes(app) {
    const router = Router();
    router.get(['/users', '/users/'], async (_req, res) => {
        try {
            const users = await User.find({}).sort({ name: 1 }).lean();
            await sendCollection(res, '/api/users/', users);
        }
        catch (error) {
            res.status(500).json({ message: 'Unable to load users', error });
        }
    });
    router.get(['/teams', '/teams/'], async (_req, res) => {
        try {
            const teams = await Team.find({}).sort({ points: -1 }).lean();
            await sendCollection(res, '/api/teams/', teams);
        }
        catch (error) {
            res.status(500).json({ message: 'Unable to load teams', error });
        }
    });
    router.get(['/activities', '/activities/'], async (_req, res) => {
        try {
            const activities = await Activity.find({}).sort({ date: -1 }).lean();
            await sendCollection(res, '/api/activities/', activities);
        }
        catch (error) {
            res.status(500).json({ message: 'Unable to load activities', error });
        }
    });
    router.get(['/leaderboard', '/leaderboard/'], async (_req, res) => {
        try {
            const leaderboard = await Leaderboard.find({}).sort({ rank: 1 }).lean();
            await sendCollection(res, '/api/leaderboard/', leaderboard);
        }
        catch (error) {
            res.status(500).json({ message: 'Unable to load leaderboard', error });
        }
    });
    router.get(['/workouts', '/workouts/'], async (_req, res) => {
        try {
            const workouts = await Workout.find({}).sort({ difficulty: 1 }).lean();
            await sendCollection(res, '/api/workouts/', workouts);
        }
        catch (error) {
            res.status(500).json({ message: 'Unable to load workouts', error });
        }
    });
    app.use('/api', router);
}
