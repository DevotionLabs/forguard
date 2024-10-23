import fs from "fs";
import yaml from "js-yaml";
import { testCompose, testComposePath } from "../params";

export const writeComposeToFile = () => {
	fs.writeFileSync(testComposePath, yaml.dump(testCompose));
};
