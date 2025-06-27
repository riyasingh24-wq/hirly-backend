// test/middleware/auth.test.js
// Tests for the Supabase JWT authentication middleware

import { jest } from '@jest/globals';
import { authenticateToken } from '../../src/middleware/auth.js';

// Create a mock Supabase client
const mockSupabase = {
  auth: {
    getUser: jest.fn()
  }
};

const middleware = authenticateToken(mockSupabase);

describe('Authentication Middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { headers: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
  });

  describe('Missing Authorization Header', () => {
    it('should return 401 when no authorization header is present', async () => {
      await middleware(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Access token required',
        message: 'Authorization header missing'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('Valid Token Format', () => {
    it('should call next() when token is valid', async () => {
      const mockUser = {
        id: 'user123',
        email: 'test@example.com',
        aud: 'authenticated'
      };
      mockReq.headers.authorization = 'Bearer valid-token';
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });
      await middleware(mockReq, mockRes, mockNext);
      expect(mockSupabase.auth.getUser).toHaveBeenCalledWith('valid-token');
      expect(mockReq.user).toEqual(mockUser);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });
  });
}); 