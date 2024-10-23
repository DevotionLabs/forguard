import { ComposeRootNetworkEditor } from "../../../../../src/services/docker-compose/editor/ComposeRootNetworkEditor";
import { ComposeSpecification } from "../../../../../src/services/docker-compose/editor/generated/types";
import { testComposePath } from "../../../../integration/services/docker-compose/params";
import { existingNetworkName, mockCompose, newNetworkName } from "./testParams";

describe("ComposeRootNetworkEditor", () => {
	let spiedSaveToFile: jest.SpyInstance;
	let freshMockCompose: ComposeSpecification;

	const editor = new ComposeRootNetworkEditor(testComposePath);

	beforeEach(() => {
		freshMockCompose = structuredClone(mockCompose);

		const spiedReadCompose = jest.spyOn(ComposeRootNetworkEditor.prototype as any, "readCompose");
		spiedReadCompose.mockReturnValue(freshMockCompose);

		spiedSaveToFile = jest.spyOn(ComposeRootNetworkEditor.prototype as any, "saveToFile");
		spiedSaveToFile.mockImplementation(jest.fn());
	});

	it("should add an external network", () => {
		editor.addExternalNetworkToRoot(newNetworkName);

		const composeWithNet = {
			...freshMockCompose,
			networks: {
				...freshMockCompose.networks,
				[newNetworkName]: {
					external: true
				}
			}
		};

		expect(spiedSaveToFile).toHaveBeenCalledWith(composeWithNet);
	});

	it("should remove a network", () => {
		editor.removeNetworkFromRoot(existingNetworkName);

		const composeWithoutNet = {
			...freshMockCompose,
			networks: {}
		};

		expect(spiedSaveToFile).toHaveBeenCalledWith(composeWithoutNet);
	});

	it("should return an empty object if no networks are defined", () => {
		freshMockCompose.networks = undefined;

		const result = editor["getRootNetworks"]();

		expect(result).toEqual({});
	});
});
