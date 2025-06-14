import request from 'supertest';
import { setupTestApp } from '../utils/setupAppForTest.js';

const app = setupTestApp();

describe("POST /api/", () => {
  it("should return matchScore when valid input is sent", async () => {
    const res = await request(app)
      .post('/api/')
      .send({ resume: "JS, React", job: "Frontend Dev" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("matchScore");
  });

  it("should return 400 for missing input", async () => {
    const res = await request(app)
      .post('/api/')
      .send({ resume: "" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

it("should return a valid matchScore as a number", async () => {
  const res = await request(app)
    .post('/api/')
    .send({ resume: "HTML, CSS, JavaScript", job: "Frontend Developer" });

  expect(typeof res.body.matchScore).toBe("number");
  expect(res.body.matchScore).toBeGreaterThanOrEqual(0);
  expect(res.body.matchScore).toBeLessThanOrEqual(100);
});

