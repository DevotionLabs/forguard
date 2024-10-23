import { execSync } from "child_process";

export const validateDockerInstallation = () => {
	try {
		execSync("docker --version");
	} catch (error) {
		throw new Error("Docker is not installed or running.");
	}
};
