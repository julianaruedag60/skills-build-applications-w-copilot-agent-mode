import express from 'express';
import apiRouter, { getApiBaseUrl } from './routes/api.js';
import { connectToDatabase } from './config/database.js';

export const app = express();
export const port = Number(process.env.PORT || 8000);
export const apiBaseUrl = getApiBaseUrl(port);

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
