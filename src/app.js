// src/app.js
// Main Express application setup for the Hirly platform.
// Exports the configured Express app instance.
// Handles middleware, API routes, rate limiting, Swagger docs, and error handling.

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './docs/swagger.js'; // Swagger configuration for API docs
import { apiLimiter } from './utils/rateLimiter.js'; // Rate limiting middleware
import verifyToken from './middleware/verifyToken.js'; // JWT verification middleware

import analyzeRoutes from './routes/analyze.js'; // Handles /api/analyze
import matchRoutes from './routes/match.js';     // Handles /api/match
import interviewRoutes from './routes/interview.js'; // Handles /api/interview

const app = express();

// Parse incoming JSON requests and put the parsed data in req.body
app.use(express.json());
console.log("Incoming request: Body parsed successfully (if applicable).");

// Simple request logger for debugging and monitoring
app.use((req, res, next) => {
  console.log(`➡️ Incoming Request: ${req.method} ${req.url}`);
  next();
});

// =====================
// ROUTE SETUP
// =====================
console.log("📝 Applying analyzeRoutes middleware...");

// Apply rate limiting and JWT verification to /api/analyze
app.use('/api/analyze', apiLimiter, verifyToken, analyzeRoutes);  // POST /api/analyze

// Apply JWT verification to /api/match and /api/interview
app.use('/api', verifyToken, matchRoutes);      // POST /api/match
app.use('/api', verifyToken, interviewRoutes);  // POST /api/interview

// =====================
// SWAGGER API DOCS
// =====================
// Generates and serves interactive API documentation at /api-docs
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// =====================
// HEALTH CHECK ROUTE
// =====================
// Simple endpoint to verify server is running
app.get('/hello', (req, res) => {
  res.send('👋 Hello from backend');
});

// =====================
// 404 FALLBACK HANDLER
// =====================
// Catches all unmatched routes and returns a JSON 404 error
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
