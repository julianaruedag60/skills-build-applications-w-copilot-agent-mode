import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    fitnessLevel: { type: String, required: true },
});
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    goal: { type: String, required: true },
    members: { type: Number, required: true },
    captain: { type: String, required: true },
});
const activitySchema = new Schema({
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    userId: { type: String, required: true },
    date: { type: Date, default: Date.now },
});
const leaderboardSchema = new Schema({
    rank: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
    streak: { type: Number, required: true },
});
const workoutSchema = new Schema({
    title: { type: String, required: true, unique: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, required: true },
});
export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
