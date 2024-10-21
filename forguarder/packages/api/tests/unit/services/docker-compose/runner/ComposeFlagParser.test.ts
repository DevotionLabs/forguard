import { ComposeFlagsParser } from "../../../../../src/services/docker-compose/runner/ComposeFlagsParser";
import { ComposeUpFlags } from "../../../../../src/services/docker-compose/runner/types";

describe("ComposeFlagsParser", () => {
	describe("toString", () => {
		it("should return a string of flags for boolean values", () => {
			const flags: ComposeUpFlags = {
				"abort-on-container-exit": true,
				build: false,
				detach: true
			};

			const result = ComposeFlagsParser.toString(flags);
			expect(result).toEqual("--abort-on-container-exit --build --detach");
		});

		it("should return a string of flags with key-value pairs for string values", () => {
			const flags: ComposeUpFlags = {
				"exit-code-from": "my-service",
				pull: "always"
			};

			const result = ComposeFlagsParser.toString(flags);
			expect(result).toEqual("--exit-code-from=my-service --pull=always");
		});

		it("should return a string of mixed boolean and key-value flags", () => {
			const flags: ComposeUpFlags = {
				"abort-on-container-exit": true,
				"exit-code-from": "my-service",
				"quiet-pull": true,
				pull: "missing"
			};

			const result = ComposeFlagsParser.toString(flags);
			expect(result).toEqual("--abort-on-container-exit --exit-code-from=my-service --quiet-pull --pull=missing");
		});
	});
});
