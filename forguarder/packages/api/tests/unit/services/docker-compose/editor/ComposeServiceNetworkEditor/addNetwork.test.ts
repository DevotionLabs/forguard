import { ComposeServiceNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeServiceNetworkEditor";
import {
	RawServiceNetworks,
	NetworkToAdd,
	ServiceNetworks
} from "../../../../../../src/services/docker-compose/editor/types";
import { generateServiceNetworkMockEditor } from "./generateServiceNetworkMockEditor";

describe("Add network to service", () => {
	const newNetwork = {
		name: "new-network",
		props: {
			aliases: ["test-alias"],
			ipv4_address: "192.168.1.2"
		}
	};

	const testNetworkAddition = ({
		initialNetworks,
		newNetwork,
		expectedNetworks
	}: {
		initialNetworks: RawServiceNetworks;
		newNetwork: NetworkToAdd;
		expectedNetworks: ServiceNetworks;
	}) => {
		const editor = generateServiceNetworkMockEditor(initialNetworks);

		editor.addNetworkToService(newNetwork);

		assertExpectedNetworks(editor, expectedNetworks);
	};

	const assertExpectedNetworks = (editor: ComposeServiceNetworkEditor, expectedNetworks: ServiceNetworks) =>
		expect(editor["service"].networks).toEqual(expectedNetworks);

	it("should initialize networks if none exist", () => {
		const expectedNetworks: ServiceNetworks = {
			[newNetwork.name]: newNetwork.props
		};

		testNetworkAddition({
			initialNetworks: undefined,
			newNetwork,
			expectedNetworks
		});
	});

	it("should add a network to the service", () => {
		const expectedNetworks: ServiceNetworks = {
			default: {},
			[newNetwork.name]: newNetwork.props
		};

		testNetworkAddition({
			initialNetworks: ["default"],
			newNetwork,
			expectedNetworks
		});
	});
});
