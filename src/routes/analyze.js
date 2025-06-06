import express from 'express';
import { z } from 'zod';

const router = express.Router();

// Zod Schema
const analyzeSchema = z.object({
  resume: z.string().min(1, "Resume is required"),
  job: z.string().min(1, "Job title is required")
});

router.post('/analyze', (req, res) => {
  const parseResult = analyzeSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      error: parseResult.error.issues[0].message
    });
  }

  const { resume, job } = parseResult.data;

  // Simulate response
  return res.status(200).json({
    matchScore: 88,
    message: `Analyzed ${resume} for ${job}`
  });
});

export default router;
