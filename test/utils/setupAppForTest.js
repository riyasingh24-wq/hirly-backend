import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' }); // Load this specific file


const openaiKey = process.env.OPENAI_KEY;

// test/utils/setupAppForTest.js
import express from 'express';
import analyzeRoutes from '../../src/routes/analyze.js';

export function setupTestApp() {
  const app = express();
  app.use(express.json());
  app.use('/api', analyzeRoutes);
  return app;
}

