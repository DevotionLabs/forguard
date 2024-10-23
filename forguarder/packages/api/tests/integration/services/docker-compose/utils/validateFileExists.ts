import fs from "fs";

export const validateFileExists = (filePath: string) => {
	if (!fs.existsSync(filePath)) {
		throw new Error(`Test compose file not found at ${filePath}`);
	}
};
