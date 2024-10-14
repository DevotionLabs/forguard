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
    "!<rootDir>/src/services/docker/**/generated/*", // Exclude auto-generated files in docker folder
  ],
  moduleNameMapper: {
    "^\\.(.*)\\.js$": ".$1" // Map .js imports to "no-extension" imports
  }
};
