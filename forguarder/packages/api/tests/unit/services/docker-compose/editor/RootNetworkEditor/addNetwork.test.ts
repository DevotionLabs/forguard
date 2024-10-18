import { ComposeRootNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeRootNetworkEditor";
import { ServiceNetwork } from "../../../../../../src/services/docker-compose/editor/types";
import { newNetworkName } from "../testParams";
import { generateMockEditor } from "./generateMockEditor";

const assertExternalNetworkExists = (
	editor: ComposeRootNetworkEditor,
	networkName: string,
	networkProps: ServiceNetwork
) => {
	const networks = editor["compose"].networks;
	expect(networks).toBeDefined();
	expect(networks).toHaveProperty(networkName);
	expect(networks![networkName]).toEqual(networkProps);
};

describe("ComposeRootNetworkEditor -> Add network", () => {
	it("should add an external network to the root networks", () => {
		const editor = generateMockEditor();
		editor.addExternalNetworkToRoot(newNetworkName);

		assertExternalNetworkExists(editor, newNetworkName, { external: true });
	});
});
