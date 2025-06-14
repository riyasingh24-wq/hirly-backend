import express from 'express';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 🧠 Convert ESM to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Absolute path to logs file
const logsPath = path.resolve(__dirname, '../../logs/ai_logs.json');

const router = express.Router();

const matchSchema = z.object({
  job: z.string().min(1, "Job is required"),
});

/**
 * @swagger
 * /api/match:
 *   post:
 *     summary: Find matching candidates for a given job title
 *     tags: [Match]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - job
 *             properties:
 *               job:
 *                 type: string
 *                 description: The job title or description to find matches for.
 *                 example: "Frontend Developer"
 *     responses:
 *       200:
 *         description: Successfully found matching candidates.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matches:
 *                   type: array
 *                   description: A list of matching candidates with their scores.
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of the candidate.
 *                         example: "Candidate A"
 *                       score:
 *                         type: number
 *                         description: Match score of the candidate.
 *                         example: 95
 *       400:
 *         description: Invalid input for job title.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 *                   example: "Job is required"
 */
router.post('/match', (req, res) => {
  const parsed = matchSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }

  const { job } = parsed.data;

  const matches = [
    { name: 'Candidate A', score: 95 },
    { name: 'Candidate B', score: 90 }
  ];

  // ✅ Logging logic
  const logEntry = {
    route: '/api/match',
    input: { job },
    result: matches,
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

  res.status(200).json({ matches });
});

export default router;
