import { DefinitionsService, ListOfStrings } from "./generated/types";

export type RawServiceNetworks = DefinitionsService["networks"];

export type ServiceNetworks = Exclude<DefinitionsService["networks"], ListOfStrings | undefined>;

export type ServiceNetwork = Exclude<ServiceNetworks[string], null>;

export type NetworkToAdd = {
	name: string;
	props: ServiceNetwork;
};

// Field "networks" can't be an array or undefined
export type ComposeServiceWithNetworks = Omit<DefinitionsService, "networks"> & {
	networks: ServiceNetworks;
};
