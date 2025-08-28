// @ts-ignore - ansi-to-html doesn't have type definitions
import Convert from "ansi-to-html";
import type { Test } from "ctrf";
import type { Helper } from "../helper-registry.js";

/**
 * Sorts tests by their failure rate in descending order, showing the most unreliable tests first.
 *
 * @example
 * Most Unreliable Tests:
 * {{#each (sortTestsByFailRate tests)}}
 *   {{this.name}} - Fail Rate: {{this.insights.failRate.current}}%
 * {{/each}}
 *
 * @param {unknown} tests - An array of Test objects from CTRF report.
 * @returns {Test[]} A sorted array of tests that have a fail rate, from highest to lowest.
 */
export const sortTestsByFailRateHelper: Helper = {
	name: "sortTestsByFailRate",
	category: "CTRF",
	fn: (tests: unknown) => {
		if (!Array.isArray(tests)) {
			return [];
		}

		const testsCopy = tests.slice();

		const failedTests = testsCopy.filter(
			(test) =>
				typeof test === "object" &&
				test !== null &&
				"insights" in test &&
				test.insights &&
				typeof test.insights === "object" &&
				test.insights !== null &&
				"failRate" in test.insights &&
				test.insights.failRate &&
				typeof test.insights.failRate === "object" &&
				test.insights.failRate !== null &&
				"current" in test.insights.failRate &&
				typeof test.insights.failRate.current === "number" &&
				test.insights.failRate.current > 0,
		);

		failedTests.sort((a, b) => {
			const aRate =
				typeof a === "object" &&
				a !== null &&
				"insights" in a &&
				a.insights &&
				typeof a.insights === "object" &&
				a.insights !== null &&
				"failRate" in a.insights &&
				a.insights.failRate &&
				typeof a.insights.failRate === "object" &&
				a.insights.failRate !== null &&
				"current" in a.insights.failRate &&
				typeof a.insights.failRate.current === "number"
					? a.insights.failRate.current
					: 0;
			const bRate =
				typeof b === "object" &&
				b !== null &&
				"insights" in b &&
				b.insights &&
				typeof b.insights === "object" &&
				b.insights !== null &&
				"failRate" in b.insights &&
				b.insights.failRate &&
				typeof b.insights.failRate === "object" &&
				b.insights.failRate !== null &&
				"current" in b.insights.failRate &&
				typeof b.insights.failRate.current === "number"
					? b.insights.failRate.current
					: 0;
			return bRate - aRate;
		});

		return failedTests as Test[];
	},
};

/**
 * Sorts tests by their flaky rate in descending order, showing the most flaky tests first.
 *
 * @example
 * Most Flaky Tests:
 * {{#each (sortTestsByFlakyRate tests)}}
 *   {{this.name}} - Flaky Rate: {{this.insights.flakyRate.current}}%
 * {{/each}}
 *
 * @param {unknown} tests - An array of Test objects from CTRF report.
 * @returns {Test[]} A sorted array of tests that have a flaky rate, from highest to lowest.
 */
export const sortTestsByFlakyRateHelper: Helper = {
	name: "sortTestsByFlakyRate",
	category: "CTRF",
	fn: (tests: unknown) => {
		if (!Array.isArray(tests)) {
			return [];
		}

		const testsCopy = tests.slice();

		const flakyTests = testsCopy.filter(
			(test) =>
				typeof test === "object" &&
				test !== null &&
				"insights" in test &&
				test.insights &&
				typeof test.insights === "object" &&
				test.insights !== null &&
				"flakyRate" in test.insights &&
				test.insights.flakyRate &&
				typeof test.insights.flakyRate === "object" &&
				test.insights.flakyRate !== null &&
				"current" in test.insights.flakyRate &&
				typeof test.insights.flakyRate.current === "number" &&
				test.insights.flakyRate.current > 0,
		);

		flakyTests.sort((a, b) => {
			const aRate =
				typeof a === "object" &&
				a !== null &&
				"insights" in a &&
				a.insights &&
				typeof a.insights === "object" &&
				a.insights !== null &&
				"flakyRate" in a.insights &&
				a.insights.flakyRate &&
				typeof a.insights.flakyRate === "object" &&
				a.insights.flakyRate !== null &&
				"current" in a.insights.flakyRate &&
				typeof a.insights.flakyRate.current === "number"
					? a.insights.flakyRate.current
					: 0;
			const bRate =
				typeof b === "object" &&
				b !== null &&
				"insights" in b &&
				b.insights &&
				typeof b.insights === "object" &&
				b.insights !== null &&
				"flakyRate" in b.insights &&
				b.insights.flakyRate &&
				typeof b.insights.flakyRate === "object" &&
				b.insights.flakyRate !== null &&
				"current" in b.insights.flakyRate &&
				typeof b.insights.flakyRate.current === "number"
					? b.insights.flakyRate.current
					: 0;
			return bRate - aRate;
		});

		return flakyTests as Test[];
	},
};

/**
 * Filters test results to only include passed tests.
 * Useful for creating success summaries or filtering out failures.
 *
 * @example
 * Passed Tests:
 * {{#each (filterPassedTests tests)}}
 *   ✓ {{this.name}} ({{formatDuration this.duration}})
 * {{/each}}
 *
 * @param {unknown} tests - An array of Test objects from CTRF report.
 * @returns {Test[]} An array of tests with "passed" status.
 */
export const filterPassedTestsHelper: Helper = {
	name: "filterPassedTests",
	category: "CTRF",
	fn: (tests: unknown) => {
		if (!Array.isArray(tests)) {
			return [];
		}

		return tests.filter(
			(test) =>
				typeof test === "object" &&
				test !== null &&
				"status" in test &&
				test.status === "passed",
		) as Test[];
	},
};

/**
 * Filters test results to only include failed tests.
 * Useful for creating failure summaries or error reports.
 *
 * @example
 * Failed Tests:
 * {{#each (filterFailedTests tests)}}
 *   ⊝ {{this.name}} ({{this.message}})
 * {{/each}}
 *
 * @param {unknown} tests - An array of Test objects from CTRF report.
 * @returns {Test[]} An array of tests with "failed" status.
 */
export const filterFailedTestsHelper: Helper = {
	name: "filterFailedTests",
	category: "CTRF",
	fn: (tests: unknown) => {
		if (!Array.isArray(tests)) {
			return [];
		}

		return tests.filter(
			(test) =>
				typeof test === "object" &&
				test !== null &&
				"status" in test &&
				test.status === "failed",
		) as Test[];
	},
};

/**
 * Filters test results to only include tests with non-standard statuses (skipped, pending, other).
 * Useful for creating comprehensive test summaries.
 *
 * @example
 * Other Status Tests:
 * {{#each (filterOtherTests tests)}}
 *   ⊝ {{this.name}} ({{this.status}})
 * {{/each}}
 *
 * @param {unknown} tests - An array of Test objects from CTRF report.
 * @returns {Test[]} An array of tests with non-standard statuses.
 */
export const filterOtherTestsHelper: Helper = {
	name: "filterOtherTests",
	category: "CTRF",
	fn: (tests: unknown) => {
		if (!Array.isArray(tests)) {
			return [];
		}

		return tests.filter(
			(test) =>
				typeof test === "object" &&
				test !== null &&
				"status" in test &&
				(test.status === "skipped" ||
					test.status === "pending" ||
					test.status === "other"),
		) as Test[];
	},
};

/**
 * Counts the total number of flaky tests in the test results.
 *
 * @example
 * Flaky tests detected: {{countFlakyTests tests}}
 * {{#if (countFlakyTests tests)}}⚠️{{/if}}
 *
 * @param {unknown} tests - An array of Test objects from CTRF report.
 * @returns {number} The total number of flaky tests.
 */
export const countFlakyTestsHelper: Helper = {
	name: "countFlakyTests",
	category: "CTRF",
	fn: (tests: unknown) => {
		if (!Array.isArray(tests)) {
			return 0;
		}

		return tests.filter(
			(test) =>
				typeof test === "object" &&
				test !== null &&
				"flaky" in test &&
				test.flaky === true,
		).length;
	},
};

/**
 * Determines if there are any flaky tests in the test results.
 * Useful for conditional rendering of flaky test warnings.
 *
 * @example
 * {{#if (anyFlakyTests tests)}}
 *   ⚠️ Some tests are flaky and may need attention
 * {{else}}
 *   ✓ No flaky tests detected
 * {{/if}}
 *
 * @param {unknown} tests - An array of Test objects from CTRF report.
 * @returns {boolean} True if any test is marked as flaky, false otherwise.
 */
export const anyFlakyTestsHelper: Helper = {
	name: "anyFlakyTests",
	category: "CTRF",
	fn: (tests: unknown) => {
		if (!Array.isArray(tests)) {
			return false;
		}

		return tests.some(
			(test) =>
				typeof test === "object" &&
				test !== null &&
				"flaky" in test &&
				test.flaky === true,
		);
	},
};

/**
 * Formats test execution duration from start and stop timestamps into a human-readable format.
 * Handles edge cases where timing data might be missing or invalid.
 *
 * @example
 * Test Duration: {{formatDurationFromTimes test.start test.stop}}
 * <!-- Output: "Test Duration: 1.2s" -->
 *
 * @param {unknown} start - The test start time in milliseconds.
 * @param {unknown} stop - The test stop time in milliseconds.
 * @returns {string} A formatted duration string like "1ms", "1.2s", or "1m 30s".
 */
export const formatDurationFromTimesHelper: Helper = {
	name: "formatDurationFromTimes",
	category: "CTRF",
	fn: (start: unknown, stop: unknown) => {
		const startNum = typeof start === "number" ? start : 0;
		const stopNum = typeof stop === "number" ? stop : 0;

		if (start === 0 && stop === 0) {
			return "not captured";
		}

		if (Number.isNaN(startNum) || Number.isNaN(stopNum)) {
			return "not captured";
		}

		const durationMs = stopNum - startNum;
		if (durationMs < 1) {
			return `1ms`;
		} else if (durationMs < 1000) {
			return `${Math.floor(durationMs)}ms`;
		} else if (durationMs < 60000) {
			return `${(durationMs / 1000).toFixed(1)}s`;
		} else if (durationMs < 3600000) {
			const minutes = Math.floor(durationMs / 60000);
			const seconds = Math.floor((durationMs % 60000) / 1000);
			return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
		} else {
			const hours = Math.floor(durationMs / 3600000);
			const minutes = Math.floor((durationMs % 3600000) / 60000);
			return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
		}
	},
};

/**
 * Formats a test duration value in milliseconds into a human-readable format.
 * Perfect for displaying test execution times in reports.
 *
 * @example
 * {{test.name}} completed in {{formatDuration test.duration}}
 * <!-- Output: "Login test completed in 250ms" -->
 *
 * @param {unknown} duration - The test duration in milliseconds.
 * @returns {string} A formatted duration string like "1ms", "1.2s", or "1m 30s".
 */
export const formatDurationHelper: Helper = {
	name: "formatDuration",
	category: "CTRF",
	fn: (duration: unknown) => {
		const durationNum = typeof duration === "number" ? duration : 0;
		if (Number.isNaN(durationNum) || durationNum < 0) {
			return "not captured";
		}

		if (durationNum < 1) {
			return `1ms`;
		} else if (durationNum < 1000) {
			return `${Math.floor(durationNum)}ms`;
		} else if (durationNum < 60000) {
			return `${(durationNum / 1000).toFixed(1)}s`;
		} else if (durationNum < 3600000) {
			const minutes = Math.floor(durationNum / 60000);
			const seconds = Math.floor((durationNum % 60000) / 1000);
			return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
		} else {
			const hours = Math.floor(durationNum / 3600000);
			const minutes = Math.floor((durationNum % 3600000) / 60000);
			return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
		}
	},
};

/**
 * Converts ANSI-formatted test messages into HTML and replaces newlines with `<br>` tags.
 * Specifically designed for formatting the `test.message` property in CTRF reports.
 * Ideal for rendering multi-line console messages with colors in a human-friendly HTML format.
 * This helper formats test messages so they behave well with markdown and regular HTML content.
 *
 * @example
 * {{formatTestMessage test.message}}
 * Returns: HTML with ANSI colors converted to spans and line breaks as <br> tags
 *
 * {{#if test.message}}
 *   <div class="test-message">{{{formatTestMessage test.message}}}</div>
 * {{/if}}
 *
 * @param {string} text - The test message to format, possibly containing ANSI codes and newlines.
 * @returns {string} An HTML-formatted string with ANSI codes converted to HTML and line breaks replaced.
 */
export const formatTestMessageHelper: Helper = {
	name: "formatTestMessage",
	category: "CTRF",
	fn: (text: unknown) => {
		if (typeof text !== "string") {
			return "";
		}

		const message = text || "No message available";
		const convert = new Convert();

		// Convert ANSI codes to HTML, then handle newlines
		return (
			convert
				.toHtml(message)
				.replace(/\n/g, "<br>")
				// Clean up multiple consecutive line breaks (optional - converts <br><br> to <br>)
				.replace(/(<br>){2,}/g, "<br><br>")
		);
	},
};

/**
 * Similar to `formatTestMessage`, but designed to preserve code formatting more closely.
 * Converts ANSI to HTML and reduces consecutive newlines, but does not replace them with `<br>` tags.
 * Perfect for formatting code blocks, stack traces, and other pre-formatted content in test messages.
 * This helper is specifically designed to be used in pre code blocks where newlines need to be preserved.
 *
 * @example
 * <pre><code>{{#if message}}{{formatTestMessagePreCode message}}{{else}}No message available{{/if}}</code></pre>
 *
 * {{formatTestMessagePreCode test.message}}
 * Returns: HTML with ANSI colors converted but newlines preserved for <pre> blocks
 *
 * {{#if test.message}}
 *   <pre class="test-code">{{{formatTestMessagePreCode test.message}}}</pre>
 * {{/if}}
 *
 * @param {unknown} text - The test message to format, possibly containing ANSI codes.
 * @returns {string} An HTML-formatted string with ANSI codes converted to HTML and consecutive newlines minimized.
 */
export const formatTestMessagePreCodeHelper: Helper = {
	name: "formatTestMessagePreCode",
	category: "CTRF",
	fn: (text: unknown) => {
		if (typeof text !== "string") {
			return "";
		}

		const message = text || "No message available";
		const convert = new Convert();

		// Convert ANSI codes to HTML, then minimize consecutive newlines
		return convert.toHtml(message).replace(/\n{2,}/g, "\n");
	},
};

/**
 * Filters an array of tests to only those that have failed, then limits the result to a specified number.
 * Perfect for displaying "Top N failed tests" in dashboards and summary reports.
 *
 * @example
 * {{#each (limitFailedTests tests 5)}}
 *   <div class="failed-test">{{this.name}}</div>
 * {{/each}}
 * <!-- Shows up to 5 failed tests -->
 *
 * {{#each (limitFailedTests suite.tests 3)}}
 *   {{this.name}} - {{this.status}}
 * {{/each}}
 * <!-- Shows first 3 failed tests from a suite -->
 *
 * @param {unknown} tests - An array of Test objects from CTRF report.
 * @param {unknown} limit - The maximum number of failed tests to return.
 * @returns {Test[]} An array of failed tests up to the specified limit.
 *  Use to create "Top failed tests" sections in test reports and dashboards.
 */
export const limitFailedTestsHelper: Helper = {
	name: "limitFailedTests",
	category: "CTRF",
	fn: (tests: unknown, limit: unknown) => {
		if (!Array.isArray(tests)) {
			return [];
		}

		// Parse limit with default fallback
		const maxLimit =
			typeof limit === "number"
				? limit
				: typeof limit === "string"
					? parseInt(limit, 10)
					: 10;

		// Ensure limit is a positive number
		const validLimit = Number.isNaN(maxLimit) || maxLimit < 0 ? 10 : maxLimit;

		// Filter to failed tests and limit the results
		return tests
			.filter(
				(test) =>
					typeof test === "object" &&
					test !== null &&
					"status" in test &&
					test.status === "failed",
			)
			.slice(0, validLimit);
	},
};

/**
 * Retrieves an emoji representation for a given test state or category.
 * Useful for adding visual flair to CTRF test reports, dashboards, and summaries.
 *
 * @example
 * {{getCtrfEmoji "passed"}}
 * <!-- results in: "✅" -->
 *
 * {{getCtrfEmoji "failed"}}
 * <!-- results in: "❌" -->
 *
 * {{getCtrfEmoji "flaky"}}
 * <!-- results in: "🍂" -->
 *
 * {{getCtrfEmoji "build"}}
 * <!-- results in: "🏗️" -->
 *
 * **Use with CTRF templates**: Perfect for creating visually appealing test summaries, status indicators, and dashboard elements that make test reports more engaging and easier to scan.
 *
 * @param {unknown} status - The test state or category to get an emoji for.
 * @returns {string} The emoji corresponding to the test state or category.
 */
export const getCtrfEmojiHelper: Helper = {
	name: "getCtrfEmoji",
	category: "CTRF",
	fn: (status: unknown): string => {
		if (typeof status !== "string") {
			return "❓";
		}

		switch (status) {
			case "passed":
				return "✅";
			case "failed":
				return "❌";
			case "skipped":
				return "⏭️";
			case "pending":
				return "⏳";
			case "other":
				return "❓";
			case "build":
				return "🏗️";
			case "duration":
				return "⏱️";
			case "flaky":
				return "🍂";
			case "tests":
				return "📝";
			case "result":
				return "🧪";
			case "warning":
				return "⚠️";
			default:
				return "❓";
		}
	},
};

export const ctrfHelpers: Helper[] = [
	sortTestsByFlakyRateHelper,
	sortTestsByFailRateHelper,
	filterPassedTestsHelper,
	filterFailedTestsHelper,
	filterOtherTestsHelper,
	limitFailedTestsHelper,
	countFlakyTestsHelper,
	anyFlakyTestsHelper,
	formatDurationFromTimesHelper,
	formatDurationHelper,
	formatTestMessageHelper,
	formatTestMessagePreCodeHelper,
	getCtrfEmojiHelper,
];
