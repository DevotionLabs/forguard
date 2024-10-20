import fs from "fs";
import yaml from "js-yaml";
import { ComposeRootNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeRootNetworkEditor";
import { newNetworkName, existingNetworkName } from "../testParams";
import { generateMockEditor } from "./generateMockEditor";

const getFirstArgFromFirstCall = (spiedFunc: jest.SpyInstance) => {
	return spiedFunc.mock.calls[0][0];
};

jest.mock("fs");

describe("Save updated networks to file", () => {
	const spiedDump = jest.spyOn(yaml, "dump");

	const testNetworkUpdateOnFile = (
		action: (_editor: ComposeRootNetworkEditor) => void,
		expectedResult: (_savedYamlContent: any) => void
	) => {
		const editor = generateMockEditor();

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
