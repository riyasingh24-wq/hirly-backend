// src/routes/protected.js
// Example of a protected route using Supabase authentication middleware
import express from 'express';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// GET /secure - Only accessible with a valid Supabase JWT
router.get('/secure', requireAuth, (req, res) => {
  // req.user is set by the requireAuth middleware
  res.json({
    message: `Hello, ${req.user.email}! You are authenticated.`
  });
});

export default router; 