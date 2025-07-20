import { isMatchHelper, matchHelper, matchHelpers } from "../../src/helpers/match";

describe("matchHelper", () => {
	describe("basic functionality", () => {
		it("should match single file with single pattern", () => {
			expect(matchHelper.fn("test.js", "*.js")).toEqual(["test.js"]);
			expect(matchHelper.fn("test.ts", "*.js")).toEqual([]);
		});

		it("should match array of files with single pattern", () => {
			const files = ["test.js", "spec.ts", "config.json"];
			expect(matchHelper.fn(files, "*.js")).toEqual(["test.js"]);
			expect(matchHelper.fn(files, "*.ts")).toEqual(["spec.ts"]);
			expect(matchHelper.fn(files, "*.json")).toEqual(["config.json"]);
		});

		it("should match files with multiple patterns", () => {
			const files = ["test.js", "spec.ts", "config.json", "data.xml"];
			const patterns = ["*.js", "*.ts"];
			expect(matchHelper.fn(files, patterns)).toEqual(["test.js", "spec.ts"]);
		});

		it("should match glob patterns", () => {
			const files = [
				"src/test.spec.js",
				"src/utils.js",
				"tests/integration.test.js",
				"config.json",
			];
			expect(matchHelper.fn(files, "**/*.spec.js")).toEqual([
				"src/test.spec.js",
			]);
			expect(matchHelper.fn(files, "**/*.test.js")).toEqual([
				"tests/integration.test.js",
			]);
			expect(matchHelper.fn(files, "src/*.js")).toEqual([
				"src/test.spec.js",
				"src/utils.js",
			]);
		});
	});

	describe("CTRF test scenarios", () => {
		it("should filter test files by type", () => {
			const testFiles = [
				"auth.test.js",
				"login.spec.js",
				"utils.js",
				"database.integration.test.ts",
				"api.e2e.spec.ts",
			];

			// Filter spec files
			expect(matchHelper.fn(testFiles, "*.spec.*")).toEqual([
				"login.spec.js",
				"api.e2e.spec.ts",
			]);

			// Filter test files
			expect(matchHelper.fn(testFiles, "*.test.*")).toEqual([
				"auth.test.js",
				"database.integration.test.ts",
			]);

			// Filter TypeScript files
			expect(matchHelper.fn(testFiles, "*.ts")).toEqual([
				"database.integration.test.ts",
				"api.e2e.spec.ts",
			]);
		});

		it("should filter test artifacts", () => {
			const artifacts = [
				"screenshot-1.png",
				"test-report.html",
				"coverage.json",
				"error-log.txt",
				"performance-chart.svg",
			];

			// Filter images
			expect(matchHelper.fn(artifacts, "*.png")).toEqual(["screenshot-1.png"]);
			expect(matchHelper.fn(artifacts, "*.svg")).toEqual([
				"performance-chart.svg",
			]);

			// Filter reports
			expect(matchHelper.fn(artifacts, "*.html")).toEqual(["test-report.html"]);
			expect(matchHelper.fn(artifacts, "*.json")).toEqual(["coverage.json"]);
		});

		it("should handle nested test structure", () => {
			const testPaths = [
				"src/components/Button.test.tsx",
				"src/utils/validation.spec.ts",
				"tests/e2e/login.test.js",
				"tests/integration/database.test.js",
				"src/services/api.test.ts",
			];

			// Find all component tests
			expect(matchHelper.fn(testPaths, "src/components/**")).toEqual([
				"src/components/Button.test.tsx",
			]);

			// Find all e2e tests
			expect(matchHelper.fn(testPaths, "tests/e2e/**")).toEqual([
				"tests/e2e/login.test.js",
			]);

			// Find all TypeScript test files
			expect(matchHelper.fn(testPaths, "**/*.test.ts")).toEqual([
				"src/services/api.test.ts",
			]);
		});
	});

	describe("edge cases", () => {
		it("should handle empty inputs", () => {
			expect(matchHelper.fn([], "*.js")).toEqual([]);
			expect(matchHelper.fn(["test.js"], [])).toEqual([]);
			expect(matchHelper.fn("", "*.js")).toEqual([]); // Empty string doesn't match *.js
		});

		it("should handle non-string files", () => {
			const mixedArray = ["test.js", 123, null, "spec.ts", undefined];
			expect(matchHelper.fn(mixedArray, "*.js")).toEqual(["test.js"]);
			expect(matchHelper.fn(mixedArray, "*.ts")).toEqual(["spec.ts"]);
		});

		it("should handle non-string patterns", () => {
			const files = ["test.js", "spec.ts"];
			expect(matchHelper.fn(files, [123, "*.js", null])).toEqual(["test.js"]);
		});

		it("should handle invalid inputs", () => {
			expect(matchHelper.fn(null, "*.js")).toEqual([]);
			expect(matchHelper.fn(undefined, "*.js")).toEqual([]);
			expect(matchHelper.fn(123, "*.js")).toEqual([]);
			expect(matchHelper.fn(["test.js"], null)).toEqual([]);
			expect(matchHelper.fn(["test.js"], undefined)).toEqual([]);
		});
	});

	describe("helper properties", () => {
		it("should have correct helper properties", () => {
			expect(matchHelper.name).toBe("match");
			expect(matchHelper.category).toBe("String");
			expect(typeof matchHelper.fn).toBe("function");
		});
	});
});

describe("isMatchHelper", () => {
	describe("basic functionality", () => {
		it("should match basic glob patterns", () => {
			expect(isMatchHelper.fn("test.js", "*.js")).toBe(true);
			expect(isMatchHelper.fn("test.ts", "*.js")).toBe(false);
			expect(isMatchHelper.fn("config.json", "*.json")).toBe(true);
		});

		it("should match complex glob patterns", () => {
			expect(
				isMatchHelper.fn("src/components/Button.test.tsx", "**/*.test.*"),
			).toBe(true);
			expect(isMatchHelper.fn("src/utils/helper.js", "src/**/*.js")).toBe(true);
			expect(isMatchHelper.fn("tests/e2e/login.spec.js", "**/e2e/**")).toBe(
				true,
			);
		});

		it("should handle wildcard patterns", () => {
			expect(isMatchHelper.fn("user-login.spec.ts", "*.spec.*")).toBe(true);
			expect(
				isMatchHelper.fn("database.integration.test.js", "*.test.js"),
			).toBe(true);
			expect(isMatchHelper.fn("api.service.ts", "*.service.*")).toBe(true);
		});
	});

	describe("CTRF test scenarios", () => {
		it("should categorize test files", () => {
			// Unit tests
			expect(isMatchHelper.fn("auth.test.js", "*.test.js")).toBe(true);
			expect(isMatchHelper.fn("login.spec.ts", "*.spec.*")).toBe(true);

			// Integration tests
			expect(
				isMatchHelper.fn("database.integration.test.js", "*.integration.*"),
			).toBe(true);
			expect(isMatchHelper.fn("api.e2e.spec.ts", "*.e2e.*")).toBe(true);

			// Component tests
			expect(isMatchHelper.fn("Button.test.tsx", "*.test.tsx")).toBe(true);
			expect(isMatchHelper.fn("Modal.spec.jsx", "*.spec.jsx")).toBe(true);
		});

		it("should identify test artifacts", () => {
			// Screenshots
			expect(isMatchHelper.fn("test-screenshot.png", "**/*.png")).toBe(true);
			expect(isMatchHelper.fn("error-capture.jpg", "**/*.jpg")).toBe(true);

			// Reports
			expect(isMatchHelper.fn("coverage-report.html", "*.html")).toBe(true);
			expect(isMatchHelper.fn("test-results.json", "*.json")).toBe(true);
			expect(isMatchHelper.fn("performance.xml", "*.xml")).toBe(true);

			// Logs
			expect(isMatchHelper.fn("test.log", "*.log")).toBe(true);
			expect(isMatchHelper.fn("error.txt", "*.txt")).toBe(true);
		});

		it("should work with nested paths", () => {
			// Deep nested test files
			expect(
				isMatchHelper.fn(
					"src/components/forms/LoginForm.test.tsx",
					"**/components/**/*.test.*",
				),
			).toBe(true);
			expect(
				isMatchHelper.fn(
					"tests/integration/api/auth.spec.js",
					"**/integration/**",
				),
			).toBe(true);
			expect(
				isMatchHelper.fn(
					"e2e/scenarios/user-journey.test.js",
					"e2e/**/*.test.js",
				),
			).toBe(true);
		});

		it("should handle test file naming conventions", () => {
			// Jest patterns
			expect(isMatchHelper.fn("Button.test.js", "*.test.js")).toBe(true);
			expect(isMatchHelper.fn("utils.spec.ts", "*.spec.ts")).toBe(true);

			// Mocha patterns
			expect(isMatchHelper.fn("auth.test.js", "*.test.*")).toBe(true);
			expect(isMatchHelper.fn("login.spec.coffee", "*.spec.*")).toBe(true);

			// Custom patterns
			expect(
				isMatchHelper.fn("database.integration.js", "*.integration.*"),
			).toBe(true);
			expect(isMatchHelper.fn("api.e2e.ts", "*.e2e.*")).toBe(true);
		});
	});

	describe("edge cases", () => {
		it("should handle empty strings", () => {
			expect(isMatchHelper.fn("", "")).toBe(true);
			expect(isMatchHelper.fn("", "*.js")).toBe(false);
			expect(isMatchHelper.fn("test.js", "")).toBe(false); // Empty pattern doesn't match anything in minimatch
		});

		it("should handle special characters", () => {
			expect(isMatchHelper.fn("test-file.spec.js", "*-*.spec.js")).toBe(true);
			expect(isMatchHelper.fn("user_auth.test.ts", "*_*.test.*")).toBe(true);
			expect(isMatchHelper.fn("api.v2.test.js", "*.v*.test.*")).toBe(true);
		});

		it("should be case sensitive", () => {
			expect(isMatchHelper.fn("Test.js", "*.js")).toBe(true);
			expect(isMatchHelper.fn("test.JS", "*.js")).toBe(false);
			expect(isMatchHelper.fn("TEST.js", "test.*")).toBe(false);
		});

		it("should handle invalid inputs", () => {
			expect(isMatchHelper.fn(null, "*.js")).toBe(false);
			expect(isMatchHelper.fn(undefined, "*.js")).toBe(false);
			expect(isMatchHelper.fn(123, "*.js")).toBe(false);
			expect(isMatchHelper.fn("test.js", null)).toBe(false);
			expect(isMatchHelper.fn("test.js", undefined)).toBe(false);
			expect(isMatchHelper.fn("test.js", 123)).toBe(false);
		});
	});

	describe("helper properties", () => {
		it("should have correct helper properties", () => {
			expect(isMatchHelper.name).toBe("isMatch");
			expect(isMatchHelper.category).toBe("String");
			expect(typeof isMatchHelper.fn).toBe("function");
		});
	});
});

describe("matchHelpers export", () => {
	it("should export both helpers", () => {
		expect(matchHelpers).toHaveLength(2);
		expect(matchHelpers).toContain(matchHelper);
		expect(matchHelpers).toContain(isMatchHelper);
	});

	it("should have correct helper names", () => {
		const helperNames = matchHelpers.map((helper) => helper.name);
		expect(helperNames).toEqual(["match", "isMatch"]);
	});

	it("should have correct categories", () => {
		matchHelpers.forEach((helper) => {
			expect(helper.category).toBe("String");
		});
	});
});
