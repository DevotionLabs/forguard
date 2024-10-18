import { ServiceNetworkParser } from "../../../../../src/services/docker-compose/editor/ServiceNetworkParser";
import { ListOfStrings } from "../../../../../src/services/docker-compose/editor/generated/types";
import { ServiceNetworks } from "../../../../../src/services/docker-compose/editor/types";

describe("ServiceNetworkParser", () => {
	describe("isListOfStrings", () => {
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

	describe("convertNetworkListToObject", () => {
		it("should convert a ListOfStrings to an object with empty values", () => {
			const networks: ListOfStrings = ["network1", "network2"];
			const expected: ServiceNetworks = {
				network1: {},
				network2: {}
			};

			expect(ServiceNetworkParser["convertNetworkListToObject"](networks)).toEqual(expected);
		});
	});

	describe("normalize", () => {
		it("should convert a ListOfStrings to a ServiceNetworks object", () => {
			const networks: ListOfStrings = ["network1", "network2"];
			const expected: ServiceNetworks = {
				network1: {},
				network2: {}
			};

			expect(ServiceNetworkParser.normalize(networks)).toEqual(expected);
		});

		it("should return the same object when ServiceNetworks is already an object", () => {
			const networks: ServiceNetworks = {
				customNetwork: {
					aliases: ["alias1"],
					ipv4_address: "192.168.1.1"
				}
			};

			expect(ServiceNetworkParser.normalize(networks)).toEqual(networks);
		});
	});
});
