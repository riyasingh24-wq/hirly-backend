import { jest } from '@jest/globals';
import express from 'express';
import request from 'supertest';
import { createInterviewRouter } from '../../src/routes/interview.js';

// Mock authentication middleware that always authenticates
const mockAuth = (req, res, next) => {
  req.user = { email: 'test@example.com', id: 'test-user-id' };
  next();
};

// Set up an Express app using the interview router with the mock auth
const app = express();
app.use(express.json());
app.use('/api', createInterviewRouter(mockAuth));

describe("POST /api/interview", () => {
  it("should return 400 if resume is missing", async () => {
    const res = await request(app)
      .post("/api/interview")
      .set('Authorization', 'Bearer mock-token') // Add auth header
      .send({ job: "Frontend Dev" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should return 400 if job is missing", async () => {
    const res = await request(app)
      .post("/api/interview")
      .set('Authorization', 'Bearer mock-token') // Add auth header
      .send({ resume: "My resume content" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should return 200 with interview question when valid data is provided", async () => {
    const res = await request(app)
      .post("/api/interview")
      .set('Authorization', 'Bearer mock-token') // Add auth header
      .send({ 
        resume: "My resume content", 
        job: "Frontend Developer" 
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("question");
    expect(res.body).toHaveProperty("resume");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toBe("test@example.com");
    expect(res.body.question).toContain("Frontend Developer");
  });
});
