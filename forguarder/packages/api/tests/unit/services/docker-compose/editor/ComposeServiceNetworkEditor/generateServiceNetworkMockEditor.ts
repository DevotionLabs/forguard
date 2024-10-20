import { ComposeServiceNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeServiceNetworkEditor";
import { RawServiceNetworks } from "../../../../../../src/services/docker-compose/editor/types";
import { mockCompose, mockComposePath, mockServiceName } from "../testParams";
import { mockComposeFileIO } from "../mockComposeFileIO";

export const generateServiceNetworkMockEditor = (initialNetworks: RawServiceNetworks) => {
	const initialCompose = generateinitialCompose(initialNetworks);
	mockComposeFileIO(initialCompose);
	return new ComposeServiceNetworkEditor({ path: mockComposePath, serviceName: mockServiceName });
};

const generateinitialCompose = (initialNetworks: RawServiceNetworks) => {
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
