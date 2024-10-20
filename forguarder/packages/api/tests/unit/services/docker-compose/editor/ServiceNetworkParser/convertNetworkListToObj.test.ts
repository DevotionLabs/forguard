import { ListOfStrings } from "../../../../../../src/services/docker-compose/editor/generated/types";
import { ServiceNetworkParser } from "../../../../../../src/services/docker-compose/editor/ServiceNetworkParser";
import { ServiceNetworks } from "../../../../../../src/services/docker-compose/editor/types";

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
