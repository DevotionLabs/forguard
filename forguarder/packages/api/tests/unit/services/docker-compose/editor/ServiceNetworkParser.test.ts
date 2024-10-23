import { ListOfStrings } from "../../../../../src/services/docker-compose/editor/generated/types";
import { ServiceNetworkParser } from "../../../../../src/services/docker-compose/editor/ServiceNetworkParser";
import { ServiceNetworks } from "../../../../../src/services/docker-compose/editor/types";

describe("ServiceNetworkParser -> normalize", () => {
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
