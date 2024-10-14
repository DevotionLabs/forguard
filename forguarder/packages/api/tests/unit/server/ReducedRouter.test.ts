import express from "express";
import request from "supertest";
import { ReducedRouter } from "../../../src/server/ReducedRouter";
import { RoutesMap } from "../../../src/server/routes/types";

describe("ReducedRouter", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
  });

  it("should register routes from the routes map", async () => {
    const routesMap: RoutesMap = {
      "/test": [
        {
          method: "get",
          path: "/route",
          handler: (_req, res) => {
            res.status(200).send("Test route working");
          },
        },
      ],
    };

    const reducedRouter = new ReducedRouter(routesMap);
    app.use(reducedRouter.getRouter());

    const response = await request(app).get("/test/route");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Test route working");
  });

  it("should handle different methods", async () => {
    const routesMap: RoutesMap = {
      "/api": [
        {
          method: "post",
          path: "/create",
          handler: (_req, res) => {
            res.status(201).send("Resource created");
          },
        },
      ],
    };

    const reducedRouter = new ReducedRouter(routesMap);
    app.use(reducedRouter.getRouter());

    const response = await request(app).post("/api/create");
    expect(response.status).toBe(201);
    expect(response.text).toBe("Resource created");
  });
});
