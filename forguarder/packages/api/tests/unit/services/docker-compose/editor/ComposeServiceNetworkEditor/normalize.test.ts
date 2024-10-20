import { ComposeServiceNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeServiceNetworkEditor";
import { RawServiceNetworks, ServiceNetworks } from "../../../../../../src/services/docker-compose/editor/types";
import { generateServiceNetworkMockEditor } from "./generateServiceNetworkMockEditor";

describe("Normalize networks", () => {
	const testNetworkNormalization = ({
		rawNetworks,
		normalizedNetworks
	}: {
		rawNetworks: RawServiceNetworks;
		normalizedNetworks: ServiceNetworks;
	}) => {
		const editor = generateServiceNetworkMockEditor(rawNetworks);

		assertExpectedNetworks(editor, normalizedNetworks);
	};

	const assertExpectedNetworks = (editor: ComposeServiceNetworkEditor, expectedNetworks: ServiceNetworks) =>
		expect(editor["service"].networks).toEqual(expectedNetworks);

	it("should normalize networks if they are in ListOfStrings format", () => {
		const rawNetworks = ["default", "test-network"];
		const normalizedNetworks: ServiceNetworks = {
			default: {},
			"test-network": {}
		};

		testNetworkNormalization({
			rawNetworks,
			normalizedNetworks
		});
	});

	it("should return an empty object if no networks are defined", () => {
		const rawNetworks = undefined;
		const normalizedNetworks = {};

		testNetworkNormalization({
			rawNetworks,
			normalizedNetworks
		});
	});

	it("should return the networks object as-is if it's already normalized", () => {
		const rawNetworks = {
			default: {},
			"custom-network": { aliases: ["alias1"] }
		};
		const normalizedNetworks = rawNetworks;

		testNetworkNormalization({
			rawNetworks,
			normalizedNetworks
		});
	});
});
