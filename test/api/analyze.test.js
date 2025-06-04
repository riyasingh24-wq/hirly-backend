import request from 'supertest';
import { setupTestApp } from '../utils/setupAppForTest.js';

const app = setupTestApp();

describe("POST /api/analyze", () => {
  it("should return matchScore when valid input is sent", async () => {
    const res = await request(app)
      .post('/api/analyze')
      .send({ resume: "JS, React", job: "Frontend Dev" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("matchScore");
  });

  it("should return 400 for missing input", async () => {
    const res = await request(app)
      .post('/api/analyze')
      .send({ resume: "" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
