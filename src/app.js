// // src/app.js
// import express from 'express';
// import analyzeRoutes from './routes/analyze.js';

// const app = express();
// app.use(express.json());
// app.use('/api', analyzeRoutes);

// export default app;

// 404 handler - for debugging missing routes
//       app.use((req, res) => {
//       res.status(404).json({ error: 'Route not found' });
//       });
    
import express from 'express';
import { apiLimiter } from './utils/rateLimiter.js';
import matchRoutes from './routes/match.js';
import interviewRoutes from './routes/interview.js';
import analyzeRoutes from './routes/analyze.js';

const app = express();

app.use(express.json());

app.use('/api/analyze', apiLimiter); // ✅ Rate limit this only

app.use('/api', matchRoutes);
app.use('/api', interviewRoutes);
app.use('/api', analyzeRoutes);

export default app;
