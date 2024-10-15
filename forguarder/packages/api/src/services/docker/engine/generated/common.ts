/* tslint:disable */
/* eslint-disable */
/**
 * Docker Engine API
 * The Engine API is an HTTP API served by Docker Engine. It is the API the Docker client uses to communicate with the Engine, so everything the Docker client can do can be done with the API.  Most of the client\'s commands map directly to API endpoints (e.g. `docker ps` is `GET /containers/json`). The notable exception is running containers, which consists of several API calls.  # Errors  The API uses standard HTTP status codes to indicate the success or failure of the API call. The body of the response will be JSON in the following format:  ``` {   \"message\": \"page not found\" } ```  # Versioning  The API is usually changed in each release, so API calls are versioned to ensure that clients don\'t break. To lock to a specific version of the API, you prefix the URL with its version, for example, call `/v1.30/info` to use the v1.30 version of the `/info` endpoint. If the API version specified in the URL is not supported by the daemon, a HTTP `400 Bad Request` error message is returned.  If you omit the version-prefix, the current version of the API (v1.43) is used. For example, calling `/info` is the same as calling `/v1.43/info`. Using the API without a version-prefix is deprecated and will be removed in a future release.  Engine releases in the near future should support this version of the API, so your client will continue to work even if it is talking to a newer Engine.  The API uses an open schema model, which means server may add extra properties to responses. Likewise, the server will ignore any extra query parameters and request body properties. When you write clients, you need to ignore additional properties in responses to ensure they do not break when talking to newer daemons.   # Authentication  Authentication for registries is handled client side. The client has to send authentication details to various endpoints that need to communicate with registries, such as `POST /images/(name)/push`. These are sent as `X-Registry-Auth` header as a [base64url encoded](https://tools.ietf.org/html/rfc4648#section-5) (JSON) string with the following structure:  ``` {   \"username\": \"string\",   \"password\": \"string\",   \"email\": \"string\",   \"serveraddress\": \"string\" } ```  The `serveraddress` is a domain/IP without a protocol. Throughout this structure, double quotes are required.  If you have already got an identity token from the [`/auth` endpoint](#operation/SystemAuth), you can just pass this instead of credentials:  ``` {   \"identitytoken\": \"9cbaf023786cd7...\" } ```
 *
 * The version of the OpenAPI document: 1.43
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Configuration } from "./configuration";
import type { RequestArgs } from "./base";
import type { AxiosInstance, AxiosResponse } from "axios";
import { RequiredError } from "./base";

/**
 *
 * @export
 */
export const DUMMY_BASE_URL = "https://example.com";

/**
 *
 * @throws {RequiredError}
 * @export
 */
export const assertParamExists = function (functionName: string, paramName: string, paramValue: unknown) {
	if (paramValue === null || paramValue === undefined) {
		throw new RequiredError(
			paramName,
			`Required parameter ${paramName} was null or undefined when calling ${functionName}.`
		);
	}
};

/**
 *
 * @export
 */
export const setApiKeyToObject = async function (object: any, keyParamName: string, configuration?: Configuration) {
	if (configuration && configuration.apiKey) {
		const localVarApiKeyValue =
			typeof configuration.apiKey === "function"
				? await configuration.apiKey(keyParamName)
				: await configuration.apiKey;
		object[keyParamName] = localVarApiKeyValue;
	}
};

/**
 *
 * @export
 */
export const setBasicAuthToObject = function (object: any, configuration?: Configuration) {
	if (configuration && (configuration.username || configuration.password)) {
		object["auth"] = { username: configuration.username, password: configuration.password };
	}
};

/**
 *
 * @export
 */
export const setBearerAuthToObject = async function (object: any, configuration?: Configuration) {
	if (configuration && configuration.accessToken) {
		const accessToken =
			typeof configuration.accessToken === "function"
				? await configuration.accessToken()
				: await configuration.accessToken;
		object["Authorization"] = "Bearer " + accessToken;
	}
};

/**
 *
 * @export
 */
export const setOAuthToObject = async function (
	object: any,
	name: string,
	scopes: string[],
	configuration?: Configuration
) {
	if (configuration && configuration.accessToken) {
		const localVarAccessTokenValue =
			typeof configuration.accessToken === "function"
				? await configuration.accessToken(name, scopes)
				: await configuration.accessToken;
		object["Authorization"] = "Bearer " + localVarAccessTokenValue;
	}
};

function setFlattenedQueryParams(urlSearchParams: URLSearchParams, parameter: any, key: string = ""): void {
	if (parameter == null) return;
	if (typeof parameter === "object") {
		if (Array.isArray(parameter)) {
			(parameter as any[]).forEach((item) => setFlattenedQueryParams(urlSearchParams, item, key));
		} else {
			Object.keys(parameter).forEach((currentKey) =>
				setFlattenedQueryParams(urlSearchParams, parameter[currentKey], `${key}${key !== "" ? "." : ""}${currentKey}`)
			);
		}
	} else {
		if (urlSearchParams.has(key)) {
			urlSearchParams.append(key, parameter);
		} else {
			urlSearchParams.set(key, parameter);
		}
	}
}

/**
 *
 * @export
 */
export const setSearchParams = function (url: URL, ...objects: any[]) {
	const searchParams = new URLSearchParams(url.search);
	setFlattenedQueryParams(searchParams, objects);
	url.search = searchParams.toString();
};

/**
 *
 * @export
 */
export const serializeDataIfNeeded = function (value: any, requestOptions: any, configuration?: Configuration) {
	const nonString = typeof value !== "string";
	const needsSerialization =
		nonString && configuration && configuration.isJsonMime
			? configuration.isJsonMime(requestOptions.headers["Content-Type"])
			: nonString;
	return needsSerialization ? JSON.stringify(value !== undefined ? value : {}) : value || "";
};

/**
 *
 * @export
 */
export const toPathString = function (url: URL) {
	return url.pathname + url.search + url.hash;
};

/**
 *
 * @export
 */
export const createRequestFunction = function (
	axiosArgs: RequestArgs,
	globalAxios: AxiosInstance,
	BASE_PATH: string,
	configuration?: Configuration
) {
	return <T = unknown, R = AxiosResponse<T>>(axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
		const axiosRequestArgs = {
			...axiosArgs.options,
			url: (axios.defaults.baseURL ? "" : (configuration?.basePath ?? basePath)) + axiosArgs.url
		};
		return axios.request<T, R>(axiosRequestArgs);
	};
};
