import { jest } from '@jest/globals';

jest.mock('url', () => ({
  fileURLToPath: () => '/mocked/path',
}));

import request from 'supertest';
import app from '../../src/app.js'; // ✅ Correct path if app.js is in /src



describe("POST /api/interview", () => {
  it("should return 400 if resume is missing", async () => {
    const res = await request(app)
      .post("/api/interview")
      .send({ job: "Frontend Dev" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
