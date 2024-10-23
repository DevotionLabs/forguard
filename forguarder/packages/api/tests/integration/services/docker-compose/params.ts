import path from "path";
import { ComposeSpecification } from "../../../../src/services/docker-compose/editor/generated/types";

export const testCompose: ComposeSpecification = {
	services: {
		web: {
			image: "nginx",
			container_name: "web",
			ports: ["80:80"]
		}
	}
};

export const testComposePath = path.resolve(__dirname, "./docker-compose.yml");
