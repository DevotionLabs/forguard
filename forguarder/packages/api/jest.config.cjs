module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	rootDir: "./",
	testMatch: ["<rootDir>/tests/**/*.test.ts"],
	moduleFileExtensions: ["ts", "js", "json"],
	collectCoverage: true,
	coverageDirectory: "<rootDir>/coverage",
	coverageReporters: ["text", "lcov"],
	collectCoverageFrom: [
		"<rootDir>/src/**/*.ts",
		"!<rootDir>/src/**/*.d.ts",
		"!<rootDir>/src/services/docker-*/**/generated/*"
	],
	moduleNameMapper: {
		"^\\.(.*)\\.js$": ".$1" // Map .js imports to "no-extension" imports
	}
};
