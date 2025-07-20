import type { Helper } from "../helper-registry";

/**
 * Returns either the `singular` or `plural` inflection of a word based on
 * the given `count`. Optionally includes the count in the result.
 * Useful for displaying test counts, result summaries, and dynamic messaging in test reports.
 *
 * @example
 * {{inflect tests.passed.length "test" "tests"}}
 * <!-- if 1 passed test: "test" -->
 * <!-- if 5 passed tests: "tests" -->
 *
 * {{inflect tests.failed.length "failure" "failures" true}}
 * <!-- if 0 failures: "0 failures" -->
 * <!-- if 1 failure: "1 failure" -->
 * <!-- if 3 failures: "3 failures" -->
 *
 * {{inflect suite.testCount "case" "cases" true}} found in {{suite.name}}
 * <!-- results in: "5 cases found in Login Suite" -->
 *
 * Use in CTRF templates for dynamic test result messaging:
 * - Test count summaries: "{{inflect total "test" "tests" true}} executed"
 * - Error reporting: "{{inflect errors.length "error" "errors"}} detected"
 * - Suite descriptions: "{{inflect suite.tests.length "test case" "test cases"}}"
 *
 * @param {unknown} count - The count to determine singular/plural form.
 * @param {unknown} singular - The singular form of the word.
 * @param {unknown} plural - The plural form of the word.
 * @param {unknown} includeCount - Optional. If true, includes the count in the result.
 * @returns {string} The appropriate singular/plural form for use in test reports.
 */
export const inflectHelper: Helper = {
	name: "inflect",
	category: "Inflection",
	fn: (
		count: unknown,
		singular: unknown,
		plural: unknown,
		includeCount: unknown = false,
	) => {
		// Convert count to number
		let numericCount: number;
		if (typeof count === "number") {
			numericCount = count;
		} else if (typeof count === "string") {
			numericCount = parseInt(count, 10);
			if (Number.isNaN(numericCount)) {
				return "";
			}
		} else {
			return "";
		}

		// Validate singular and plural forms
		if (typeof singular !== "string" || typeof plural !== "string") {
			return "";
		}

		// Determine the appropriate form
		const word = numericCount === 1 ? singular : plural;

		// Check if count should be included
		const shouldIncludeCount = includeCount === true || includeCount === "true";

		return shouldIncludeCount ? `${numericCount} ${word}` : word;
	},
};

/**
 * Returns an ordinalized number as a string (1st, 2nd, 3rd, etc.).
 * Useful for ranking test results, iteration counts, and positional information in test reports.
 *
 * @example
 * {{ordinalize test.attempt}}
 * <!-- if attempt is 1: "1st" -->
 * <!-- if attempt is 2: "2nd" -->
 * <!-- if attempt is 3: "3rd" -->
 *
 * {{ordinalize suite.position}} test suite in the execution order
 * <!-- results in: "3rd test suite in the execution order" -->
 *
 * This is the {{ordinalize test.retry}} retry of {{test.name}}
 * <!-- results in: "This is the 2nd retry of Login Test" -->
 *
 * Use in CTRF templates for:
 * - Test execution order: "{{ordinalize index}} test executed"
 * - Retry information: "{{ordinalize retryCount}} attempt"
 * - Suite positioning: "{{ordinalize position}} suite in batch"
 * - Ranking results: "{{ordinalize rank}} fastest test"
 *
 * @param {unknown} val - The number to ordinalize (can be string or number).
 * @returns {string} The ordinalized number for use in test reports.
 */
export const ordinalizeHelper: Helper = {
	name: "ordinalize",
	category: "Inflection",
	fn: (val: unknown) => {
		// Convert to number
		let num: number;
		if (typeof val === "number") {
			num = Math.trunc(val); // Truncate decimal part
		} else if (typeof val === "string") {
			num = parseInt(val, 10);
			if (Number.isNaN(num)) {
				return "";
			}
		} else {
			return "";
		}

		// Handle negative numbers by taking absolute value
		const absNum = Math.abs(num);

		// Determine the appropriate suffix
		const lastDigit = absNum % 10;
		const secondLastDigit = Math.floor(absNum / 10) % 10;

		// Special cases for 11th, 12th, 13th
		if (secondLastDigit === 1) {
			return `${num}th`;
		}

		// Regular cases
		switch (lastDigit) {
			case 1:
				return `${num}st`;
			case 2:
				return `${num}nd`;
			case 3:
				return `${num}rd`;
			default:
				return `${num}th`;
		}
	},
};

export const inflectionHelpers: Helper[] = [inflectHelper, ordinalizeHelper];
