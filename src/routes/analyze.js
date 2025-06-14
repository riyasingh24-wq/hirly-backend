console.log("✅ analyze.js loaded!");
import express from 'express';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// ✅ ESM fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.resolve(__dirname, '../../logs');
const logsPath = path.resolve(logsDir, 'ai_logs.json');

// ✅ Zod schema
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
router.post('/', (req, res) => {
  console.log("🔥 Entering /api/analyze route handler!");
  const parsed = analyzeSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.issues[0].message
    });
  }

  const { resume, job } = parsed.data;

  const matchScore = 88; // Simulated score
  const response = {
    matchScore,
    message: `Analyzed ${resume} for ${job}`
  };

  // ✅ Logging block
  console.log("Attempting to log analyze route action...");
  const logEntry = {
    route: '/api/analyze',
    input: { resume, job },
    result: response,
    timestamp: new Date().toISOString()
  };

  try {
    // Ensure the logs directory exists
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    let logs = [];

    if (fs.existsSync(logsPath)) {
      const raw = fs.readFileSync(logsPath, 'utf-8');
      logs = raw ? JSON.parse(raw) : [];
    }

    logs.push(logEntry);
    fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2));

    console.log("📦 Successfully wrote to ai_logs.json from analyze.js:", logEntry);
  } catch (err) {
    console.error("❌ Logging failed in analyze.js:", err.message);
  }

  res.status(200).json(response);
});

export default router; 