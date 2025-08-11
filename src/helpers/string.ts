// @ts-ignore - ansi-to-html doesn't have type definitions
import Convert from "ansi-to-html";
import type { Helper } from "../helper-registry";

/**
 * Append the specified `suffix` to the given string.
 *
 * @example
 * {{append test.name " [FLAKY]"}}
 * <!-- given that "test.name" is "Login Test" -->
 * <!-- results in: "Login Test [FLAKY]" -->
 *
 * {{append test.suite.name "."}}{{append test.name ".log"}}
 * <!-- results in: "AuthSuite.Login Test.log" -->
 *
 * @param {unknown} str - The base string from test data.
 * @param {unknown} suffix - The suffix to append (e.g., status, file extension, identifier).
 * @returns {string} The concatenated string for use in test reports.
 */
export const appendHelper: Helper = {
	name: "append",
	category: "String",
	fn: (str: unknown, suffix: unknown) => {
		if (typeof str !== "string" || typeof suffix !== "string") {
			return "";
		}
		return str + suffix;
	},
};

/**
 * Convert the given string to camelCase format.
 * Useful for creating consistent property names, test identifiers, or file naming conventions in test reports.
 *
 * @example
 * {{camelcase "User Login Test"}}
 * <!-- given that test name is "User Login Test" -->
 * <!-- results in: "userLoginTest" -->
 *
 * {{camelcase test.suite.name}}
 * <!-- converts "Database Connection Suite" to "databaseConnectionSuite" -->
 *
 * @param {unknown} str - The string from test data to convert to camelCase.
 * @returns {string} The camelCased string for use in test reports and identifiers.
 */
export const camelCaseHelper: Helper = {
	name: "camelcase",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}

		// Remove leading/trailing whitespace and split by word boundaries (spaces, punctuation, etc.)
		return str
			.trim()
			.split(/[\s\-_.@#$%^&*()+=[\]{}|\\:";'<>?,/~`!]+/)
			.filter((word) => word.length > 0)
			.map((word, index) => {
				// First word is lowercase, subsequent words are capitalized
				if (index === 0) {
					return word.toLowerCase();
				}
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			})
			.join("");
	},
};

/**
 * Capitalize the first word in a sentence.
 * Useful for formatting test names, suite descriptions, and error messages in test reports.
 *
 * @example
 * {{capitalize test.name}}
 * <!-- given that test.name is "user authentication should work" -->
 * <!-- results in: "User authentication should work" -->
 *
 * {{capitalize test.suite.name}}
 * <!-- given that suite.name is "integration tests" -->
 * <!-- results in: "Integration tests" -->
 *
 * @param {unknown} str - The string from test data to capitalize.
 * @returns {string} The string with the first character capitalized for use in test reports.
 */
export const capitalizeHelper: Helper = {
	name: "capitalize",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string" || str.length === 0) {
			return "";
		}
		return str.charAt(0).toUpperCase() + str.slice(1);
	},
};

/**
 * Capitalize all words in a string.
 * Useful for formatting test suite titles, section headers, and display names in test reports.
 *
 * @example
 * {{capitalizeAll test.suite.name}}
 * <!-- given that suite.name is "user authentication tests" -->
 * <!-- results in: "User Authentication Tests" -->
 *
 * {{capitalizeAll "api endpoint validation"}}
 * <!-- results in: "Api Endpoint Validation" -->
 *
 * @param {unknown} str - The string from test data to capitalize all words.
 * @returns {string} The string with all words capitalized for use in test reports.
 */
export const capitalizeAllHelper: Helper = {
	name: "capitalizeAll",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str.replace(
			/(^|[\s\-_.])(\w)/g,
			(_match, separator, char) => separator + char.toUpperCase(),
		);
	},
};

/**
 * Center a string using non-breaking spaces.
 * Useful for formatting test report headers, status indicators, and table columns.
 *
 * @example
 * {{center test.status "20"}}
 * <!-- given that test.status is "PASSED" -->
 * <!-- results in: "       PASSED        " (centered in 20 characters) -->
 *
 * {{center "Test Results" "30"}}
 * <!-- results in: "         Test Results          " -->
 *
 * @param {unknown} str - The string from test data to center.
 * @param {unknown} spaces - The total width for centering.
 * @returns {string} The centered string for use in test reports.
 */
export const centerHelper: Helper = {
	name: "center",
	category: "String",
	fn: (str: unknown, spaces: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		if (typeof spaces !== "string") {
			return str;
		}

		const width = parseInt(spaces, 10);
		if (Number.isNaN(width) || width <= 0) {
			return str;
		}

		if (str.length >= width) {
			return str;
		}

		const padding = width - str.length;
		const leftPadding = Math.floor(padding / 2);
		const rightPadding = padding - leftPadding;

		return "\u00A0".repeat(leftPadding) + str + "\u00A0".repeat(rightPadding);
	},
};

/**
 * Remove both extraneous whitespace and non-word characters from the beginning and end of a string.
 * Useful for cleaning test names, error messages, and file paths in test reports.
 *
 * @example
 * {{chop " __Test Name__ "}}
 * <!-- results in: "Test Name" -->
 *
 * {{chop "---API-Test---"}}
 * <!-- results in: "API-Test" -->
 *
 * {{chop test.name}}
 * <!-- cleans test names of extra formatting characters -->
 *
 * @param {unknown} str - The string from test data to clean.
 * @returns {string} The cleaned string for use in test reports.
 */
export const chopHelper: Helper = {
	name: "chop",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		// Remove whitespace and common punctuation from edges, but preserve braces and other meaningful chars
		return str.replace(
			/^[\s_\-=!@#$%^&*()+=[\]|\\:";'<>?,./~`]+|[\s_\-=!@#$%^&*()+=[\]|\\:";'<>?,./~`]+$/g,
			"",
		);
	},
};

/**
 * Convert characters to dash-case (kebab-case).
 * Useful for creating URL-friendly test identifiers, file names, and CSS classes in test reports.
 *
 * @example
 * {{dashcase "User Login Test"}}
 * <!-- results in: "user-login-test" -->
 *
 * {{dashcase test.suite.name}}
 * <!-- converts "API Endpoint Tests" to "api-endpoint-tests" -->
 *
 * {{dashcase "Database_Connection Test"}}
 * <!-- results in: "database-connection-test" -->
 *
 * @param {unknown} str - The string from test data to convert to dash-case.
 * @returns {string} The dash-cased string for use in test reports and identifiers.
 */
export const dashCaseHelper: Helper = {
	name: "dashcase",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str
			.trim()
			.toLowerCase()
			.replace(/[\s_.]+/g, "-")
			.replace(/[^\w-]/g, "")
			.replace(/-+/g, "-")
			.replace(/^-+|-+$/g, "");
	},
};

/**
 * Convert characters to dot.case format.
 * Useful for creating property paths, configuration keys, and structured identifiers in test reports.
 *
 * @example
 * {{dotcase "User Login Test"}}
 * <!-- results in: "user.login.test" -->
 *
 * {{dotcase test.suite.name}}
 * <!-- converts "API Endpoint Tests" to "api.endpoint.tests" -->
 *
 * {{dotcase "Database_Connection-Test"}}
 * <!-- results in: "database.connection.test" -->
 *
 * @param {unknown} str - The string from test data to convert to dot.case.
 * @returns {string} The dot.cased string for use in test reports and identifiers.
 */
export const dotCaseHelper: Helper = {
	name: "dotcase",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str
			.trim()
			.toLowerCase()
			.replace(/[\s_-]+/g, ".")
			.replace(/[^\w.]/g, "")
			.replace(/\.+/g, ".")
			.replace(/^\.+|\.+$/g, "");
	},
};

/**
 * Convert all characters to lowercase.
 * Useful for normalizing test names, tags, and identifiers in test reports.
 *
 * @example
 * {{downcase test.status}}
 * <!-- converts "PASSED" to "passed" -->
 *
 * {{downcase "API ENDPOINT TEST"}}
 * <!-- results in: "api endpoint test" -->
 *
 * {{downcase test.suite.name}}
 * <!-- normalizes suite names to lowercase -->
 *
 * @param {unknown} str - The string from test data to convert to lowercase.
 * @returns {string} The lowercased string for use in test reports.
 */
export const downCaseHelper: Helper = {
	name: "downcase",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str.toLowerCase();
	},
};

/**
 * Truncate a string to the specified length and append an ellipsis (…).
 * Useful for creating summary views and limiting long test names or messages in test reports.
 *
 * @example
 * {{ellipsis test.name "20"}}
 * <!-- given long test name "User Authentication Integration Test" -->
 * <!-- results in: "User Authentication…" -->
 *
 * {{ellipsis test.message "50"}}
 * <!-- truncates error messages for display in tables -->
 *
 * @param {unknown} str - The string from test data to truncate.
 * @param {unknown} length - The maximum length before truncation.
 * @returns {string} The truncated string with ellipsis for use in test reports.
 */
export const ellipsisHelper: Helper = {
	name: "ellipsis",
	category: "String",
	fn: (str: unknown, length: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		if (typeof length !== "string") {
			return str;
		}

		const maxLength = parseInt(length, 10);
		if (Number.isNaN(maxLength) || maxLength <= 0) {
			return str;
		}

		if (str.length <= maxLength) {
			return str;
		}

		return `${str.slice(0, maxLength - 1)}…`;
	},
};

/**
 * Replace spaces in a string with hyphens.
 * Useful for creating URL-friendly identifiers and file names in test reports.
 *
 * @example
 * {{hyphenate test.name}}
 * <!-- converts "User Login Test" to "User-Login-Test" -->
 *
 * {{hyphenate test.suite.name}}
 * <!-- converts "API Endpoint Tests" to "API-Endpoint-Tests" -->
 *
 * @param {unknown} str - The string from test data to hyphenate.
 * @returns {string} The hyphenated string for use in test reports.
 */
export const hyphenateHelper: Helper = {
	name: "hyphenate",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str.replace(/\s/g, "-");
	},
};

/**
 * Return true if the value is a string.
 * Useful for conditional logic and validation in test report templates.
 *
 * @example
 * {{#if (isString test.name)}}
 *   Test: {{test.name}}
 * {{/if}}
 *
 * {{isString test.status}}
 * <!-- results in: true -->
 *
 * @param {unknown} value - The value from test data to check.
 * @returns {boolean} True if the value is a string for use in test reports.
 */
export const isStringHelper: Helper = {
	name: "isString",
	category: "String",
	fn: (value: unknown) => {
		return typeof value === "string";
	},
};

/**
 * Convert all characters to lowercase.
 * Useful for normalizing test names, tags, and identifiers in test reports.
 *
 * @example
 * {{lowercase test.status}}
 * <!-- converts "PASSED" to "passed" -->
 *
 * {{lowercase "API ENDPOINT TEST"}}
 * <!-- results in: "api endpoint test" -->
 *
 * {{lowercase test.suite.name}}
 * <!-- normalizes suite names to lowercase -->
 *
 * @param {unknown} str - The string from test data to convert to lowercase.
 * @returns {string} The lowercased string for use in test reports.
 */
export const lowerCaseHelper: Helper = {
	name: "lowercase",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str.toLowerCase();
	},
};

/**
 * Count the number of occurrences of a substring within a string.
 * Useful for analyzing test patterns, counting failures, or frequency analysis in test reports.
 *
 * @example
 * {{occurrences test.name "API"}}
 * <!-- counts how many times "API" appears in test name -->
 *
 * {{occurrences test.message "error"}}
 * <!-- counts error occurrences in test messages -->
 *
 * @param {unknown} str - The string from test data to search in.
 * @param {unknown} substring - The substring to count occurrences of.
 * @returns {number} The number of occurrences for use in test reports.
 */
export const occurrencesHelper: Helper = {
	name: "occurrences",
	category: "String",
	fn: (str: unknown, substring: unknown) => {
		if (
			typeof str !== "string" ||
			typeof substring !== "string" ||
			!substring
		) {
			return 0;
		}

		let count = 0;
		let position = 0;

		while (true) {
			position = str.indexOf(substring, position);
			if (position === -1) {
				break;
			}
			count++;
			position += 1; // Move by 1 to allow overlapping matches
		}

		return count;
	},
};

/**
 * Convert string to PascalCase format.
 * Useful for creating class names, component names, and identifiers in test reports.
 *
 * @example
 * {{pascalcase "user login test"}}
 * <!-- results in: "UserLoginTest" -->
 *
 * {{pascalcase test.suite.name}}
 * <!-- converts "API endpoint tests" to "ApiEndpointTests" -->
 *
 * @param {unknown} str - The string from test data to convert to PascalCase.
 * @returns {string} The PascalCased string for use in test reports.
 */
export const pascalCaseHelper: Helper = {
	name: "pascalcase",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}

		return str
			.trim()
			.split(/[\s\-_.@#$%^&*()+=[\]{}|\\:";'<>?,/~`!]+/)
			.filter((word) => word.length > 0)
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join("");
	},
};

/**
 * Convert string to path/case format using forward slashes.
 * Useful for creating file paths, URL paths, and hierarchical identifiers in test reports.
 *
 * @example
 * {{pathcase "User Login Test"}}
 * <!-- results in: "user/login/test" -->
 *
 * {{pathcase test.suite.name}}
 * <!-- converts "API Endpoint Tests" to "api/endpoint/tests" -->
 *
 * @param {unknown} str - The string from test data to convert to path/case.
 * @returns {string} The path/cased string for use in test reports.
 */
export const pathCaseHelper: Helper = {
	name: "pathcase",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str
			.trim()
			.toLowerCase()
			.replace(/[\s_-]+/g, "/")
			.replace(/[^\w/]/g, "")
			.replace(/\/+/g, "/")
			.replace(/^\/+|\/+$/g, "");
	},
};

/**
 * Replace spaces in the given string with pluses.
 * Useful for creating URL-safe query parameters and encoded test identifiers in test reports.
 *
 * @example
 * {{plusify test.name}}
 * <!-- converts "User Login Test" to "User+Login+Test" -->
 *
 * {{plusify "API Endpoint Test"}}
 * <!-- results in: "API+Endpoint+Test" -->
 *
 * @param {unknown} str - The string from test data to convert spaces to pluses.
 * @returns {string} The string with spaces replaced by plus signs for use in test reports.
 */
export const plusifyHelper: Helper = {
	name: "plusify",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str.replace(/\s/g, "+");
	},
};

/**
 * Prepend the given string with the specified prefix.
 * Useful for adding status indicators, test categories, or formatting in test reports.
 *
 * @example
 * {{prepend test.name "✓ "}}
 * <!-- given that test.name is "User Login" -->
 * <!-- results in: "✓ User Login" -->
 *
 * {{prepend test.status "Status: "}}
 * <!-- results in: "Status: PASSED" -->
 *
 * @param {unknown} str - The base string from test data.
 * @param {unknown} prefix - The prefix to prepend (e.g., status, category, icon).
 * @returns {string} The prefixed string for use in test reports.
 */
export const prependHelper: Helper = {
	name: "prepend",
	category: "String",
	fn: (str: unknown, prefix: unknown) => {
		if (typeof str !== "string" || typeof prefix !== "string") {
			return "";
		}
		return prefix + str;
	},
};

/**
 * Render a block without processing Handlebars templates inside the block.
 * Useful for displaying raw template code or examples in test documentation.
 *
 * @example
 * {{{{#raw}}}}
 * {{test.name}} - {{test.status}}
 * {{{{/raw}}}}
 * <!-- results in: "{{test.name}} - {{test.status}}" -->
 *
 * @param {Object} options - Handlebars options object.
 * @returns {string} The raw content without template processing.
 */
export const rawHelper: Helper = {
	name: "raw",
	category: "String",
	fn: function (this: unknown, options: unknown) {
		if (
			typeof options === "object" &&
			options !== null &&
			"fn" in options &&
			typeof options.fn === "function"
		) {
			return options.fn();
		}
		return "";
	},
};

/**
 * Remove all occurrences of substring from the given string.
 * Useful for cleaning test names, removing unwanted characters, or filtering content in test reports.
 *
 * @example
 * {{remove test.name "_test"}}
 * <!-- removes all "_test" occurrences from test names -->
 *
 * {{remove "User_Login_Test_Suite" "_"}}
 * <!-- results in: "UserLoginTestSuite" -->
 *
 * @param {unknown} str - The string from test data to process.
 * @param {unknown} substring - The substring to remove from the string.
 * @returns {string} The string with all occurrences removed for use in test reports.
 */
export const removeHelper: Helper = {
	name: "remove",
	category: "String",
	fn: (str: unknown, substring: unknown) => {
		if (typeof str !== "string" || typeof substring !== "string") {
			return "";
		}
		return str.split(substring).join("");
	},
};

/**
 * Remove the first occurrence of substring from the given string.
 * Useful for cleaning test prefixes or removing specific patterns in test reports.
 *
 * @example
 * {{removeFirst test.name "test_"}}
 * <!-- removes only the first "test_" from test names -->
 *
 * {{removeFirst "API_Test_API_Suite" "API_"}}
 * <!-- results in: "Test_API_Suite" -->
 *
 * @param {unknown} str - The string from test data to process.
 * @param {unknown} substring - The substring to remove (first occurrence only).
 * @returns {string} The string with first occurrence removed for use in test reports.
 */
export const removeFirstHelper: Helper = {
	name: "removeFirst",
	category: "String",
	fn: (str: unknown, substring: unknown) => {
		if (typeof str !== "string" || typeof substring !== "string") {
			return "";
		}
		const index = str.indexOf(substring);
		if (index === -1) {
			return str;
		}
		return str.slice(0, index) + str.slice(index + substring.length);
	},
};

/**
 * Replace all occurrences of substring a with substring b.
 * Useful for normalizing test data, fixing formatting, or transforming content in test reports.
 *
 * @example
 * {{replace test.name "_" " "}}
 * <!-- converts "User_Login_Test" to "User Login Test" -->
 *
 * {{replace test.status "PASSED" "✓ PASSED"}}
 * <!-- adds checkmark to passed status -->
 *
 * @param {unknown} str - The string from test data to process.
 * @param {unknown} a - The substring to find and replace.
 * @param {unknown} b - The replacement substring.
 * @returns {string} The string with all replacements made for use in test reports.
 */
export const replaceHelper: Helper = {
	name: "replace",
	category: "String",
	fn: (str: unknown, a: unknown, b: unknown) => {
		if (
			typeof str !== "string" ||
			typeof a !== "string" ||
			typeof b !== "string"
		) {
			return "";
		}
		if (a === "") {
			return str;
		}
		return str.split(a).join(b);
	},
};

/**
 * Replace the first occurrence of substring a with substring b.
 * Useful for targeted replacements and formatting in test reports.
 *
 * @example
 * {{replaceFirst test.name "Test" "Suite"}}
 * <!-- converts "Test Login Test" to "Suite Login Test" -->
 *
 * {{replaceFirst test.message "Error:" "⚠️ Error:"}}
 * <!-- adds warning icon to first error -->
 *
 * @param {unknown} str - The string from test data to process.
 * @param {unknown} a - The substring to find and replace (first occurrence only).
 * @param {unknown} b - The replacement substring.
 * @returns {string} The string with first replacement made for use in test reports.
 */
export const replaceFirstHelper: Helper = {
	name: "replaceFirst",
	category: "String",
	fn: (str: unknown, a: unknown, b: unknown) => {
		if (
			typeof str !== "string" ||
			typeof a !== "string" ||
			typeof b !== "string"
		) {
			return "";
		}
		if (a === "") {
			return str;
		}
		const index = str.indexOf(a);
		if (index === -1) {
			return str;
		}
		return str.slice(0, index) + b + str.slice(index + a.length);
	},
};

/**
 * Reverse a string.
 * Useful for creating reversed views, debugging, or special formatting in test reports.
 *
 * @example
 * {{reverse test.name}}
 * <!-- converts "Login Test" to "tseT nigoL" -->
 *
 * {{reverse "API"}}
 * <!-- results in: "IPA" -->
 *
 * @param {unknown} str - The string from test data to reverse.
 * @returns {string} The reversed string for use in test reports.
 */
export const reverseHelper: Helper = {
	name: "reverse",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str.split("").reverse().join("");
	},
};

/**
 * Sentence case the given string - capitalize first letter of each sentence.
 * Useful for formatting test descriptions and error messages in test reports.
 *
 * @example
 * {{sentence "hello world. goodbye world."}}
 * <!-- results in: "Hello world. Goodbye world." -->
 *
 * {{sentence test.message}}
 * <!-- properly capitalizes error messages -->
 *
 * @param {unknown} str - The string from test data to convert to sentence case.
 * @returns {string} The sentence-cased string for use in test reports.
 */
export const sentenceHelper: Helper = {
	name: "sentence",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str.replace(
			/(^|[.!?]\s+)([a-z])/g,
			(_match, punctuation, letter) => punctuation + letter.toUpperCase(),
		);
	},
};

/**
 * Convert string to snake_case format.
 * Useful for creating database-friendly identifiers and consistent naming in test reports.
 *
 * @example
 * {{snakecase "User Login Test"}}
 * <!-- results in: "user_login_test" -->
 *
 * {{snakecase test.suite.name}}
 * <!-- converts "API Endpoint Tests" to "api_endpoint_tests" -->
 *
 * @param {unknown} str - The string from test data to convert to snake_case.
 * @returns {string} The snake_cased string for use in test reports.
 */
export const snakeCaseHelper: Helper = {
	name: "snakecase",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str
			.trim()
			.toLowerCase()
			.replace(/[\s\-.]+/g, "_")
			.replace(/[^\w_]/g, "")
			.replace(/_+/g, "_")
			.replace(/^_+|_+$/g, "");
	},
};

/**
 * Split string by the given character.
 * Useful for parsing test data, tags, or creating arrays from delimited strings in test reports.
 *
 * @example
 * {{split test.tags ","}}
 * <!-- splits "unit,integration,api" into ["unit", "integration", "api"] -->
 *
 * {{split test.name " "}}
 * <!-- splits test name into individual words -->
 *
 * @param {unknown} str - The string from test data to split.
 * @param {unknown} separator - The character or string to split by.
 * @returns {string[]} The array of split strings for use in test reports.
 */
export const splitHelper: Helper = {
	name: "split",
	category: "String",
	fn: (str: unknown, separator: unknown = "") => {
		if (typeof str !== "string") {
			return [];
		}
		if (typeof separator !== "string") {
			return [str];
		}
		return str.split(separator);
	},
};

/**
 * Splits the given text into an array of lines, omitting any empty lines.
 * Useful for processing multiline strings and iterating over each line in test reports.
 * Perfect for handling stack traces, error messages, or console output.
 *
 * @example
 * {{#each (splitLines test.error.stack)}}
 *   <div class="stack-line">{{this}}</div>
 * {{/each}}
 *
 * {{splitLines "Line one\n\nLine two\nLine three"}}
 * <!-- results in: ["Line one", "Line two", "Line three"] -->
 *
 * @param {unknown} str - The input string containing one or more lines.
 * @returns {string[]} An array of non-empty lines.
 *  Use to process multiline test output, stack traces, or error messages.
 */
export const splitLinesHelper: Helper = {
	name: "splitLines",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return [];
		}
		if (!str) {
			return [];
		}
		// Split by newlines and filter out empty/whitespace-only lines
		return str.split("\n").filter((line: string) => line.trim() !== "");
	},
};

/**
 * Extracts a section of a string and returns a new string based on start and end indices.
 * Useful for extracting portions of test IDs, commit hashes, or truncating strings to specific positions.
 *
 * @example
 * {{sliceString "d9a40a70dd26e3b309e9d106adaca2417d4ffb1e" 0 7}}
 * <!-- results in: "d9a40a7" -->
 *
 * {{sliceString test.commitHash 0 8}}
 * <!-- extracts first 8 characters of commit hash -->
 *
 * {{sliceString test.name 5}}
 * <!-- extracts from index 5 to end of string -->
 *
 * @param {unknown} str - The input string to slice.
 * @param {unknown} start - The index of the first character to include in the returned substring.
 * @param {unknown} end - Optional. The index of the first character to exclude from the returned substring.
 * @returns {string} A new string containing the extracted section.
 *  Use to extract specific portions of strings like IDs, hashes, or file paths.
 */
export const sliceStringHelper: Helper = {
	name: "sliceString",
	category: "String",
	fn: (str: unknown, start: unknown, end?: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		const startIdx =
			typeof start === "number" ? start : parseInt(String(start), 10) || 0;

		// If end is provided, use it; otherwise slice to end of string
		if (end !== undefined) {
			const endIdx =
				typeof end === "number" ? end : parseInt(String(end), 10) || str.length;
			return str.slice(startIdx, endIdx);
		}

		return str.slice(startIdx);
	},
};

/**
 * Test whether a string begins with the given prefix.
 * Useful for conditional logic and filtering in test report templates.
 *
 * @example
 * {{#if (startsWith test.name "API")}}
 *   🌐 {{test.name}}
 * {{else}}
 *   {{test.name}}
 * {{/if}}
 *
 * {{startsWith test.suite.name "Integration"}}
 * <!-- results in: true/false -->
 *
 * @param {unknown} str - The string from test data to check.
 * @param {unknown} prefix - The prefix to test for.
 * @returns {boolean} True if string starts with prefix for use in test reports.
 */
export const startsWithHelper: Helper = {
	name: "startsWith",
	category: "String",
	fn: (str: unknown, prefix: unknown) => {
		if (typeof str !== "string" || typeof prefix !== "string") {
			return false;
		}
		return str.startsWith(prefix);
	},
};

/**
 * Title case the given string - capitalize the first letter of each word.
 * Useful for formatting test suite names, section headers, and display titles in test reports.
 *
 * @example
 * {{titleize "this is title case"}}
 * <!-- results in: "This Is Title Case" -->
 *
 * {{titleize test.suite.name}}
 * <!-- converts "integration test suite" to "Integration Test Suite" -->
 *
 * @param {unknown} str - The string from test data to convert to title case.
 * @returns {string} The title-cased string for use in test reports.
 */
export const titleizeHelper: Helper = {
	name: "titleize",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str.replace(
			/\w\S*/g,
			(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
		);
	},
};

/**
 * Remove extraneous whitespace from the beginning and end of a string.
 * Useful for cleaning test data and normalizing input in test reports.
 *
 * @example
 * {{trim " User Login Test "}}
 * <!-- results in: "User Login Test" -->
 *
 * {{trim test.name}}
 * <!-- cleans whitespace from test names -->
 *
 * @param {unknown} str - The string from test data to trim.
 * @returns {string} The trimmed string for use in test reports.
 */
export const trimHelper: Helper = {
	name: "trim",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str.trim();
	},
};

/**
 * Remove extraneous whitespace from the beginning of a string.
 * Useful for cleaning left-aligned content and formatting in test reports.
 *
 * @example
 * {{trimLeft " User Login Test "}}
 * <!-- results in: "User Login Test " -->
 *
 * {{trimLeft test.name}}
 * <!-- removes leading whitespace from test names -->
 *
 * @param {unknown} str - The string from test data to left-trim.
 * @returns {string} The left-trimmed string for use in test reports.
 */
export const trimLeftHelper: Helper = {
	name: "trimLeft",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str.replace(/^\s+/, "");
	},
};

/**
 * Remove extraneous whitespace from the end of a string.
 * Useful for cleaning right-aligned content and formatting in test reports.
 *
 * @example
 * {{trimRight " User Login Test "}}
 * <!-- results in: " User Login Test" -->
 *
 * {{trimRight test.name}}
 * <!-- removes trailing whitespace from test names -->
 *
 * @param {unknown} str - The string from test data to right-trim.
 * @returns {string} The right-trimmed string for use in test reports.
 */
export const trimRightHelper: Helper = {
	name: "trimRight",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str.replace(/\s+$/, "");
	},
};

/**
 * Truncate a string to the specified length.
 * Useful for creating consistent layouts and limiting content length in test reports.
 *
 * @example
 * {{truncate test.name "15"}}
 * <!-- truncates long test names to 15 characters -->
 *
 * {{truncate test.message "50" "..."}}
 * <!-- truncates error messages with custom suffix -->
 *
 * @param {unknown} str - The string from test data to truncate.
 * @param {unknown} limit - The maximum length as a string.
 * @param {unknown} suffix - Optional suffix when truncated (defaults to "…").
 * @returns {string} The truncated string for use in test reports.
 */
export const truncateHelper: Helper = {
	name: "truncate",
	category: "String",
	fn: (str: unknown, limit: unknown, suffix: unknown = "…") => {
		if (typeof str !== "string") {
			return "";
		}
		if (typeof limit !== "string") {
			return str;
		}

		const maxLength = parseInt(limit, 10);
		if (Number.isNaN(maxLength) || maxLength <= 0) {
			return str;
		}

		if (str.length <= maxLength) {
			return str;
		}

		// Handle Handlebars options object - if suffix is not a string, use default
		const actualSuffix = typeof suffix === "string" ? suffix : "…";

		return str.slice(0, maxLength - actualSuffix.length) + actualSuffix;
	},
};

/**
 * Truncate a string to have the specified number of words.
 * Useful for creating word-limited summaries and previews in test reports.
 *
 * @example
 * {{truncateWords test.name "3"}}
 * <!-- truncates "User Login Integration Test Suite" to "User Login Integration..." -->
 *
 * {{truncateWords test.message "5" " [...]"}}
 * <!-- truncates error messages to 5 words with custom suffix -->
 *
 * @param {unknown} str - The string from test data to truncate.
 * @param {unknown} limit - The maximum number of words as a string.
 * @param {unknown} suffix - Optional suffix when truncated (defaults to "...").
 * @returns {string} The word-truncated string for use in test reports.
 */
export const truncateWordsHelper: Helper = {
	name: "truncateWords",
	category: "String",
	fn: (str: unknown, limit: unknown, suffix: unknown = "...") => {
		if (typeof str !== "string") {
			return "";
		}
		if (typeof limit !== "string") {
			return str;
		}

		const wordLimit = parseInt(limit, 10);
		if (Number.isNaN(wordLimit) || wordLimit <= 0) {
			return str;
		}

		const words = str.split(/\s+/);
		if (words.length <= wordLimit) {
			return str;
		}

		// Handle Handlebars options object - if suffix is not a string, use default
		const actualSuffix = typeof suffix === "string" ? suffix : "...";

		return words.slice(0, wordLimit).join(" ") + actualSuffix;
	},
};

/**
 * Uppercase all characters in the given string. Alias for uppercase.
 * Useful for creating emphasis, headers, and status indicators in test reports.
 *
 * @example
 * {{upcase test.status}}
 * <!-- converts "passed" to "PASSED" -->
 *
 * {{upcase "api test"}}
 * <!-- results in: "API TEST" -->
 *
 * @param {unknown} str - The string from test data to convert to uppercase.
 * @returns {string} The uppercased string for use in test reports.
 */
export const upcaseHelper: Helper = {
	name: "upcase",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str.toUpperCase();
	},
};

/**
 * Uppercase all characters in the given string.
 * Useful for creating emphasis, headers, and status indicators in test reports.
 *
 * @example
 * {{uppercase test.status}}
 * <!-- converts "passed" to "PASSED" -->
 *
 * {{uppercase "api endpoint test"}}
 * <!-- results in: "API ENDPOINT TEST" -->
 *
 * @param {unknown} str - The string from test data to convert to uppercase.
 * @returns {string} The uppercased string for use in test reports.
 */
export const uppercaseHelper: Helper = {
	name: "uppercase",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		return str.toUpperCase();
	},
};

/**
 * Escapes special Markdown characters in the given string.
 * This is useful to ensure that characters like `*`, `_`, `(`, `)`, etc.
 * don't inadvertently format the output as Markdown in test reports or documentation.
 *
 * @example
 * {{escapeMarkdown "Hello *world*"}}
 * <!-- results in: "Hello \\*world\\*" -->
 *
 * {{escapeMarkdown test.name}}
 * <!-- given that test.name is "test_[important]_case" -->
 * <!-- results in: "test\\_\\[important\\]\\_case" -->
 *
 * @param {unknown} str - The input string containing potential Markdown characters.
 * @returns {string} The string with Markdown characters escaped.
 *  Use to safely display test names, file paths, or error messages in Markdown.
 */
export const escapeMarkdownHelper: Helper = {
	name: "escapeMarkdown",
	category: "String",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return "";
		}
		// Escape Markdown special characters: \ * _ { } [ ] ( ) # + - . !
		return str.replace(/([\\*_{}[\]()#+\-.!])/g, "\\$1");
	},
};

/**
 * Strips ANSI escape codes from the given message.
 *
 * @example
 * {{stripAnsi "Hello \u001b[31mRed\u001b[0m"}}
 * Returns: "Hello Red"
 *
 * @param {unknown} message - The string potentially containing ANSI escape codes.
 * @returns {string} The string with all ANSI escape codes removed.
 */
export const stripAnsiHelper: Helper = {
	name: "stripAnsi",
	category: "String",
	fn: (message: unknown) => {
		if (typeof message !== "string") {
			return "";
		}
		return stripAnsi(message);
	},
};

/**
 * Strips ANSI escape codes from a given string.
 *
 * @param message - The string from which ANSI escape codes will be removed.
 * @returns The string with ANSI escape codes removed.
 * @throws {TypeError} If the input is not a string.
 */
export function stripAnsi(message: string): string {
	if (typeof message !== "string") {
		throw new TypeError(`Expected a \`string\`, got \`${typeof message}\``);
	}

	return message.replace(ansiRegex(), "");
}

/**
 * Returns a regular expression for matching ANSI escape codes.
 *
 * @param options - An optional object specifying whether to match only the first occurrence.
 * @param options.onlyFirst - If true, matches only the first occurrence of an ANSI code.
 * @returns A regular expression for matching ANSI escape codes.
 */
export function ansiRegex({ onlyFirst = false } = {}): RegExp {
	const pattern = [
		"[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
		"(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
	].join("|");

	return new RegExp(pattern, onlyFirst ? undefined : "g");
}

/**
 * Converts ANSI escape codes in the given message to HTML.
 * This is useful for displaying colorized console output in a browser.
 *
 * @example
 * {{ansiToHtml "Hello \u001b[31mRed\u001b[0m"}}
 * Returns: "Hello <span style=\"color:#A00\">Red</span>"
 *
 * @param {unknown} message - The ANSI-colored string.
 * @returns {string} An HTML-formatted string reflecting the original ANSI colors.
 */
export const ansiToHtmlHelper: Helper = {
	name: "ansiToHtml",
	category: "String",
	fn: (message: unknown) => {
		if (typeof message !== "string") {
			return "";
		}
		const convert = new Convert();
		return convert.toHtml(message);
	},
};

export const stringHelpers: Helper[] = [
	ansiToHtmlHelper,
	appendHelper,
	camelCaseHelper,
	capitalizeHelper,
	capitalizeAllHelper,
	centerHelper,
	chopHelper,
	dashCaseHelper,
	dotCaseHelper,
	downCaseHelper,
	ellipsisHelper,
	escapeMarkdownHelper,
	hyphenateHelper,
	isStringHelper,
	lowerCaseHelper,
	occurrencesHelper,
	pascalCaseHelper,
	pathCaseHelper,
	plusifyHelper,
	prependHelper,
	rawHelper,
	removeHelper,
	removeFirstHelper,
	replaceHelper,
	replaceFirstHelper,
	reverseHelper,
	sentenceHelper,
	sliceStringHelper,
	snakeCaseHelper,
	splitHelper,
	splitLinesHelper,
	startsWithHelper,
	stripAnsiHelper,
	titleizeHelper,
	trimHelper,
	trimLeftHelper,
	trimRightHelper,
	truncateHelper,
	truncateWordsHelper,
	upcaseHelper,
	uppercaseHelper,
];
