import mongoose, { Schema, model, Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
  fitnessLevel: string;
}

export interface ITeam {
  name: string;
  goal: string;
  members: number;
  captain: string;
}

export interface IActivity {
  type: string;
  durationMinutes: number;
  calories: number;
  userId: string;
  date: Date;
}

export interface ILeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  streak: number;
}

export interface IWorkout {
  title: string;
  difficulty: string;
  durationMinutes: number;
  focus: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  fitnessLevel: { type: String, required: true },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  goal: { type: String, required: true },
  members: { type: Number, required: true },
  captain: { type: String, required: true },
});

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  rank: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  streak: { type: Number, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true, unique: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, required: true },
});

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export const Team: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
