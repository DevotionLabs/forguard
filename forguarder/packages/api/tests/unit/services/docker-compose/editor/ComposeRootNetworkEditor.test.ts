import fs from "fs";
import { ComposeNetworkEditor } from "../../../../../src/services/docker-compose/editor/index";
import yaml from "js-yaml";

jest.mock("fs");
jest.mock("js-yaml");

describe("ComposeNetworkEditor", () => {
	const existingNetworkName = "existing-network";
	const newNetworkName = "new-network";

	const mockComposeFilePath = "./mock-compose.yaml";
	const mockComposeContent = {
		services: {},
		networks: {
			[existingNetworkName]: {
				external: true
			}
		}
	};

	const spiedRead = jest.spyOn(fs, "readFileSync");
	const spiedYamlLoad = jest.spyOn(yaml, "load");
	const spiedDump = jest.spyOn(yaml, "dump");

	const getFirstArgFromFirstCall = (spiedFunc: jest.SpyInstance) => {
		return spiedFunc.mock.calls[0][0];
	};

	beforeEach(() => {
		jest.resetAllMocks();
		spiedRead.mockReturnValue(JSON.stringify(mockComposeContent));
		spiedYamlLoad.mockReturnValue(mockComposeContent);
	});

	it("should add an external network to the root networks", () => {
		const editor = new ComposeNetworkEditor(mockComposeFilePath);
		editor.addExternalNetworkToRoot(newNetworkName);
		const networks = editor["compose"].networks;

		if (!networks) throw new Error("Compose root networks is undefined");

		expect(networks).toHaveProperty(newNetworkName);
		expect(networks[newNetworkName]).toEqual({ external: true });
	});

	it("should log errors when failing to save the compose file", () => {
		const editor = new ComposeNetworkEditor(mockComposeFilePath);
		const spiedWrite = jest.spyOn(fs, "writeFileSync");
		spiedWrite.mockImplementation(() => {
			throw new Error("Write failed");
		});

		expect(() => editor.addExternalNetworkToRoot(newNetworkName)).toThrow("Write failed");
	});

	it("should remove a network from the root networks", () => {
		const editor = new ComposeNetworkEditor(mockComposeFilePath);
		editor.removeNetworkFromRoot(existingNetworkName);

		const networks = editor["compose"].networks;

		if (!networks) throw new Error("Compose root networks is undefined");

		expect(networks).not.toHaveProperty(existingNetworkName);
	});

	describe("Save updated networks to file", () => {
		const testNetworkUpdateOnFile = (
			action: (_editor: ComposeNetworkEditor) => void,
			expectedResult: (_savedYamlContent: any) => void
		) => {
			const editor = new ComposeNetworkEditor(mockComposeFilePath);

			action(editor);

			const savedYamlContent = getFirstArgFromFirstCall(spiedDump);

			expect(fs.writeFileSync).toHaveBeenCalled();
			expectedResult(savedYamlContent);
		};

		it("should save the updated networks to the compose file after addition", () => {
			testNetworkUpdateOnFile(
				(editor) => editor.addExternalNetworkToRoot(newNetworkName),
				(savedYamlContent) => expect(savedYamlContent.networks[newNetworkName]).toEqual({ external: true })
			);
		});

		it("should save the updated networks to the compose file after deletion", () => {
			testNetworkUpdateOnFile(
				(editor) => editor.removeNetworkFromRoot(existingNetworkName),
				(savedYamlContent) => expect(savedYamlContent.networks).not.toHaveProperty(existingNetworkName)
			);
		});
	});
});
