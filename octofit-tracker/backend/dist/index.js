import express from 'express';
import apiRouter from './routes/api.js';
import { connectToDatabase } from './config/database.js';
const app = express();
const port = Number(process.env.PORT || 8000);
app.use(express.json());
app.use('/api', apiRouter);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
async function startServer() {
    try {
        await connectToDatabase();
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Backend listening on port ${port}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
