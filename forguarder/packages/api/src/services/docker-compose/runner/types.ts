export type AvailableCommands = "up" | "down";

export type ComposeUpFlags = {
	"abort-on-container-exit"?: boolean;
	"abort-on-container-failure"?: boolean;
	"always-recreate-deps"?: boolean;
	"attach-dependencies"?: boolean;
	build?: boolean;
	detach?: boolean;
	"dry-run"?: boolean;
	"exit-code-from"?: string;
	"force-recreate"?: boolean;
	menu?: boolean;
	"no-build"?: boolean;
	"no-color"?: boolean;
	"no-deps"?: boolean;
	"no-log-prefix"?: boolean;
	"no-recreate"?: boolean;
	"no-start"?: boolean;
	pull?: "always" | "missing" | "never";
	"quiet-pull"?: boolean;
	"remove-orphans"?: boolean;
	"renew-anon-volumes"?: boolean;
	timestamps?: boolean;
	timeout?: number;
	wait?: boolean;
	"wait-timeout"?: number;
	watch?: boolean;
};

export type ComposeDownFlags = {
	"dry-run"?: boolean;
	"remove-orphans"?: boolean;
	rmi?: "local" | "all";
	timeout?: number;
	volumes?: boolean;
};

export type ComposeCommandFlags = ComposeUpFlags | ComposeDownFlags;
export type ComposeCommandFlag = [string, boolean | string | number];
