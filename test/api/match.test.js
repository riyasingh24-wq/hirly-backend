import request from 'supertest';
import app from '../../src/app.js'; // ✅ Correct path if app.js is in /src


describe("POST /api/match", () => {
  it("should return matched candidates", async () => {
    const res = await request(app)
      .post("/api/match")
      .send({ job: "Full Stack Developer" });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.matches)).toBe(true);
  });

  it("should return 400 if job input is missing", async () => {
    const res = await request(app)
      .post("/api/match")
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
