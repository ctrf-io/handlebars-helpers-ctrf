import type { Test } from "ctrf";
import {
	anyFlakyTestsHelper,
	countFlakyTestsHelper,
	filterFailedTestsHelper,
	filterOtherTestsHelper,
	filterPassedTestsHelper,
	formatDurationFromTimesHelper,
	formatDurationHelper,
	sortTestsByFailRateHelper,
	sortTestsByFlakyRateHelper,
} from "../../src/helpers/ctrf";

describe("CTRF Helpers", () => {
	const mockTests: Test[] = [
		{
			name: "Passing Test 1",
			status: "passed",
			duration: 1000,
			flaky: false,
			extra: {
				flakyRate: 0.0,
				failRate: 0.1,
			},
		},
		{
			name: "Failing Test 1",
			status: "failed",
			duration: 2000,
			message: "Test failed due to timeout",
			flaky: true,
			extra: {
				flakyRate: 0.8,
				failRate: 0.9,
			},
		},
		{
			name: "Skipped Test 1",
			status: "skipped",
			duration: 0,
			flaky: false,
			extra: {
				flakyRate: 0.0,
				failRate: 0.0,
			},
		},
		{
			name: "Pending Test 1",
			status: "pending",
			duration: 0,
			flaky: false,
		},
		{
			name: "Failing Test 2",
			status: "failed",
			duration: 1500,
			message: "Assertion error",
			flaky: true,
			extra: {
				flakyRate: 0.6,
				failRate: 0.7,
			},
		},
		{
			name: "Passing Test 2",
			status: "passed",
			duration: 800,
			flaky: false,
			extra: {
				flakyRate: 0.1,
				failRate: 0.2,
			},
		},
	];

	describe("sortTestsByFlakyRateHelper", () => {
		it("should sort tests by flaky rate in descending order", () => {
			const result = sortTestsByFlakyRateHelper.fn(mockTests);

			if (Array.isArray(result)) {
				expect(result).toHaveLength(3); // Tests with flakyRate > 0 (includes 0.1)
				expect(result[0].name).toBe("Failing Test 1");
				expect(result[0].extra?.flakyRate).toBe(0.8);
				expect(result[1].name).toBe("Failing Test 2");
				expect(result[1].extra?.flakyRate).toBe(0.6);
				expect(result[2].name).toBe("Passing Test 2");
				expect(result[2].extra?.flakyRate).toBe(0.1);
			}
		});

		it("should handle tests without extra data", () => {
			const testsWithoutExtra: Test[] = [
				{
					name: "Test Without Extra",
					status: "passed",
					duration: 1000,
				},
			];

			const result = sortTestsByFlakyRateHelper.fn(testsWithoutExtra);
			expect(result).toHaveLength(0);
		});

		it("should handle empty array", () => {
			const result = sortTestsByFlakyRateHelper.fn([]);
			expect(result).toHaveLength(0);
		});

		it("should filter out tests with zero flaky rate", () => {
			const result = sortTestsByFlakyRateHelper.fn(mockTests);
			if (Array.isArray(result)) {
				expect(
					result.every(
						(test: Test) =>
							test.extra?.flakyRate &&
							typeof test.extra.flakyRate === "number" &&
							test.extra.flakyRate > 0,
					),
				).toBe(true);
			}
		});
	});

	describe("filterPassedTestsHelper", () => {
		it("should filter only passed tests", () => {
			const result = filterPassedTestsHelper.fn(mockTests);

			if (Array.isArray(result)) {
				expect(result).toHaveLength(2);
				expect(result.every((test: Test) => test.status === "passed")).toBe(
					true,
				);
				expect(result[0].name).toBe("Passing Test 1");
				expect(result[1].name).toBe("Passing Test 2");
			}
		});

		it("should return empty array when no passed tests", () => {
			const failedOnlyTests: Test[] = [
				{ name: "Failed Test", status: "failed", duration: 1000 },
			];

			const result = filterPassedTestsHelper.fn(failedOnlyTests);
			expect(result).toHaveLength(0);
		});

		it("should handle empty array", () => {
			const result = filterPassedTestsHelper.fn([]);
			expect(result).toHaveLength(0);
		});
	});

	describe("filterFailedTestsHelper", () => {
		it("should filter only failed tests", () => {
			const result = filterFailedTestsHelper.fn(mockTests);

			if (Array.isArray(result)) {
				expect(result).toHaveLength(2);
				expect(result.every((test: Test) => test.status === "failed")).toBe(
					true,
				);
				expect(result[0].name).toBe("Failing Test 1");
				expect(result[1].name).toBe("Failing Test 2");
			}
		});

		it("should return empty array when no failed tests", () => {
			const passedOnlyTests: Test[] = [
				{ name: "Passed Test", status: "passed", duration: 1000 },
			];

			const result = filterFailedTestsHelper.fn(passedOnlyTests);
			expect(result).toHaveLength(0);
		});
	});

	describe("filterOtherTestsHelper", () => {
		it("should filter skipped, pending, and other status tests", () => {
			const result = filterOtherTestsHelper.fn(mockTests);

			if (Array.isArray(result)) {
				expect(result).toHaveLength(2);
				expect(result[0].status).toBe("skipped");
				expect(result[1].status).toBe("pending");
			}
		});

		it('should include tests with "other" status', () => {
			const testsWithOther: Test[] = [
				...mockTests,
				{ name: "Other Test", status: "other", duration: 500 },
			];

			const result = filterOtherTestsHelper.fn(testsWithOther);
			if (Array.isArray(result)) {
				expect(result).toHaveLength(3);
				expect(result.some((test: Test) => test.status === "other")).toBe(true);
			}
		});

		it("should return empty array when no other status tests", () => {
			const passedFailedOnlyTests: Test[] = [
				{ name: "Passed Test", status: "passed", duration: 1000 },
				{ name: "Failed Test", status: "failed", duration: 1000 },
			];

			const result = filterOtherTestsHelper.fn(passedFailedOnlyTests);
			expect(result).toHaveLength(0);
		});
	});

	describe("countFlakyTestsHelper", () => {
		it("should count flaky tests correctly", () => {
			const result = countFlakyTestsHelper.fn(mockTests);
			expect(result).toBe(2); // Two tests have flaky: true
		});

		it("should return 0 when no flaky tests", () => {
			const nonFlakyTests: Test[] = [
				{ name: "Stable Test", status: "passed", duration: 1000, flaky: false },
			];

			const result = countFlakyTestsHelper.fn(nonFlakyTests);
			expect(result).toBe(0);
		});

		it("should handle empty array", () => {
			const result = countFlakyTestsHelper.fn([]);
			expect(result).toBe(0);
		});

		it("should handle tests without flaky property", () => {
			const testsWithoutFlaky: Test[] = [
				{ name: "Test", status: "passed", duration: 1000 },
			];

			const result = countFlakyTestsHelper.fn(testsWithoutFlaky);
			expect(result).toBe(0);
		});
	});

	describe("anyFlakyTestsHelper", () => {
		it("should return true when flaky tests exist", () => {
			const result = anyFlakyTestsHelper.fn(mockTests);
			expect(result).toBe(true);
		});

		it("should return false when no flaky tests", () => {
			const nonFlakyTests: Test[] = [
				{ name: "Stable Test", status: "passed", duration: 1000, flaky: false },
			];

			const result = anyFlakyTestsHelper.fn(nonFlakyTests);
			expect(result).toBe(false);
		});

		it("should return false for empty array", () => {
			const result = anyFlakyTestsHelper.fn([]);
			expect(result).toBe(false);
		});
	});

	describe("sortTestsByFailRateHelper", () => {
		it("should sort tests by fail rate in descending order", () => {
			const result = sortTestsByFailRateHelper.fn(mockTests);

			if (Array.isArray(result)) {
				expect(result).toHaveLength(4); // Tests with failRate > 0 (includes 0.1 and 0.2)
				expect(result[0].extra?.failRate).toBe(0.9);
				expect(result[1].extra?.failRate).toBe(0.7);
				expect(result[2].extra?.failRate).toBe(0.2);
				expect(result[3].extra?.failRate).toBe(0.1);
			}
		});

		it("should handle tests without extra or failRate", () => {
			const testsWithoutFailRate: Test[] = [
				{ name: "Test", status: "passed", duration: 1000 },
			];

			const result = sortTestsByFailRateHelper.fn(testsWithoutFailRate);
			expect(result).toHaveLength(0);
		});

		it("should filter out tests with zero fail rate", () => {
			const result = sortTestsByFailRateHelper.fn(mockTests);
			if (Array.isArray(result)) {
				expect(
					result.every(
						(test: Test) =>
							test.extra?.failRate &&
							typeof test.extra.failRate === "number" &&
							test.extra.failRate > 0,
					),
				).toBe(true);
			}
		});
	});

	describe("formatDurationFromTimesHelper", () => {
		it("should format duration from start and stop times", () => {
			const result = formatDurationFromTimesHelper.fn(1000, 2500);
			expect(result).toBe("1.5s");
		});

		it("should handle millisecond durations", () => {
			const result = formatDurationFromTimesHelper.fn(1000, 1250);
			expect(result).toBe("250ms");
		});

		it("should handle minute durations", () => {
			const result = formatDurationFromTimesHelper.fn(0, 90000);
			expect(result).toBe("1m 30s");
		});

		it("should handle hour durations", () => {
			const result = formatDurationFromTimesHelper.fn(0, 3720000);
			expect(result).toBe("1h 2m");
		});

		it('should return "not captured" for zero times', () => {
			const result = formatDurationFromTimesHelper.fn(0, 0);
			expect(result).toBe("not captured");
		});

		it('should return "not captured" for invalid times', () => {
			const result1 = formatDurationFromTimesHelper.fn(NaN, 1000);
			const result2 = formatDurationFromTimesHelper.fn(1000, NaN);

			expect(result1).toBe("not captured");
			expect(result2).toBe("not captured");
		});

		it("should handle negative duration (stop before start)", () => {
			const result = formatDurationFromTimesHelper.fn(2000, 1000);
			expect(result).toBe("not captured");
		});
	});

	describe("formatDurationHelper", () => {
		it("should format millisecond durations", () => {
			expect(formatDurationHelper.fn(250)).toBe("250ms");
			expect(formatDurationHelper.fn(999)).toBe("999ms");
		});

		it("should format second durations", () => {
			expect(formatDurationHelper.fn(1500)).toBe("1.5s");
			expect(formatDurationHelper.fn(30000)).toBe("30.0s");
		});

		it("should format minute durations", () => {
			expect(formatDurationHelper.fn(60000)).toBe("1m");
			expect(formatDurationHelper.fn(90000)).toBe("1m 30s");
			expect(formatDurationHelper.fn(120000)).toBe("2m");
		});

		it("should format hour durations", () => {
			expect(formatDurationHelper.fn(3600000)).toBe("1h");
			expect(formatDurationHelper.fn(3720000)).toBe("1h 2m");
			expect(formatDurationHelper.fn(7200000)).toBe("2h");
		});

		it("should handle very small durations", () => {
			expect(formatDurationHelper.fn(0.5)).toBe("1ms");
			expect(formatDurationHelper.fn(0)).toBe("1ms"); // 0 < 1 returns '1ms'
		});

		it("should handle invalid durations", () => {
			expect(formatDurationHelper.fn(NaN)).toBe("not captured");
			expect(formatDurationHelper.fn(-1000)).toBe("not captured");
		});
	});

	describe("Helper metadata", () => {
		it("should have correct helper names", () => {
			expect(sortTestsByFlakyRateHelper.name).toBe("sortTestsByFlakyRate");
			expect(filterPassedTestsHelper.name).toBe("filterPassedTests");
			expect(filterFailedTestsHelper.name).toBe("filterFailedTests");
			expect(filterOtherTestsHelper.name).toBe("filterOtherTests");
			expect(countFlakyTestsHelper.name).toBe("countFlakyTests");
			expect(anyFlakyTestsHelper.name).toBe("anyFlakyTests");
			expect(sortTestsByFailRateHelper.name).toBe("sortTestsByFailRate");
			expect(formatDurationFromTimesHelper.name).toBe(
				"formatDurationFromTimes",
			);
			expect(formatDurationHelper.name).toBe("formatDuration");
		});

		it("should have correct helper categories", () => {
			const helpers = [
				sortTestsByFlakyRateHelper,
				filterPassedTestsHelper,
				filterFailedTestsHelper,
				filterOtherTestsHelper,
				countFlakyTestsHelper,
				anyFlakyTestsHelper,
				sortTestsByFailRateHelper,
				formatDurationFromTimesHelper,
				formatDurationHelper,
			];

			helpers.forEach((helper) => {
				expect(helper.category).toBe("CTRF");
			});
		});
	});
});
