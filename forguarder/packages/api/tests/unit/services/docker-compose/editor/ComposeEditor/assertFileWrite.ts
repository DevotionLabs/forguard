import fs from "fs";

export const assertFileWrite = (path: string) => {
	expect(fs.writeFileSync).toHaveBeenCalledWith(path, expect.any(String), "utf8");
};
