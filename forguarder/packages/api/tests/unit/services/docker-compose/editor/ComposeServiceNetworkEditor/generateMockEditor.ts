import fs from "fs";
import yaml from "js-yaml";
import { ComposeServiceNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeServiceNetworkEditor";
import { RawServiceNetworks } from "../../../../../../src/services/docker-compose/editor/types";
import { mockCompose, mockComposePath, mockServiceName } from "../testParams";

export const generateMockEditor = (initialNetworks: RawServiceNetworks) => {
	const spiedRead = jest.spyOn(fs, "readFileSync");
	const spiedWrite = jest.spyOn(fs, "writeFileSync");
	const spiedLoad = jest.spyOn(yaml, "load");

	const initialMock = generateInitialMock(initialNetworks);
	spiedRead.mockReturnValue(JSON.stringify(initialMock));
	spiedLoad.mockReturnValue(initialMock);
	spiedWrite.mockImplementation(() => {});

	return new ComposeServiceNetworkEditor({ path: mockComposePath, serviceName: mockServiceName });
};

const generateInitialMock = (initialNetworks: RawServiceNetworks) => {
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
