import fs from "fs";
import yaml from "js-yaml";
import { ComposeNetworkEditor } from "../../../../../src/services/docker-compose/editor/ComposeNetworkEditor";
import { validateDockerInstallation } from "../utils/validateDockerInstallation";
import { validateFileExists } from "../utils/validateFileExists";
import { ComposeSpecification } from "../../../../../src/services/docker-compose/editor/generated/types";
import { ServiceNetworkParser } from "../../../../../src/services/docker-compose/editor/ServiceNetworkParser";
import { areArraysEqual } from "../utils/areArraysEqual";
import { testComposePath } from "../params";
import { writeComposeToFile } from "../utils/writeTestComposeToFile";

const serviceName = "web";
const networkName = "new-network";
const aliases = ["test-alias"];

const loadCompose = (): ComposeSpecification => {
	const fileContent = fs.readFileSync(testComposePath, "utf8");
	return yaml.load(fileContent) as ComposeSpecification;
};

const isRootNetworkDefined = (): boolean => {
	const compose = loadCompose();
	return Boolean(compose?.networks?.[networkName]);
};

const getServiceNetworks = () => {
	const compose = loadCompose();
	const serviceNetworks = compose.services?.[serviceName].networks;
	return ServiceNetworkParser.normalize(serviceNetworks);
};

const areNetworkAliasesDefined = (): boolean => {
	const serviceNetworks = getServiceNetworks();
	const network = serviceNetworks[networkName];

	if (!network?.aliases) return false;

	return areArraysEqual(network.aliases, aliases);
};

describe("ComposeNetworkEditor Integration Tests", () => {
	let editor: ComposeNetworkEditor;

	beforeAll(() => {
		validateDockerInstallation();
		validateFileExists(testComposePath);
	});

	beforeEach(() => {
		writeComposeToFile();
		editor = new ComposeNetworkEditor({ path: testComposePath, serviceName });
	});

	describe("addNetwork", () => {
		it("should add a new network to both root and service", () => {
			editor.addNetwork(networkName, aliases);

			expect(isRootNetworkDefined()).toBeTruthy();

			expect(areNetworkAliasesDefined()).toBeTruthy();
		});

		it("should throw an error if no aliases are provided", () =>
			expect(() => editor.addNetwork(networkName, [])).toThrow("At least 1 alias must be set"));
	});

	describe("removeNetwork", () => {
		it("should remove the network from both root and service", () => {
			editor.addNetwork(networkName, aliases);

			editor.removeNetwork(networkName);

			expect(isRootNetworkDefined()).toBeFalsy();

			expect(areNetworkAliasesDefined()).toBeFalsy();
		});
	});
});
