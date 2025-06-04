// src/app.js
import express from 'express';
import analyzeRoutes from './routes/analyze.js';

const app = express();
app.use(express.json());
app.use('/api', analyzeRoutes);

export default app;
