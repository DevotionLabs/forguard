import fs from "fs";
import yaml from "js-yaml";
import { ComposeSpecification } from "../../../../../src/services/docker-compose/editor/generated/types";

export const mockComposeFileIO = (composeToLoad: ComposeSpecification) => {
	const spiedRead = jest.spyOn(fs, "readFileSync");
	const spiedWrite = jest.spyOn(fs, "writeFileSync");
	const spiedLoad = jest.spyOn(yaml, "load");

	spiedRead.mockReturnValue(JSON.stringify(composeToLoad));
	spiedLoad.mockReturnValue(composeToLoad);
	spiedWrite.mockImplementation(() => {});
};
