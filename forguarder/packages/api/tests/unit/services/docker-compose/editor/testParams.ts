export const existingNetworkName = "existing-network";
export const newNetworkName = "new-network";
export const mockServiceName = "test-service";

export const mockComposePath = "./test-docker-compose.yml";

export const mockCompose = {
	services: {
		[mockServiceName]: {
			image: "test-image",
			networks: ["default"]
		}
	},
	networks: {
		[existingNetworkName]: {
			external: true
		}
	}
};
