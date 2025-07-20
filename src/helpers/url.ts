import type { Helper } from "../helper-registry";

/**
 * Encode a Uniform Resource Identifier (URI) component by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character.
 *
 * @example
 * {{encodeURIComponent test.name}}
 * <!-- given test.name = "User Login Test" -->
 * <!-- results in: "User%20Login%20Test" -->
 *
 * @param {unknown} str - The un-encoded string from test data or CTRF report.
 * @returns {string} The encoded string for use in URLs or test report links.
 *
 *  Use this helper to safely include test names or suite names in URLs in CTRF HTML reports.
 */
export const encodeURIComponentHelper: Helper = {
	name: "encodeURIComponent",
	category: "URL",
	fn: (str: unknown) => {
		if (typeof str !== "string") return "";
		return encodeURIComponent(str);
	},
};

/**
 * Escape the given string by replacing characters with escape sequences. Useful for allowing the string to be used in a URL, etc.
 *
 * @example
 * {{escapeUrl test.name}}
 * <!-- given test.name = "User/Login?Test" -->
 * <!-- results in: "User%2FLogin%3FTest" -->
 *
 * @param {unknown} str - The string to escape from test data or CTRF report.
 * @returns {string} Escaped string for use in URLs or test report links.
 *
 *  Use this helper to escape file paths or test names for safe URL usage in CTRF reports.
 */
export const escapeUrlHelper: Helper = {
	name: "escapeUrl",
	category: "URL",
	fn: (str: unknown) => {
		if (typeof str !== "string") return "";
		return encodeURI(str);
	},
};

/**
 * Decode a Uniform Resource Identifier (URI) component.
 *
 * @example
 * {{decodeURIComponent encodedName}}
 * <!-- given encodedName = "User%20Login%20Test" -->
 * <!-- results in: "User Login Test" -->
 *
 * @param {unknown} str - The encoded string from test data or CTRF report.
 * @returns {string} The decoded string for display in test reports.
 *
 *  Use this helper to display decoded test names or suite names from URLs in CTRF HTML reports.
 */
export const decodeURIComponentHelper: Helper = {
	name: "decodeURIComponent",
	category: "URL",
	fn: (str: unknown) => {
		if (typeof str !== "string") return "";
		try {
			return decodeURIComponent(str);
		} catch {
			return str;
		}
	},
};

/**
 * Take a base URL and a href URL, and resolve them as a browser would for an anchor tag.
 *
 * @example
 * {{resolveUrl baseUrl href}}
 * <!-- baseUrl = "https://example.com/tests/", href = "../report.html" -->
 * <!-- results in: "https://example.com/report.html" -->
 *
 * @param {unknown} base - The base URL (e.g., test report root).
 * @param {unknown} href - The href to resolve (e.g., relative path to resource).
 * @returns {string} The resolved URL for use in test report links.
 *
 *  Use this helper to generate absolute links to test artifacts in CTRF HTML reports.
 */
export const resolveUrlHelper: Helper = {
	name: "resolveUrl",
	category: "URL",
	fn: (base: unknown, href: unknown) => {
		if (typeof base !== "string" || typeof href !== "string") return "";
		try {
			return new URL(href, base).toString();
		} catch {
			return href;
		}
	},
};

/**
 * Strip the query string from the given URL.
 *
 * @example
 * {{stripQueryString url}}
 * <!-- url = "https://example.com/test?run=123" -->
 * <!-- results in: "https://example.com/test" -->
 *
 * @param {unknown} url - The URL to strip query string from.
 * @returns {string} The URL without the query string, for clean display in test reports.
 *
 *  Use this helper to display clean URLs in CTRF HTML reports, omitting query parameters.
 */
export const stripQueryStringHelper: Helper = {
	name: "stripQueryString",
	category: "URL",
	fn: (url: unknown) => {
		if (typeof url !== "string") return "";
		const idx = url.indexOf("?");
		return idx === -1 ? url : url.slice(0, idx);
	},
};

/**
 * Strip protocol from a URL. Useful for displaying media that may have an 'http' protocol on secure connections.
 *
 * @example
 * <!-- url = 'http://foo.bar' -->
 * {{stripProtocol url}}
 * <!-- results in: '//foo.bar' -->
 *
 * @param {unknown} str - The URL string to strip protocol from.
 * @returns {string} The URL with http/https protocol stripped, for use in test report links.
 *
 *  Use this helper to display protocol-relative URLs in CTRF HTML reports for compatibility with both http and https.
 */
export const stripProtocolHelper: Helper = {
	name: "stripProtocol",
	category: "URL",
	fn: (str: unknown) => {
		if (typeof str !== "string") return "";
		return str.replace(/^(https?:)/, "");
	},
};

export const urlHelpers: Helper[] = [
	encodeURIComponentHelper,
	escapeUrlHelper,
	decodeURIComponentHelper,
	resolveUrlHelper,
	stripQueryStringHelper,
	stripProtocolHelper,
];
