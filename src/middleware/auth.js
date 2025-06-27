// src/middleware/auth.js
// Supabase JWT authentication middleware for Express.js
import supabase from '../utils/supabaseClient.js';

/**
 * Factory to create authentication middleware with a given Supabase client
 */
export function authenticateToken(supabaseClient = supabase) {
  return async (req, res, next) => {
    try {
      console.log('🔐 Starting authentication check...');
      // Get the authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        console.log('❌ Auth failed: No Authorization header');
        return res.status(401).json({ 
          error: 'Access token required',
          message: 'Authorization header missing' 
        });
      }
      // Check if it's a Bearer token
      const parts = authHeader.split(' ');
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        console.log('❌ Auth failed: Invalid token format');
        return res.status(401).json({ 
          error: 'Invalid token format',
          message: 'Token must be in format: Bearer <token>' 
        });
      }
      const token = parts[1];
      console.log('🔍 Verifying token...');
      // Verify the token with Supabase
      const { data: { user }, error } = await supabaseClient.auth.getUser(token);
      if (error || !user) {
        console.log('❌ Auth failed: Invalid or expired token');
        return res.status(401).json({ 
          error: 'Invalid token',
          message: 'Token is invalid or has expired' 
        });
      }
      // Attach user data to request object
      req.user = user;
      console.log('✅ Auth success: User authenticated:', user.email);
      // Continue to the next middleware/route handler
      next();
    } catch (error) {
      console.error('❌ Auth error:', error.message);
      return res.status(500).json({ 
        error: 'Authentication error',
        message: 'Internal server error during authentication' 
      });
    }
  };
}

// Default export uses the real Supabase client
export default authenticateToken(); 