import fs from "fs";
import yaml from "js-yaml";
import { ComposeServiceNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeServiceNetworkEditor";
import { ServiceNetworkParser } from "../../../../../../src/services/docker-compose/editor/ServiceNetworkParser";
import { mockCompose, mockComposePath, mockServiceName } from "../testParams";

describe("Load the service", () => {
	const spiedRead = jest.spyOn(fs, "readFileSync");
	const spiedLoad = jest.spyOn(yaml, "load");

	beforeEach(() => {
		jest.resetAllMocks();
		spiedLoad.mockReturnValue(mockCompose);
		spiedRead.mockReturnValue(JSON.stringify(mockCompose));
	});

	it("should load the service with normalized networks from the compose file", () => {
		const editor = new ComposeServiceNetworkEditor({ path: mockComposePath, serviceName: mockServiceName });
		expect(editor["service"]).toEqual({
			...mockCompose.services[mockServiceName],
			networks: ServiceNetworkParser.normalize(mockCompose.services[mockServiceName].networks)
		});
	});

	it("should throw an error if there are no services defined in the compose", () => {
		spiedLoad.mockReturnValue({});
		expect(
			() => new ComposeServiceNetworkEditor({ path: mockComposePath, serviceName: "nonexistent-service" })
		).toThrow("No services found in ./test-docker-compose.yml");
	});

	it("should throw an error if no such service name is defined in the compose", () => {
		expect(
			() => new ComposeServiceNetworkEditor({ path: mockComposePath, serviceName: "nonexistent-service" })
		).toThrow("No such service found in compose (nonexistent-service)");
	});
});
