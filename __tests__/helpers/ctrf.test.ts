import type { Test } from "ctrf";
import {
	anyFlakyTestsHelper,
	countFlakyTestsHelper,
	filterFailedTestsHelper,
	filterOtherTestsHelper,
	filterPassedTestsHelper,
	formatDurationFromTimesHelper,
	formatDurationHelper,
	formatTestMessageHelper,
	formatTestMessagePreCodeHelper,
	getCtrfEmojiHelper,
	limitFailedTestsHelper,
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

	describe("limitFailedTestsHelper", () => {
		it("should filter failed tests and limit to specified number", () => {
			const result = limitFailedTestsHelper.fn(mockTests, 1);

			if (Array.isArray(result)) {
				expect(result).toHaveLength(1);
				expect(result[0].status).toBe("failed");
				expect(result[0].name).toBe("Failing Test 1");
			}
		});

		it("should return all failed tests when limit is greater than failed count", () => {
			const result = limitFailedTestsHelper.fn(mockTests, 10);

			if (Array.isArray(result)) {
				expect(result).toHaveLength(2); // Only 2 failed tests in mockTests
				expect(result.every((test: Test) => test.status === "failed")).toBe(true);
				expect(result[0].name).toBe("Failing Test 1");
				expect(result[1].name).toBe("Failing Test 2");
			}
		});

		it("should handle zero limit", () => {
			const result = limitFailedTestsHelper.fn(mockTests, 0);
			expect(result).toHaveLength(0);
		});

		it("should handle negative limit by defaulting to 10", () => {
			const result = limitFailedTestsHelper.fn(mockTests, -5);

			if (Array.isArray(result)) {
				expect(result).toHaveLength(2); // All 2 failed tests, since -5 defaults to 10
				expect(result.every((test: Test) => test.status === "failed")).toBe(true);
			}
		});

		it("should handle string limit by parsing to number", () => {
			const result = limitFailedTestsHelper.fn(mockTests, "1");

			if (Array.isArray(result)) {
				expect(result).toHaveLength(1);
				expect(result[0].status).toBe("failed");
				expect(result[0].name).toBe("Failing Test 1");
			}
		});

		it("should handle invalid string limit by defaulting to 10", () => {
			const result = limitFailedTestsHelper.fn(mockTests, "invalid");

			if (Array.isArray(result)) {
				expect(result).toHaveLength(2); // All 2 failed tests, since "invalid" defaults to 10
				expect(result.every((test: Test) => test.status === "failed")).toBe(true);
			}
		});

		it("should handle undefined limit by defaulting to 10", () => {
			const result = limitFailedTestsHelper.fn(mockTests, undefined);

			if (Array.isArray(result)) {
				expect(result).toHaveLength(2); // All 2 failed tests, since undefined defaults to 10
				expect(result.every((test: Test) => test.status === "failed")).toBe(true);
			}
		});

		it("should return empty array when no failed tests", () => {
			const passedOnlyTests: Test[] = [
				{ name: "Passed Test", status: "passed", duration: 1000 },
				{ name: "Skipped Test", status: "skipped", duration: 0 },
			];

			const result = limitFailedTestsHelper.fn(passedOnlyTests, 5);
			expect(result).toHaveLength(0);
		});

		it("should return empty array for non-array input", () => {
			expect(limitFailedTestsHelper.fn(null, 5)).toEqual([]);
			expect(limitFailedTestsHelper.fn(undefined, 5)).toEqual([]);
			expect(limitFailedTestsHelper.fn("not-an-array", 5)).toEqual([]);
			expect(limitFailedTestsHelper.fn({}, 5)).toEqual([]);
		});

		it("should handle edge case with many failed tests", () => {
			const manyFailedTests: Test[] = Array.from({ length: 20 }, (_, i) => ({
				name: `Failed Test ${i + 1}`,
				status: "failed" as const,
				duration: 1000,
			}));

			const result = limitFailedTestsHelper.fn(manyFailedTests, 3);

			if (Array.isArray(result)) {
				expect(result).toHaveLength(3);
				expect(result[0].name).toBe("Failed Test 1");
				expect(result[1].name).toBe("Failed Test 2");
				expect(result[2].name).toBe("Failed Test 3");
				expect(result.every((test: Test) => test.status === "failed")).toBe(true);
			}
		});

		it("should preserve order of failed tests", () => {
			const orderedTests: Test[] = [
				{ name: "First Failed", status: "failed", duration: 100 },
				{ name: "Passed Test", status: "passed", duration: 200 },
				{ name: "Second Failed", status: "failed", duration: 300 },
				{ name: "Third Failed", status: "failed", duration: 400 },
			];

			const result = limitFailedTestsHelper.fn(orderedTests, 2);

			if (Array.isArray(result)) {
				expect(result).toHaveLength(2);
				expect(result[0].name).toBe("First Failed");
				expect(result[1].name).toBe("Second Failed");
			}
		});

		it("should be categorized as CTRF helper", () => {
			expect(limitFailedTestsHelper.category).toBe("CTRF");
			expect(limitFailedTestsHelper.name).toBe("limitFailedTests");
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

	describe("formatTestMessageHelper (formatTestMessage)", () => {
		it("should convert ANSI codes to HTML and newlines to <br> for test messages", () => {
			expect(formatTestMessageHelper.fn("Line1\nLine2")).toBe("Line1<br>Line2");
			expect(formatTestMessageHelper.fn("Test \u001b[31mFAILED\u001b[0m\nNext line")).toBe("Test <span style=\"color:#A00\">FAILED</span><br>Next line");
		});

		it("should handle multiple newlines in test output", () => {
			expect(formatTestMessageHelper.fn("Error\n\nStack trace")).toBe("Error<br><br>Stack trace");
			expect(formatTestMessageHelper.fn("Line1\n\n\nLine4")).toBe("Line1<br><br>Line4");
		});

		it("should handle complex ANSI sequences in test failures", () => {
			const input = "\u001b[32mExpected\u001b[0m\n\u001b[31mActual\u001b[0m\n\u001b[1mDiff\u001b[0m";
			const expected = "<span style=\"color:#0A0\">Expected</span><br><span style=\"color:#A00\">Actual</span><br><b>Diff</b>";
			expect(formatTestMessageHelper.fn(input)).toBe(expected);
		});

		it("should handle empty and null test messages", () => {
			expect(formatTestMessageHelper.fn("")).toBe("No message available");
			expect(formatTestMessageHelper.fn(null as unknown)).toBe("");
			expect(formatTestMessageHelper.fn(undefined as unknown)).toBe("");
		});

		it("should handle non-string inputs gracefully", () => {
			expect(formatTestMessageHelper.fn(123 as unknown)).toBe("");
			expect(formatTestMessageHelper.fn({} as unknown)).toBe("");
			expect(formatTestMessageHelper.fn([] as unknown)).toBe("");
		});

		it("should handle real-world test failure scenarios", () => {
			const assertionError = "AssertionError: expected 'false' to be 'true'\n\u001b[31m- false\u001b[0m\n\u001b[32m+ true\u001b[0m";
			const expected = "AssertionError: expected 'false' to be 'true'<br><span style=\"color:#A00\">- false</span><br><span style=\"color:#0A0\">+ true</span>";
			expect(formatTestMessageHelper.fn(assertionError)).toBe(expected);
		});

		it("should handle Jest/Vitest style test output", () => {
			const jestOutput = "\u001b[1m\u001b[32m✓\u001b[0m Test passed\n\u001b[1m\u001b[31m✗\u001b[0m Test failed\nStack trace";
			const result = formatTestMessageHelper.fn(jestOutput);
			expect(result).toContain("<b><span style=\"color:#0A0\">✓</span></b>");
			expect(result).toContain("<b><span style=\"color:#A00\">✗</span></b>");
			expect(result).toContain("<br>");
		});

		it("should be categorized as CTRF helper", () => {
			expect(formatTestMessageHelper.category).toBe("CTRF");
			expect(formatTestMessageHelper.name).toBe("formatTestMessage");
		});
	});

	describe("formatTestMessagePreCodeHelper", () => {
		it("should convert ANSI codes to HTML but preserve newlines for code formatting", () => {
			expect(formatTestMessagePreCodeHelper.fn("Line1\nLine2")).toBe("Line1\nLine2");
			expect(formatTestMessagePreCodeHelper.fn("Code \u001b[31mError\u001b[0m\nNext line")).toBe("Code <span style=\"color:#A00\">Error</span>\nNext line");
		});

		it("should minimize consecutive newlines but preserve single ones", () => {
			expect(formatTestMessagePreCodeHelper.fn("Line1\n\nLine3")).toBe("Line1\nLine3");
			expect(formatTestMessagePreCodeHelper.fn("Line1\n\n\nLine4")).toBe("Line1\nLine4");
			expect(formatTestMessagePreCodeHelper.fn("Line1\n\n\n\nLine5")).toBe("Line1\nLine5");
		});

		it("should handle stack traces with ANSI codes", () => {
			const stackTrace = "Error: Test failed\n  at test.js:10:5\n\u001b[31m  at runner.js:45:12\u001b[0m\n  at main.js:20:3";
			const expected = "Error: Test failed\n  at test.js:10:5\n<span style=\"color:#A00\">  at runner.js:45:12</span>\n  at main.js:20:3";
			expect(formatTestMessagePreCodeHelper.fn(stackTrace)).toBe(expected);
		});

		it("should handle code blocks with syntax highlighting", () => {
			const codeBlock = "function test() {\n  \u001b[32mconsole.log\u001b[0m('hello');\n  \u001b[31mthrow new Error\u001b[0m('test');\n}";
			const expected = "function test() {\n  <span style=\"color:#0A0\">console.log</span>('hello');\n  <span style=\"color:#A00\">throw new Error</span>('test');\n}";
			expect(formatTestMessagePreCodeHelper.fn(codeBlock)).toBe(expected);
		});

		it("should handle empty and null inputs", () => {
			expect(formatTestMessagePreCodeHelper.fn("")).toBe("No message available");
			expect(formatTestMessagePreCodeHelper.fn(null as unknown)).toBe("");
			expect(formatTestMessagePreCodeHelper.fn(undefined as unknown)).toBe("");
		});

		it("should handle non-string inputs gracefully", () => {
			expect(formatTestMessagePreCodeHelper.fn(123 as unknown)).toBe("");
			expect(formatTestMessagePreCodeHelper.fn({} as unknown)).toBe("");
			expect(formatTestMessagePreCodeHelper.fn([] as unknown)).toBe("");
		});

		it("should be ideal for pre-formatted content", () => {
			const preFormattedContent = "Code:\n  function add(a, b) {\n    \u001b[33mreturn a + b;\u001b[0m\n  }\n\n\nOutput:\n  \u001b[32m5\u001b[0m";
			const expected = "Code:\n  function add(a, b) {\n    <span style=\"color:#A50\">return a + b;</span>\n  }\nOutput:\n  <span style=\"color:#0A0\">5</span>";
			expect(formatTestMessagePreCodeHelper.fn(preFormattedContent)).toBe(expected);
		});

		it("should be categorized as CTRF helper", () => {
			expect(formatTestMessagePreCodeHelper.category).toBe("CTRF");
			expect(formatTestMessagePreCodeHelper.name).toBe("formatTestMessagePreCode");
		});
	});

	describe("getCtrfEmojiHelper", () => {
		it("should return correct emojis for test statuses", () => {
			expect(getCtrfEmojiHelper.fn("passed")).toBe("✅");
			expect(getCtrfEmojiHelper.fn("failed")).toBe("❌");
			expect(getCtrfEmojiHelper.fn("skipped")).toBe("⏭️");
			expect(getCtrfEmojiHelper.fn("pending")).toBe("⏳");
			expect(getCtrfEmojiHelper.fn("other")).toBe("❓");
		});

		it("should return correct emojis for categories", () => {
			expect(getCtrfEmojiHelper.fn("build")).toBe("🏗️");
			expect(getCtrfEmojiHelper.fn("duration")).toBe("⏱️");
			expect(getCtrfEmojiHelper.fn("flaky")).toBe("🍂");
			expect(getCtrfEmojiHelper.fn("tests")).toBe("📝");
			expect(getCtrfEmojiHelper.fn("result")).toBe("🧪");
			expect(getCtrfEmojiHelper.fn("warning")).toBe("⚠️");
		});

		it("should return default emoji for unknown status", () => {
			expect(getCtrfEmojiHelper.fn("unknown")).toBe("❓");
			expect(getCtrfEmojiHelper.fn("invalid")).toBe("❓");
		});

		it("should return default emoji for non-string input", () => {
			expect(getCtrfEmojiHelper.fn(null)).toBe("❓");
			expect(getCtrfEmojiHelper.fn(undefined)).toBe("❓");
			expect(getCtrfEmojiHelper.fn(123)).toBe("❓");
			expect(getCtrfEmojiHelper.fn({})).toBe("❓");
			expect(getCtrfEmojiHelper.fn([])).toBe("❓");
		});

		it("should be categorized as CTRF helper", () => {
			expect(getCtrfEmojiHelper.category).toBe("CTRF");
			expect(getCtrfEmojiHelper.name).toBe("getCtrfEmoji");
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
			expect(formatTestMessageHelper.name).toBe("formatTestMessage");
			expect(formatTestMessagePreCodeHelper.name).toBe("formatTestMessagePreCode");
			expect(getCtrfEmojiHelper.name).toBe("getCtrfEmoji");
			expect(limitFailedTestsHelper.name).toBe("limitFailedTests");
		});

		it("should have correct helper categories", () => {
			const helpers = [
				sortTestsByFlakyRateHelper,
				filterPassedTestsHelper,
				filterFailedTestsHelper,
				filterOtherTestsHelper,
				limitFailedTestsHelper,
				countFlakyTestsHelper,
				anyFlakyTestsHelper,
				sortTestsByFailRateHelper,
				formatDurationFromTimesHelper,
				formatDurationHelper,
				formatTestMessageHelper,
				formatTestMessagePreCodeHelper,
				getCtrfEmojiHelper,
			];

			helpers.forEach((helper) => {
				expect(helper.category).toBe("CTRF");
			});
		});
	});
});
