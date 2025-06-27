// src/middleware/requireAuth.js
// Middleware to protect routes using Supabase JWT authentication
import supabase from '../utils/supabaseClient.js';

export default async function requireAuth(req, res, next) {
  try {
    // Get the Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    // Extract the token
    const token = authHeader.replace('Bearer ', '').trim();
    // Validate the token with Supabase
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data || !data.user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    // Attach the user to the request object
    req.user = data.user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
} 