import express from 'express';
import mongoose from 'mongoose';
import { activities, leaderboard, profile, teams, workouts } from './data.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/profile', (_req, res) => {
  res.json(profile);
});

app.get('/api/activities', (_req, res) => {
  res.json(activities);
});

app.get('/api/teams', (_req, res) => {
  res.json(teams);
});

app.get('/api/leaderboard', (_req, res) => {
  res.json(leaderboard);
});

app.get('/api/workouts', (_req, res) => {
  res.json(workouts);
});

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }

  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
};

startServer();
