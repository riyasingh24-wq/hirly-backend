// src/middleware/verifyToken.js
// Middleware to verify JWT in Authorization header using Supabase Auth
import supabase from '../utils/supabaseClient.js';

/**
 * Express middleware to verify JWT from Authorization header using Supabase
 * - Returns 401 if header is missing or token is invalid/expired
 * - Attaches user info to req.user if valid
 */
export default async function verifyToken(req, res, next) {
  // Get the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // No token provided
    return res.status(401).json({ error: 'Access token required' });
  }
  // Check Bearer format
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid token format' });
  }
  const token = parts[1];
  // Verify token with Supabase
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    // Token is invalid or expired
    return res.status(401).json({ error: 'Invalid token' });
  }
  // Attach user info to request
  req.user = user;
  next();
} 