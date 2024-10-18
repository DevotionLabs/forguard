import { ListOfStrings } from "../../../../../../src/services/docker-compose/editor/generated/types";
import { ServiceNetworkParser } from "../../../../../../src/services/docker-compose/editor/ServiceNetworkParser";

describe("ServiceNetworkParser -> isListOfStrings", () => {
	it("should return true for a valid ListOfStrings", () => {
		const networks: ListOfStrings = ["network1", "network2"];
		expect(ServiceNetworkParser["isListOfStrings"](networks)).toBe(true);
	});

	it("should return false for non-list values", () => {
		const networks = { customNetwork: {} };
		expect(ServiceNetworkParser["isListOfStrings"](networks)).toBe(false);
	});

	it("should return false for an array with non-string elements", () => {
		const networks = ["network1", 123];
		expect(ServiceNetworkParser["isListOfStrings"](networks)).toBe(false);
	});
});
