module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"], // Allow imports from TS, JS, and JSON files
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/*.d.ts", // Exclude TypeScript declaration files
    "!<rootDir>/src/services/docker/**/*", // Exclude auto-generated files in docker folder
  ],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@server/(.*)$": "<rootDir>/src/server/$1",
    "^@logger/(.*)$": "<rootDir>/src/logger/$1",
  },
};
