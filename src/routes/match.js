import express from 'express';
import { z } from 'zod';

const router = express.Router();

const matchSchema = z.object({
  job: z.string().min(1, "Job is required")
});

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

  res.status(200).json({ matches });
});

export default router;
