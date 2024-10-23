import fs from "fs";
import yaml from "js-yaml";
import { ComposeRootNetworkEditor } from "../../../../../src/services/docker-compose/editor/ComposeRootNetworkEditor";
import { mockCompose, mockComposePath } from "./testParams";

jest.mock("fs");

// ComposeRootNetworkEditor is used in this test because ComposeEditor class is abstract
describe("ComposeEditor", () => {
	beforeEach(() => {
		const spiedRead = jest.spyOn(fs, "readFileSync");
		const spiedLoad = jest.spyOn(yaml, "load");

		spiedRead.mockReturnValue(JSON.stringify(mockCompose));
		spiedLoad.mockReturnValue(mockCompose);
	});

	it("should log an error when loading the compose file fails", () => {
		const spiedRead = jest.spyOn(fs, "readFileSync");
		spiedRead.mockImplementation(() => {
			throw new Error("File not found");
		});

		expect(() => new ComposeRootNetworkEditor(mockComposePath)).toThrow("File not found");
	});

	it("should save the compose file correctly", () => {
		const editor = new ComposeRootNetworkEditor(mockComposePath);
		editor["saveToFile"](mockCompose);

		expect(fs.writeFileSync).toHaveBeenCalledWith(mockComposePath, editor["composeToString"](mockCompose));
	});

	it("should throw an error when saving the compose file fails", () => {
		const spiedWrite = jest.spyOn(fs, "writeFileSync");
		spiedWrite.mockImplementation(() => {
			throw new Error("Write error");
		});

		const editor = new ComposeRootNetworkEditor(mockComposePath);

		expect(() => editor["saveToFile"](mockCompose)).toThrow("Write error");
	});
});
