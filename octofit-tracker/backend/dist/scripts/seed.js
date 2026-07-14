import { connectToDatabase } from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await connectToDatabase();
        console.log('Connected to octofit_db');
        await User.deleteMany({});
        await Team.deleteMany({});
        await Activity.deleteMany({});
        await LeaderboardEntry.deleteMany({});
        await Workout.deleteMany({});
        const users = await User.insertMany([
            {
                name: 'Ava Carter',
                email: 'ava.carter@octofit.com',
                role: 'runner',
                fitnessLevel: 'advanced',
            },
            {
                name: 'Noah Patel',
                email: 'noah.patel@octofit.com',
                role: 'coach',
                fitnessLevel: 'intermediate',
            },
            {
                name: 'Mina Lopez',
                email: 'mina.lopez@octofit.com',
                role: 'cyclist',
                fitnessLevel: 'beginner',
            },
        ]);
        await Team.insertMany([
            {
                name: 'Velocity',
                goal: 'Weekly mileage challenge',
                members: 8,
                captain: users[0].name,
            },
            {
                name: 'Summit',
                goal: 'Cross-training streak',
                members: 6,
                captain: users[1].name,
            },
        ]);
        await Activity.insertMany([
            {
                type: 'run',
                durationMinutes: 35,
                calories: 320,
                userId: String(users[0]._id),
                date: new Date('2026-07-12T06:30:00.000Z'),
            },
            {
                type: 'strength',
                durationMinutes: 45,
                calories: 280,
                userId: String(users[1]._id),
                date: new Date('2026-07-13T18:00:00.000Z'),
            },
            {
                type: 'bike',
                durationMinutes: 60,
                calories: 410,
                userId: String(users[2]._id),
                date: new Date('2026-07-14T07:00:00.000Z'),
            },
        ]);
        await LeaderboardEntry.insertMany([
            { rank: 1, name: 'Ava Carter', score: 980, streak: 12 },
            { rank: 2, name: 'Noah Patel', score: 912, streak: 8 },
            { rank: 3, name: 'Mina Lopez', score: 876, streak: 6 },
        ]);
        await Workout.insertMany([
            { title: 'Tempo Run', difficulty: 'Intermediate', durationMinutes: 35, focus: 'Cardio' },
            { title: 'Core Flow', difficulty: 'Beginner', durationMinutes: 20, focus: 'Mobility' },
            { title: 'Hill Intervals', difficulty: 'Advanced', durationMinutes: 40, focus: 'Speed' },
        ]);
        console.log('Database seeding complete');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
