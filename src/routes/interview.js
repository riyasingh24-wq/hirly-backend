import express from 'express';
import { z } from 'zod';

const router = express.Router();

// Zod schema (this stays outside, ✅)
const interviewSchema = z.object({
  resume: z.string().min(1, "Resume is required"),
  job: z.string().min(1, "Job title is required")
});

router.post('/interview', (req, res) => {
  // ✅ Move the validation here
  const result = interviewSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }

  const { resume, job } = result.data;

  res.status(200).json({
    question: `What is your experience with ${job}?`,
    resume
  });
});

export default router;
