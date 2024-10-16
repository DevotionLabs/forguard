describe("apiConfig", () => {
	const apiConfigSrcPath = "../../../src/config/apiConfig";

	beforeEach(() => {
		jest.resetModules();
		delete process.env.FORGUARD_API_PORT;
		delete process.env.CORS_ORIGIN;
	});

	it("should load default values when environment variables are missing", () => {
		const { apiPort, corsOrigin } = require(apiConfigSrcPath).apiConfig;

		expect(apiPort).toBe(3001);
		expect(corsOrigin).toBe("http://localhost:3000");
	});

	it("should load the environment variables when provided", () => {
		process.env.FORGUARD_API_PORT = "8080";
		process.env.CORS_ORIGIN = "https://example.com";

		const { apiPort, corsOrigin } = require(apiConfigSrcPath).apiConfig;

		expect(apiPort).toBe(8080);
		expect(corsOrigin).toBe("https://example.com");
	});

	it("should handle invalid FORGUARD_API_PORT values gracefully", () => {
		process.env.FORGUARD_API_PORT = "invalid_port";

		const { apiPort, corsOrigin } = require(apiConfigSrcPath).apiConfig;

		expect(apiPort).toBe(3001); // Falls back to default when invalid
		expect(corsOrigin).toBe("http://localhost:3000");
	});
});
