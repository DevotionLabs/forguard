import { ComposeNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeNetworkEditor";
import { ComposeRootNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeRootNetworkEditor";
import { ComposeServiceNetworkEditor } from "../../../../../../src/services/docker-compose/editor/ComposeServiceNetworkEditor";

jest.mock("../../../../../../src/services/docker-compose/editor/ComposeRootNetworkEditor");
jest.mock("../../../../../../src/services/docker-compose/editor/ComposeServiceNetworkEditor");

describe("ComposeNetworkEditor", () => {
	const mockPath = "./mock-docker-compose.yml";
	const mockServiceName = "test-service";
	const newNetworkName = "new-network";
	const aliases = ["alias1"];

	let rootEditorMock: jest.Mocked<ComposeRootNetworkEditor>;
	let serviceEditorMock: jest.Mocked<ComposeServiceNetworkEditor>;

	beforeEach(() => {
		rootEditorMock = new ComposeRootNetworkEditor(mockPath) as jest.Mocked<ComposeRootNetworkEditor>;
		serviceEditorMock = new ComposeServiceNetworkEditor({
			path: mockPath,
			serviceName: mockServiceName
		}) as jest.Mocked<ComposeServiceNetworkEditor>;

		(ComposeRootNetworkEditor as jest.Mock).mockReturnValue(rootEditorMock);
		(ComposeServiceNetworkEditor as jest.Mock).mockReturnValue(serviceEditorMock);
	});

	describe("addNetwork", () => {
		it("should add a network to both root and service editors", () => {
			const editor = new ComposeNetworkEditor({ path: mockPath, serviceName: mockServiceName });

			editor.addNetwork(newNetworkName, aliases);

			expect(rootEditorMock.addExternalNetworkToRoot).toHaveBeenCalledWith(newNetworkName);
			expect(serviceEditorMock.addNetworkToService).toHaveBeenCalledWith({
				name: newNetworkName,
				props: {
					aliases
				}
			});
		});

		it("should throw an error if no aliases are provided", () => {
			const editor = new ComposeNetworkEditor({ path: mockPath, serviceName: mockServiceName });

			expect(() => editor.addNetwork(newNetworkName, [])).toThrow("At least 1 alias must be set");
		});

		it("should handle the case when root network addition fails but service network addition succeeds", () => {
			/*const editor = new ComposeNetworkEditor({ path: mockPath, serviceName: mockServiceName });

			rootEditorMock.addExternalNetworkToRoot.mockImplementation(() => {
				throw new Error("Root network addition failed");
			});*/
			// TODO: Waiting for implementation
		});
	});

	describe("removeNetwork", () => {
		it("should remove a network from both root and service editors", () => {
			const editor = new ComposeNetworkEditor({ path: mockPath, serviceName: mockServiceName });

			editor.removeNetwork(newNetworkName);

			expect(rootEditorMock.removeNetworkFromRoot).toHaveBeenCalledWith(newNetworkName);
			expect(serviceEditorMock.removeNetworkFromService).toHaveBeenCalledWith(newNetworkName);
		});

		it("should handle the case when root network removal fails but service network removal succeeds", () => {
			/*const editor = new ComposeNetworkEditor({ path: mockPath, serviceName: mockServiceName });

			rootEditorMock.removeNetworkFromRoot.mockImplementation(() => {
				throw new Error("Root network removal failed");
			});*/
			// TODO: Waiting for implementation
		});
	});
});
