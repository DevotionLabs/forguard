import fs from "fs";
import yaml from "js-yaml";
import { mockCompose, mockComposePath } from "../testParams";
import { ComposeRootNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeRootNetworkEditor";

export const generateMockEditor = () => {
	const spiedRead = jest.spyOn(fs, "readFileSync");
	const spiedWrite = jest.spyOn(fs, "writeFileSync");
	const spiedLoad = jest.spyOn(yaml, "load");

	spiedRead.mockReturnValue(JSON.stringify(mockCompose));
	spiedLoad.mockReturnValue(mockCompose);
	spiedWrite.mockImplementation(() => {});

	return new ComposeRootNetworkEditor(mockComposePath);
};
