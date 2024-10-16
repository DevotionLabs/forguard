import http from "http";
import request from "supertest";
import { RoutesMap } from "../../../src/server/routes/types";
import { Server } from "../../../src/server/index";
import { ApiConfig } from "../../../src/config/types";

describe("Server class", () => {
	const routesMap: RoutesMap = {
		"/test": [
			{
				method: "get",
				path: "/route",
				handler: (_req, res) => {
					res.status(200).send("Test route working");
				}
			}
		]
	};

	const apiConfig: ApiConfig = {
		apiPort: 3001,
		corsOrigin: "http://localhost:3000"
	};

	const server = new Server(apiConfig, routesMap);

	it("should set up the routes and respond to /test/route", async () => {
		const response = await request(server["api"]).get("/test/route");
		expect(response.status).toBe(200);
		expect(response.text).toBe("Test route working");
	});

	it("should start the server on the specified port", () => {
		const api = server["api"];
		const listenSpy = jest.spyOn(api, "listen").mockImplementation(() => new http.Server());

		server.start();

		expect(listenSpy).toHaveBeenCalledWith(apiConfig.apiPort, expect.any(Function));

		listenSpy.mockRestore();
	});
});
