// src/routes/analyze.js
// Express router for the /api/analyze endpoint.
// Handles resume/job analysis requests, input validation, and audit logging.

console.log("✅ analyze.js loaded!");
import express from 'express';
import { z } from 'zod'; // Zod is used for input validation
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router(); // Create a new Express router instance

// ESM-compatible way to get __dirname (for file paths)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.resolve(__dirname, '../../logs'); // Directory for logs
const logsPath = path.resolve(logsDir, 'ai_logs.json'); // Path to audit log file

// =====================
// ZOD SCHEMA VALIDATION
// =====================
// Defines the expected structure for incoming requests to /api/analyze
// - resume: required, non-empty string
// - job: required, non-empty string
const analyzeSchema = z.object({
  resume: z.string().min(1, "Resume is required"),
  job: z.string().min(1, "Job title is required")
});

/**
 * @swagger
 * /api/analyze/:
 *   post:
 *     summary: Analyze resume and job title for a match score
 *     tags: [Analyze]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resume
 *               - job
 *             properties:
 *               resume:
 *                 type: string
 *                 description: The full content of the applicant's resume.
 *                 example: "Experienced software engineer with 10 years of experience..."
 *               job:
 *                 type: string
 *                 description: The title or description of the job opening.
 *                 example: "Backend Developer"
 *     responses:
 *       200:
 *         description: Successfully analyzed the resume and job title.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matchScore:
 *                   type: number
 *                   description: A calculated match score between the resume and the job.
 *                   example: 88
 *                 message:
 *                   type: string
 *                   description: A message indicating the analysis result.
 *                   example: "Analyzed your resume for Backend Developer"
 *       400:
 *         description: Invalid input for resume or job title.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 *                   example: "Resume is required"
 */

// =====================
// MAIN ROUTE HANDLER
// =====================
// Handles POST requests to /api/analyze
// - Validates input using Zod
// - Simulates a match score
// - Logs the request and response to ai_logs.json
// - Returns the result or validation error
router.post('/', (req, res) => {
  console.log("🔥 Entering /api/analyze route handler!");
  const parsed = analyzeSchema.safeParse(req.body); // Validate request body

  // If validation fails, return 400 with error message
  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.issues[0].message
    });
  }

  // Extract validated data
  const { resume, job } = parsed.data;

  // Simulate AI match score (replace with real logic in production)
  const matchScore = 88; // Simulated score
  const response = {
    matchScore,
    message: `Analyzed ${resume} for ${job}`
  };

  // =====================
  // AUDIT LOGGING BLOCK
  // =====================
  // Log each analysis request and result for auditing and debugging
  console.log("Attempting to log analyze route action...");
  const logEntry = {
    route: '/api/analyze',
    input: { resume, job },
    result: response,
    timestamp: new Date().toISOString()
  };

  try {
    // Ensure the logs directory exists (create if missing)
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    let logs = [];

    // Read existing logs if present
    if (fs.existsSync(logsPath)) {
      const raw = fs.readFileSync(logsPath, 'utf-8');
      logs = raw ? JSON.parse(raw) : [];
    }

    // Append new log entry and write back to file
    logs.push(logEntry);
    fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2));

    console.log("📦 Successfully wrote to ai_logs.json from analyze.js:", logEntry);
  } catch (err) {
    // Log any file system errors (should not crash the app)
    console.error("❌ Logging failed in analyze.js:", err.message);
  }

  // Return the analysis result
  res.status(200).json(response);
});

export default router; 