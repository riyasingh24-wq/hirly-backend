// ✅ src/routes/interview.js
import express from 'express';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import authenticateToken from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsPath = path.resolve(__dirname, '../../logs/ai_logs.json');

const interviewSchema = z.object({
  resume: z.string().min(1, "Resume is required"),
  job: z.string().min(1, "Job title is required")
});

/**
 * @swagger
 * /api/interview:
 *   post:
 *     summary: Generate an interview question based on resume and job title
 *     tags: [Interview]
 *     security:
 *       - bearerAuth: []
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
 *                 example: "My resume highlights my experience in data science."
 *               job:
 *                 type: string
 *                 description: The job title for which the interview question is needed.
 *                 example: "Data Scientist"
 *     responses:
 *       200:
 *         description: Successfully generated an interview question.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 question:
 *                   type: string
 *                   description: The generated interview question.
 *                   example: "What is your experience with Data Scientist?"
 *                 resume:
 *                   type: string
 *                   description: The resume content provided in the request.
 *                 user:
 *                   type: object
 *                   description: The authenticated user information.
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
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Authentication error message.
 *                   example: "Access token required"
 */
export function createInterviewRouter(authMiddleware = authenticateToken) {
  const router = express.Router();
  router.post('/interview', authMiddleware, (req, res) => {
    console.log('🎯 Interview route accessed by user:', req.user.email);
    const result = interviewSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }
    const { resume, job } = result.data;
    const question = `What is your experience with ${job}?`;
    const logEntry = {
      route: '/api/interview',
      input: { resume, job },
      result: { question },
      user: req.user.email,
      timestamp: new Date().toISOString()
    };
    try {
      let logs = [];
      if (fs.existsSync(logsPath)) {
        const raw = fs.readFileSync(logsPath, 'utf-8');
        logs = raw ? JSON.parse(raw) : [];
      }
      logs.push(logEntry);
      fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2));
      console.log("📦 Writing to ai_logs.json:", logEntry);
    } catch (err) {
      console.error("❌ Logging failed:", err.message);
    }
    res.status(200).json({ 
      question, 
      resume,
      user: req.user.email
    });
  });
  return router;
}

// Default export for app usage
const router = createInterviewRouter();
export default router;
