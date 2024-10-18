import fs from "fs";
import { dump } from "js-yaml";
import { ComposeRootNetworkEditor } from "../../../../../src/services/docker-compose/editor/ComposeRootNetworkEditor";
import { mockCompose, mockComposePath } from "./testParams";

const assertFileWrite = (path: string) => {
	expect(fs.writeFileSync).toHaveBeenCalledWith(path, expect.any(String), "utf8");
};

jest.mock("fs");

// ComposeRootNetworkEditor is used in this test because ComposeEditor class is abstract
describe("ComposeEditor", () => {
	const spiedRead = jest.spyOn(fs, "readFileSync");
	const spiedWrite = jest.spyOn(fs, "writeFileSync");

	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("should load the compose file correctly", () => {
		spiedRead.mockReturnValue(dump(mockCompose));
		const editor = new ComposeRootNetworkEditor(mockComposePath);

		expect(editor["compose"]).toEqual(mockCompose);
	});

	it("should log an error when loading the compose file fails", () => {
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
		spiedWrite.mockImplementation(() => {
			throw new Error("Write error");
		});

		const editor = new ComposeRootNetworkEditor(mockComposePath);

		expect(() => editor["saveToFile"]()).toThrow("Write error");
	});
});
