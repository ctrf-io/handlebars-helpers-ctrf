import type { Helper } from "../helper-registry.js";

/**
 * Convert the given string to a regular expression.
 *
 * @example
 * {{toRegex "foo"}}
 * <!-- results in: /foo/ -->
 *
 * {{#if (test test.name (toRegex "^Login"))}}
 *   <!-- Only show for tests whose name starts with 'Login' -->
 * {{/if}}
 *
 * Use with CTRF templates to dynamically filter or highlight test names, error messages, or log lines that match a pattern.
 *
 * @param {unknown} str - The string pattern to convert to a RegExp (from test data or template input).
 * @returns {RegExp|null} The RegExp object for use in test reporting, or null if input is invalid.
 */
export const toRegexHelper: Helper = {
	name: "toRegex",
	category: "Regex",
	fn: (str: unknown) => {
		if (typeof str !== "string") {
			return null;
		}
		try {
			return new RegExp(str);
		} catch (_e) {
			return null;
		}
	},
};

/**
 * Returns true if the given `str` matches the given regex. A regex can
 * be passed on the context, or using the [toRegex](#toregex) helper as a subexpression.
 *
 * @example
 * {{test "bar" (toRegex "foo")}}
 * <!-- results in: false -->
 * {{test "foobar" (toRegex "foo")}}
 * <!-- results in: true -->
 * {{test "foobar" (toRegex "^foo$")}}
 * <!-- results in: false -->
 *
 * {{#if (test test.error (toRegex "timeout"))}}
 *   <!-- Highlight tests with timeout errors in CTRF reports -->
 * {{/if}}
 *
 * Use with CTRF templates to conditionally render sections, highlight failures, or group tests by matching patterns in names, errors, or logs.
 *
 * @param {unknown} str - The string to test (from test data).
 * @param {unknown} regex - The RegExp to test against (from toRegex or context).
 * @returns {boolean} True if the string matches the regex, false otherwise.
 */
export const testHelper: Helper = {
	name: "test",
	category: "Regex",
	fn: (str: unknown, regex: unknown) => {
		if (typeof str !== "string" || !(regex instanceof RegExp)) {
			return false;
		}
		return regex.test(str);
	},
};

/**
 * Suggestion: Use {{test someString (toRegex "pattern")}} in your CTRF Handlebars templates to filter or highlight test results based on dynamic patterns.
 */

export const regexHelpers: Helper[] = [toRegexHelper, testHelper];
