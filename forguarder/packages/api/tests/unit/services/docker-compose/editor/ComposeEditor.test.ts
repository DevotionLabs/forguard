import fs from "fs";
import { dump } from "js-yaml";
import { ComposeNetworkEditor } from "../../../../../src/services/docker-compose/editor/ComposeRootNetworkEditor";
import { Logger } from "../../../../../src/logger/Logger";

jest.mock("fs");
jest.mock("../../../../../src/logger/Logger");

// ComposeNetworkEditor is used in this test because ComposeEditor class is abstract
describe("ComposeEditor", () => {
	const mockPath = "./test-docker-compose.yml";
	const mockComposeData = { services: { app: { image: "my-app" } } };
	const spiedRead = jest.spyOn(fs, "readFileSync");
	const spiedWrite = jest.spyOn(fs, "writeFileSync");

	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("should load the compose file correctly", () => {
		spiedRead.mockReturnValue(dump(mockComposeData));

		const editor = new ComposeNetworkEditor(mockPath);

		expect(editor["compose"]).toEqual(mockComposeData);
	});

	it("should log an error when loading the compose file fails", () => {
		spiedRead.mockImplementation(() => {
			throw new Error("File not found");
		});

		expect(() => new ComposeNetworkEditor(mockPath)).toThrow("File not found");
		expect(Logger.error).toHaveBeenCalledWith(expect.stringContaining("Error loading the compose file:"));
	});

	it("should save the compose file correctly", () => {
		spiedWrite.mockImplementation(() => {});

		const editor = new ComposeNetworkEditor(mockPath);
		editor["compose"] = mockComposeData;
		editor["saveToFile"].call(editor);

		expect(fs.writeFileSync).toHaveBeenCalledWith(mockPath, expect.any(String), "utf8");

		expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining("Successfully written compose to"));
	});

	it("should log an error when saving the compose file fails", () => {
		spiedWrite.mockImplementation(() => {
			throw new Error("Write error");
		});

		const editor = new ComposeNetworkEditor(mockPath);

		expect(() => editor["saveToFile"].call(editor)).toThrow("Write error");
		expect(Logger.error).toHaveBeenCalledWith(expect.stringContaining("Error saving the compose file:"));
	});
});
