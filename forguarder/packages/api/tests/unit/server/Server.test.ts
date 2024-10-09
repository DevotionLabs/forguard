import http from "http";
import { RoutesMap } from "@server/routes/types";
import request from "supertest";
import { Server } from "@server/Server";

describe("Server class", () => {
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
  const listenPort = 3000;
  const server = new Server(listenPort, routesMap);

  it("should set up the routes and respond to /test/route", async () => {
    const response = await request(server["api"]).get("/test/route");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Test route working");
  });

  it("should start the server on the specified port", () => {
    const api = server["api"];
    const listenSpy = jest
      .spyOn(api, "listen")
      .mockImplementation((_port: number) => new http.Server());

    server.start();

    expect(listenSpy).toHaveBeenCalledWith(listenPort, expect.any(Function));

    listenSpy.mockRestore();
  });
});
