import fs from "fs";
import { ComposeRootNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeRootNetworkEditor";
import { mockCompose, mockComposePath } from "../testParams";
import { assertFileWrite } from "./assertFileWrite";
import { mockComposeFileIO } from "../mockComposeFileIO";

jest.mock("fs");

// ComposeRootNetworkEditor is used in this test because ComposeEditor class is abstract
describe("ComposeEditor", () => {
	beforeEach(() => {
		mockComposeFileIO(mockCompose);
	});

	it("should load the compose file correctly", () => {
		const editor = new ComposeRootNetworkEditor(mockComposePath);

		expect(editor["compose"]).toEqual(mockCompose);
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
		editor["compose"] = mockCompose;
		editor["saveToFile"]();

		assertFileWrite(mockComposePath);
	});

	it("should log an error when saving the compose file fails", () => {
		const spiedWrite = jest.spyOn(fs, "writeFileSync");
		spiedWrite.mockImplementation(() => {
			throw new Error("Write error");
		});

		const editor = new ComposeRootNetworkEditor(mockComposePath);

		expect(() => editor["saveToFile"]()).toThrow("Write error");
	});
});
