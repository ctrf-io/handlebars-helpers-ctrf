import { formatTestPathHelper, getGitHubIconHelper, githubHelpers } from "../../src/helpers/github";

describe("GitHub Helpers", () => {
	describe("getGitHubIconHelper", () => {
		it("should return correct icons for test statuses", () => {
			expect(getGitHubIconHelper.fn("passed")).toBe("https://ctrf.io/assets/github/check-circle.svg");
			expect(getGitHubIconHelper.fn("failed")).toBe("https://ctrf.io/assets/github/stop.svg");
			expect(getGitHubIconHelper.fn("skipped")).toBe("https://ctrf.io/assets/github/skip.svg");
			expect(getGitHubIconHelper.fn("pending")).toBe("https://ctrf.io/assets/github/hourglass.svg");
			expect(getGitHubIconHelper.fn("other")).toBe("https://ctrf.io/assets/github/question.svg");
		});

		it("should return correct icons for test categories", () => {
			expect(getGitHubIconHelper.fn("flaky")).toBe("https://ctrf.io/assets/github/alert.svg");
			expect(getGitHubIconHelper.fn("tests")).toBe("https://ctrf.io/assets/github/checklist.svg");
			expect(getGitHubIconHelper.fn("build")).toBe("https://ctrf.io/assets/github/workflow.svg");
			expect(getGitHubIconHelper.fn("duration")).toBe("https://ctrf.io/assets/github/clock.svg");
			expect(getGitHubIconHelper.fn("result")).toBe("https://ctrf.io/assets/github/beaker.svg");
		});

		it("should return correct icons for report elements", () => {
			expect(getGitHubIconHelper.fn("stats")).toBe("https://ctrf.io/assets/github/pulse.svg");
			expect(getGitHubIconHelper.fn("link")).toBe("https://ctrf.io/assets/github/link-external.svg");
			expect(getGitHubIconHelper.fn("report")).toBe("https://ctrf.io/assets/github/package.svg");
			expect(getGitHubIconHelper.fn("commit")).toBe("https://ctrf.io/assets/github/git-pull-request.svg");
			expect(getGitHubIconHelper.fn("info")).toBe("https://ctrf.io/assets/github/info.svg");
		});

		it("should return default icon for unknown status", () => {
			expect(getGitHubIconHelper.fn("unknown")).toBe("https://ctrf.io/assets/github/question.svg");
			expect(getGitHubIconHelper.fn("invalid")).toBe("https://ctrf.io/assets/github/question.svg");
		});

		it("should return default icon for non-string input", () => {
			expect(getGitHubIconHelper.fn(null)).toBe("https://ctrf.io/assets/github/question.svg");
			expect(getGitHubIconHelper.fn(undefined)).toBe("https://ctrf.io/assets/github/question.svg");
			expect(getGitHubIconHelper.fn(123)).toBe("https://ctrf.io/assets/github/question.svg");
			expect(getGitHubIconHelper.fn({})).toBe("https://ctrf.io/assets/github/question.svg");
			expect(getGitHubIconHelper.fn([])).toBe("https://ctrf.io/assets/github/question.svg");
		});

		it("should be registered correctly", () => {
			expect(getGitHubIconHelper.name).toBe("getGitHubIcon");
			expect(getGitHubIconHelper.category).toBe("GitHub");
			expect(typeof getGitHubIconHelper.fn).toBe("function");
		});
	});

	describe("formatTestPathHelper", () => {
		it("should format test paths with > separators", () => {
			expect(formatTestPathHelper.fn("filename.ts > suiteone > suitetwo", "test name")).toBe(
				"filename.ts ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) suiteone ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) suitetwo ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) test name"
			);
		});

		it("should format test paths with spaces", () => {
			expect(formatTestPathHelper.fn("User Tests Authentication", "Login Test")).toBe(
				"User ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) Tests ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) Authentication ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) Login Test"
			);
		});

		it("should format test paths with mixed separators", () => {
			expect(formatTestPathHelper.fn("Suite A > Suite B &gt; Suite C", "Test Name")).toBe(
				"Suite ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) A ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) Suite ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) B ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) Suite ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) C ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) Test Name"
			);
		});

		it("should handle single path segment", () => {
			expect(formatTestPathHelper.fn("SingleSuite", "Test Name")).toBe(
				"SingleSuite ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) Test Name"
			);
		});

		it("should handle empty suite path", () => {
			expect(formatTestPathHelper.fn("", "Test Name")).toBe("Test Name");
			expect(formatTestPathHelper.fn(null, "Test Name")).toBe("Test Name");
			expect(formatTestPathHelper.fn(undefined, "Test Name")).toBe("Test Name");
		});

		it("should handle empty test name", () => {
			expect(formatTestPathHelper.fn("Suite Path", "")).toBe("Suite Path");
			expect(formatTestPathHelper.fn("Suite Path", null)).toBe("Suite Path");
			expect(formatTestPathHelper.fn("Suite Path", undefined)).toBe("Suite Path");
		});

		it("should handle both empty inputs", () => {
			expect(formatTestPathHelper.fn("", "")).toBe("");
			expect(formatTestPathHelper.fn(null, null)).toBe("");
			expect(formatTestPathHelper.fn(undefined, undefined)).toBe("");
		});

		it("should trim whitespace from path segments", () => {
			expect(formatTestPathHelper.fn("  Suite A  >  Suite B  ", "  Test Name  ")).toBe(
				"Suite ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) A ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) Suite ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) B ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) Test Name"
			);
		});

		it("should filter out empty path segments", () => {
			expect(formatTestPathHelper.fn("Suite A >  > Suite B >  > Suite C", "Test Name")).toBe(
				"Suite ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) A ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) Suite ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) B ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) Suite ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) C ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) Test Name"
			);
		});

		it("should be registered correctly", () => {
			expect(formatTestPathHelper.name).toBe("formatTestPath");
			expect(formatTestPathHelper.category).toBe("GitHub");
			expect(typeof formatTestPathHelper.fn).toBe("function");
		});
	});

	describe("githubHelpers array", () => {
		it("should contain all GitHub helpers", () => {
			expect(githubHelpers).toHaveLength(2);
			expect(githubHelpers).toContain(getGitHubIconHelper);
			expect(githubHelpers).toContain(formatTestPathHelper);
		});

		it("should have proper Helper structure for all helpers", () => {
			for (const helper of githubHelpers) {
				expect(helper).toHaveProperty("name");
				expect(helper).toHaveProperty("category");
				expect(helper).toHaveProperty("fn");
				expect(typeof helper.name).toBe("string");
				expect(helper.category).toBe("GitHub");
				expect(typeof helper.fn).toBe("function");
			}
		});

		it("should have unique names", () => {
			const names = githubHelpers.map((helper) => helper.name);
			const uniqueNames = [...new Set(names)];
			expect(names).toHaveLength(uniqueNames.length);
		});
	});
}); 