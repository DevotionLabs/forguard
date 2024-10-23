import { execSync } from "child_process";
import { ComposeRunner } from "../../../../../src/services/docker-compose/runner/ComposeRunner";
import { validateDockerInstallation } from "../utils/validateDockerInstallation";
import { writeComposeToFile } from "../utils/writeTestComposeToFile";
import { testComposePath } from "../params";

const isContainerRunning = (containerName: string) => {
	const psOutput = execSync("docker ps --filter 'name=web' --format '{{.Names}}'").toString().trim();
	return psOutput === containerName;
};

describe("ComposeRunner Integration Tests", () => {
	const runner = new ComposeRunner(testComposePath);
	const containerName = "web";

	beforeAll(() => {
		validateDockerInstallation();
	});

	beforeEach(() => {
		writeComposeToFile();
	});

	afterEach(() => {
		runner.down({ volumes: true, "remove-orphans": true });
	});

	it("should start services using 'docker compose up'", () => {
		runner.up({ detach: true });

		expect(isContainerRunning(containerName)).toBeTruthy();
	});

	it("should stop and remove services using 'docker compose down'", () => {
		runner.up({ detach: true });

		runner.down({ volumes: true, "remove-orphans": true });

		expect(isContainerRunning(containerName)).toBeFalsy();
	});
});
