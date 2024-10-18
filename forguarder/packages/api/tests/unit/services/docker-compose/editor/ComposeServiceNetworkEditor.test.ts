import { ComposeServiceNetworkEditor } from "../../../../../src/services/docker-compose/editor/ComposeServiceNetworkEditor";
import { ServiceNetworkParser } from "../../../../../src/services/docker-compose/editor/ServiceNetworkParser";
import {
	NetworkToAdd,
	RawServiceNetworks,
	ServiceNetworks
} from "../../../../../src/services/docker-compose/editor/types";
import yaml from "js-yaml";
import fs from "fs";

jest.mock("fs");
jest.mock("js-yaml");

describe("ComposeServiceNetworkEditor", () => {
	const mockPath = "./test-docker-compose.yml";
	const mockServiceName = "test-service";

	const mockComposeData = {
		services: {
			"test-service": {
				image: "test-image",
				networks: ["default"]
			}
		}
	};

	const spiedRead = jest.spyOn(fs, "readFileSync");
	const spiedLoad = jest.spyOn(yaml, "load");

	const setupMockedEditor = (initialNetworks: RawServiceNetworks) => {
		const initialMock = generateInitialMock(initialNetworks);
		spiedLoad.mockReturnValue(initialMock);
		return new ComposeServiceNetworkEditor(mockPath, mockServiceName);
	};

	const generateInitialMock = (initialNetworks: RawServiceNetworks) => {
		return {
			...mockComposeData,
			services: {
				...mockComposeData.services,
				[mockServiceName]: {
					...mockComposeData.services[mockServiceName],
					networks: initialNetworks
				}
			}
		};
	};

	beforeEach(() => {
		jest.resetAllMocks();
		spiedRead.mockReturnValue(yaml.dump(mockComposeData));
		spiedLoad.mockReturnValue(mockComposeData);
	});

	describe("constructor", () => {
		it("should load the service with normalized networks from the compose file", () => {
			const editor = new ComposeServiceNetworkEditor(mockPath, mockServiceName);
			expect(editor["service"]).toEqual({
				...mockComposeData.services[mockServiceName],
				networks: ServiceNetworkParser.normalize(mockComposeData.services[mockServiceName].networks)
			});
		});

		it("should throw an error if there are no services defined in the compose", () => {
			spiedLoad.mockReturnValue({});
			expect(() => new ComposeServiceNetworkEditor(mockPath, "nonexistent-service")).toThrow(
				"No services found in ./test-docker-compose.yml"
			);
		});

		it("should throw an error if no such service name is defined in the compose", () => {
			expect(() => new ComposeServiceNetworkEditor(mockPath, "nonexistent-service")).toThrow(
				"No such service found in compose (nonexistent-service)"
			);
		});
	});

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
			const editor = setupMockedEditor(initialNetworks);

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

	describe("Normalize networks", () => {
		const testNetworkNormalization = ({
			rawNetworks,
			normalizedNetworks
		}: {
			rawNetworks: RawServiceNetworks;
			normalizedNetworks: ServiceNetworks;
		}) => {
			const editor = setupMockedEditor(rawNetworks);

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
});
