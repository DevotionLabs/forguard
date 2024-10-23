import { ComposeServiceNetworkEditor } from "../../../../../src/services/docker-compose/editor/ComposeServiceNetworkEditor";
import { ComposeSpecification } from "../../../../../src/services/docker-compose/editor/generated/types";
import { RawServiceNetworks } from "../../../../../src/services/docker-compose/editor/types";
import { testComposePath } from "../../../../integration/services/docker-compose/params";
import { mockCompose, mockServiceName } from "./testParams";

const generateInitialCompose = (initialNetworks: RawServiceNetworks) => {
	return {
		...mockCompose,
		services: {
			...mockCompose.services,
			[mockServiceName]: {
				...mockCompose.services[mockServiceName],
				networks: initialNetworks
			}
		}
	};
};

const newNetwork = {
	name: "new-network",
	props: {
		aliases: ["test-alias"],
		ipv4_address: "192.168.1.2"
	}
};

const mockReadCompose = (compose: ComposeSpecification) => {
	const spiedReadCompose = jest.spyOn(ComposeServiceNetworkEditor.prototype as any, "readCompose");
	spiedReadCompose.mockReturnValue(compose);
};

const generateMockEditor = (compose: ComposeSpecification) => {
	mockReadCompose(compose);
	return new ComposeServiceNetworkEditor({ path: testComposePath, serviceName: mockServiceName });
};

describe("ComposeServiceNetworkEditor", () => {
	let spiedSaveToFile: jest.SpyInstance;

	beforeEach(() => {
		spiedSaveToFile = jest.spyOn(ComposeServiceNetworkEditor.prototype as any, "saveToFile");
		spiedSaveToFile.mockImplementation(jest.fn());
	});

	describe("Add a network", () => {
		it("should add a network to a service with none defined", () => {
			const initialCompose = generateInitialCompose(undefined);

			const composeWithNet: ComposeSpecification = {
				...initialCompose,
				services: {
					...initialCompose.services,
					[mockServiceName]: {
						...initialCompose.services[mockServiceName],
						networks: {
							...initialCompose.services[mockServiceName].networks,
							[newNetwork.name]: newNetwork.props
						}
					}
				}
			};

			const editor = generateMockEditor(initialCompose);

			editor.addNetworkToService(newNetwork);

			expect(spiedSaveToFile).toHaveBeenCalledWith(composeWithNet);
		});

		it("should add a new network keeping the existing ones", () => {
			const existingNetworks = { "existing-network": {} };
			const initialCompose = generateInitialCompose(existingNetworks);

			const composeWithNet: ComposeSpecification = {
				...initialCompose,
				services: {
					...initialCompose.services,
					[mockServiceName]: {
						...initialCompose.services[mockServiceName],
						networks: {
							...initialCompose.services[mockServiceName].networks,
							"existing-network": {},
							[newNetwork.name]: newNetwork.props
						}
					}
				}
			};

			const editor = generateMockEditor(initialCompose);

			editor.addNetworkToService(newNetwork);

			expect(spiedSaveToFile).toHaveBeenCalledWith(composeWithNet);
		});
	});

	describe("Remove a network", () => {
		it("should remove an existing network from the service", () => {
			const existingNetworks = {
				"existing-network": {},
				"network-to-remove": {}
			};
			const initialCompose = generateInitialCompose(existingNetworks);

			const composeWithoutNet: ComposeSpecification = {
				...initialCompose,
				services: {
					...initialCompose.services,
					[mockServiceName]: {
						...initialCompose.services[mockServiceName],
						networks: {
							"existing-network": {}
						}
					}
				}
			};

			const editor = generateMockEditor(initialCompose);

			editor.removeNetworkFromService("network-to-remove");

			expect(spiedSaveToFile).toHaveBeenCalledWith(composeWithoutNet);
		});

		it("should not throw an error if the network does not exist", () => {
			const existingNetworks = {
				"existing-network": {}
			};

			const initialCompose = generateInitialCompose(existingNetworks);

			const composeWithNoChange: ComposeSpecification = {
				...initialCompose,
				services: {
					...initialCompose.services,
					[mockServiceName]: {
						...initialCompose.services[mockServiceName],
						networks: {
							"existing-network": {}
						}
					}
				}
			};

			const editor = generateMockEditor(initialCompose);

			editor.removeNetworkFromService("non-existing-network");

			expect(spiedSaveToFile).toHaveBeenCalledWith(composeWithNoChange);
		});
	});

	describe("ComposeServiceNetworkEditor Error Handling", () => {
		beforeEach(() => {
			jest.restoreAllMocks();
		});

		it("should throw an error if no services are found in compose file", () => {
			const editor = generateMockEditor({});

			expect(() => {
				editor["getServicesFromCompose"]();
			}).toThrow("No services found in compose file");
		});

		it("should throw an error if no such service is found in compose", () => {
			const initialCompose = {
				services: {
					anotherService: {
						image: "test-image"
					}
				}
			};

			const editor = generateMockEditor(initialCompose);

			expect(() => {
				editor["getServiceFromCompose"]();
			}).toThrow(`No such service found in compose (${mockServiceName})`);
		});

		it("should initialize services as an empty object if undefined", () => {
			const initialCompose = { networks: {} }; // no services

			const editor = generateMockEditor(initialCompose);

			const spiedSaveToFile = jest.spyOn(ComposeServiceNetworkEditor.prototype as any, "saveToFile");
			spiedSaveToFile.mockImplementation(jest.fn());

			const serviceWithNetworks = {
				networks: {
					[newNetwork.name]: newNetwork.props
				}
			};

			editor["updateServiceInComposeFile"](serviceWithNetworks);

			const expectedCompose = {
				...initialCompose,
				services: {
					[mockServiceName]: serviceWithNetworks
				}
			};

			expect(spiedSaveToFile).toHaveBeenCalledWith(expectedCompose);
		});
	});
});
