import express from 'express';
import apiRouter from './routes/api.js';
import { connectToDatabase } from './config/database.js';

export const app = express();
export const port = Number(process.env.PORT || 8000);

const CODESPACE_NAME = process.env.CODESPACE_NAME;

export const apiBaseUrl = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export async function startServer() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();