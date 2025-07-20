import type { Test } from "ctrf";
import type { Helper } from "../helper-registry";

/**
 * Sorts tests by their failure rate in descending order, showing the most unreliable tests first.
 *
 * @example
 * Most Unreliable Tests:
 * {{#each (sortTestsByFailRate tests)}}
 *   {{this.name}} - Fail Rate: {{this.extra.failRate}}%
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
				"extra" in test &&
				test.extra &&
				typeof test.extra === "object" &&
				test.extra !== null &&
				"failRate" in test.extra &&
				typeof test.extra.failRate === "number" &&
				test.extra.failRate > 0,
		);

		failedTests.sort((a, b) => {
			const aRate =
				typeof a === "object" &&
				a !== null &&
				"extra" in a &&
				a.extra &&
				typeof a.extra === "object" &&
				a.extra !== null &&
				"failRate" in a.extra &&
				typeof a.extra.failRate === "number"
					? a.extra.failRate
					: 0;
			const bRate =
				typeof b === "object" &&
				b !== null &&
				"extra" in b &&
				b.extra &&
				typeof b.extra === "object" &&
				b.extra !== null &&
				"failRate" in b.extra &&
				typeof b.extra.failRate === "number"
					? b.extra.failRate
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
 *   {{this.name}} - Flaky Rate: {{this.extra.flakyRate}}%
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
				"extra" in test &&
				test.extra &&
				typeof test.extra === "object" &&
				test.extra !== null &&
				"flakyRate" in test.extra &&
				typeof test.extra.flakyRate === "number" &&
				test.extra.flakyRate > 0,
		);

		flakyTests.sort((a, b) => {
			const aRate =
				typeof a === "object" &&
				a !== null &&
				"extra" in a &&
				a.extra &&
				typeof a.extra === "object" &&
				a.extra !== null &&
				"flakyRate" in a.extra &&
				typeof a.extra.flakyRate === "number"
					? a.extra.flakyRate
					: 0;
			const bRate =
				typeof b === "object" &&
				b !== null &&
				"extra" in b &&
				b.extra &&
				typeof b.extra === "object" &&
				b.extra !== null &&
				"flakyRate" in b.extra &&
				typeof b.extra.flakyRate === "number"
					? b.extra.flakyRate
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
 * Flaky tests detected: {{countFlaky tests}}
 * {{#if (countFlaky tests)}}⚠️{{/if}}
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

		if (startNum === 0 && stopNum === 0) {
			return "not captured";
		}

		if (Number.isNaN(startNum) || Number.isNaN(stopNum)) {
			return "not captured";
		}

		const durationMs = stopNum - startNum;
		return formatDurationMs(durationMs);
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
		return formatDurationMs(durationNum);
	},
};

/**
 * Core formatting logic for duration in milliseconds
 */
const formatDurationMs = (durationMs: number): string => {
	if (Number.isNaN(durationMs) || durationMs < 0) {
		return "not captured";
	}

	if (durationMs < 1) {
		return "1ms";
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
};

export const ctrfHelpers: Helper[] = [
	sortTestsByFlakyRateHelper,
	sortTestsByFailRateHelper,
	filterPassedTestsHelper,
	filterFailedTestsHelper,
	filterOtherTestsHelper,
	countFlakyTestsHelper,
	anyFlakyTestsHelper,
	formatDurationFromTimesHelper,
	formatDurationHelper,
];
