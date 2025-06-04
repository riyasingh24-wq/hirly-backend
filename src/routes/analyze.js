// src/routes/analyze.js
import express from 'express';
const router = express.Router();

router.post('/analyze', (req, res) => {
      const { resume, job } = req.body;
      if (!resume || !job) return res.status(400).json({ error: "Missing input" });

  const matchScore = 85; // pretend logic
      res.status(200).json({ matchScore });
});

export default router;
