import express from 'express';
import './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Octofit backend is running' });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
