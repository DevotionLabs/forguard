import http from "http";
import request from "supertest";
import { Server } from "../../../src/server/index";
import { ApiConfig } from "../../../src/config/types";
import { testResponse, testRouter } from "./testRouter";
import { Logger } from "../../../src/logger/index.js";

describe("Server class", () => {
	const apiConfig: ApiConfig = {
		apiPort: 3001,
		corsOrigin: "http://localhost:3000"
	};

	const server = new Server(apiConfig, testRouter);

	it("should respond to a request to one of the routes", async () => {
		const route = Object.keys(testRouter)[0];

		const response = await request(server["api"]).get(`/${route}`);
		expect(response.status).toBe(200);
		expect(response.body.result.data.message).toBe(testResponse.message);
	});

	it("should start the server on the specified port", () => {
		const api = server["api"];
		const listenSpy = jest.spyOn(api, "listen").mockImplementation(() => new http.Server());

		server.start();

		expect(listenSpy).toHaveBeenCalledWith(apiConfig.apiPort, expect.any(Function));

		listenSpy.mockRestore();
	});

	it("should log the server start", () => {
		const loggerSpy = jest.spyOn(Logger, "info");
		server["logServerStart"]();
		expect(loggerSpy).toHaveBeenCalled();
	});
});
