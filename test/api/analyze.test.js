// import request from 'supertest';
// import app from '../../src/app.js';
// import { jest } from '@jest/globals';

// jest.unstable_mockModule('../../src/utils/similarity.js', () => ({
//   calculateSimilarity: () => 85,
// }));

// describe('POST /api/analyze', () => {
//   it('should return matchScore when valid input is sent', async () => {
//     const res = await request(app)
//       .post('/api/analyze')
//       .send({ resume: "JS, React", job: "React Developer" });

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty("matchscore", 85);
//   });
// });

import express from 'express';
import analyzeRoutes from '../../src/routes/analyze.js';

const app = express();
app.use(express.json());
app.use('/api', analyzeRoutes);

import request from 'supertest';

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
