import { ComposeRootNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeRootNetworkEditor";
import { existingNetworkName } from "../testParams";
import { generateMockEditor } from "./generateMockEditor";

const assertNetworkIsDeleted = (editor: ComposeRootNetworkEditor, networkName: string) => {
	const networks = editor["compose"].networks;
	expect(networks).not.toHaveProperty(networkName);
};

describe("Remove network", () => {
	it("should remove a network from the root networks", () => {
		const editor = generateMockEditor();
		editor.removeNetworkFromRoot(existingNetworkName);

		assertNetworkIsDeleted(editor, existingNetworkName);
	});
});
