import * as cp from "child_process";
import { ComposeRunner } from "../../../../../src/services/docker-compose/runner/ComposeRunner";
import { ComposeFlagsParser } from "../../../../../src/services/docker-compose/runner/ComposeFlagsParser";
import { AvailableCommands } from "../../../../../src/services/docker-compose/runner/types";

jest.mock("child_process");
jest.mock("../../../../../src/logger/index");

describe("ComposeRunner", () => {
	const mockPath = "./docker-compose.yml";

	const mockFlags = {
		timeout: 3000,
		"dry-run": true
	};
	const mockParsedFlags = "--timeout=3000 --dry-run";

	const spiedExec = jest.spyOn(cp, "execSync");

	beforeEach(() => {
		jest.resetAllMocks();
		spiedExec.mockImplementation((_cmd) => {
			return Buffer.from("success");
		});
	});

	describe("ComposeRunner", () => {
		const runComposeTest = (command: AvailableCommands, mockParsedFlags: string) => {
			const runner = new ComposeRunner(mockPath);
			const result = runner[command](mockFlags);

			expect(cp.execSync).toHaveBeenCalledWith(`docker compose -f ${mockPath} ${command} ${mockParsedFlags}`);
			expect(result).toBe("success");
		};

		it("should run 'docker compose up' with parsed flags", () => {
			runComposeTest("up", mockParsedFlags);
		});

		it("should run 'docker compose down' with parsed flags", () => {
			runComposeTest("down", mockParsedFlags);
		});
	});

	describe("runComposeCommand", () => {
		it("should throw an error when exec fails", async () => {
			const runner = new ComposeRunner(mockPath);
			jest.spyOn(ComposeFlagsParser, "toString").mockReturnValue(mockParsedFlags);

			spiedExec.mockImplementation((_cmd) => {
				throw new Error("command failed");
			});

			expect(() => runner.up(mockFlags)).toThrow("Could not execute compose command: Error: command failed");
		});
	});
});
