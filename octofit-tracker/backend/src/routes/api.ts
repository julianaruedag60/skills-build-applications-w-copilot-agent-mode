import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

const router = Router();

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

router.get('/users/', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

router.post('/users/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get('/teams/', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(teams);
});

router.post('/teams/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.get('/activities/', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json(activities);
});

router.post('/activities/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

router.get('/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
  res.json(leaderboard);
});

router.get('/workouts/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

router.post('/workouts/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

router.get('/config/', (_req, res) => {
  res.json({ apiBaseUrl: getApiBaseUrl() });
});

export default router;
