import express from "express";
import healthcheckRoutes from "@server/routes/healthcheck/index";
import request from "supertest";
import { addRoutesToApi } from "../addRoutesToApi";

describe("Healthcheck Routes", () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();

    addRoutesToApi(healthcheckRoutes, app);
  });

  it("should respond with healthy status on GET /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "healthy" });
  });
});
