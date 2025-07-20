import { testHelper, toRegexHelper } from "../../src/helpers/regex";

describe("toRegexHelper", () => {
	it("should convert string to RegExp", () => {
		const result = toRegexHelper.fn("foo");
		expect(result).toBeInstanceOf(RegExp);
		if (result instanceof RegExp) {
			expect(result.source).toBe("foo");
		}
	});

	it("should return null for non-string input", () => {
		expect(toRegexHelper.fn(null as unknown)).toBeNull();
		expect(toRegexHelper.fn(undefined as unknown)).toBeNull();
		expect(toRegexHelper.fn(123 as unknown)).toBeNull();
		expect(toRegexHelper.fn({} as unknown)).toBeNull();
	});

	it("should return null for invalid regex pattern", () => {
		expect(toRegexHelper.fn("[")).toBeNull();
		expect(toRegexHelper.fn("(unclosed")).toBeNull();
	});
});

describe("testHelper", () => {
	it("should return true if string matches regex", () => {
		const regex = /foo/;
		expect(testHelper.fn("foobar", regex)).toBe(true);
		expect(testHelper.fn("foo", regex)).toBe(true);
	});

	it("should return false if string does not match regex", () => {
		const regex = /foo/;
		expect(testHelper.fn("bar", regex)).toBe(false);
		expect(testHelper.fn("baz", regex)).toBe(false);
	});

	it("should return false for non-string input", () => {
		const regex = /foo/;
		expect(testHelper.fn(null as unknown, regex)).toBe(false);
		expect(testHelper.fn(undefined as unknown, regex)).toBe(false);
		expect(testHelper.fn(123 as unknown, regex)).toBe(false);
	});

	it("should return false if regex is not a RegExp", () => {
		expect(testHelper.fn("foo", null as unknown)).toBe(false);
		expect(testHelper.fn("foo", undefined as unknown)).toBe(false);
		expect(testHelper.fn("foo", "foo" as unknown)).toBe(false);
		expect(testHelper.fn("foo", 123 as unknown)).toBe(false);
	});

	it("should work for CTRF-style test name filtering", () => {
		// Simulate filtering test names in a CTRF report
		const loginRegex = toRegexHelper.fn("^Login");
		expect(testHelper.fn("Login Test: User", loginRegex)).toBe(true);
		expect(testHelper.fn("Logout Test: User", loginRegex)).toBe(false);
	});

	it("should work for error message highlighting in CTRF", () => {
		const timeoutRegex = toRegexHelper.fn("timeout");
		expect(testHelper.fn("Test failed due to timeout", timeoutRegex)).toBe(
			true,
		);
		expect(testHelper.fn("Test failed due to error", timeoutRegex)).toBe(false);
	});
});
