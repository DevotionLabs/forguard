import { mockCompose, mockComposePath } from "../testParams";
import { ComposeRootNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeRootNetworkEditor";
import { mockComposeFileIO } from "../mockComposeFileIO";

export const generateMockEditor = () => {
	mockComposeFileIO(mockCompose);
	return new ComposeRootNetworkEditor(mockComposePath);
};
