import {
	inflectHelper,
	inflectionHelpers,
	ordinalizeHelper,
} from "../../src/helpers/inflection";

describe("inflection helpers", () => {
	describe("inflectHelper", () => {
		describe("basic functionality", () => {
			it("should return singular for count of 1", () => {
				expect(inflectHelper.fn(1, "test", "tests")).toBe("test");
				expect(inflectHelper.fn("1", "failure", "failures")).toBe("failure");
				expect(inflectHelper.fn(1, "case", "cases")).toBe("case");
			});

			it("should return plural for count of 0", () => {
				expect(inflectHelper.fn(0, "test", "tests")).toBe("tests");
				expect(inflectHelper.fn("0", "failure", "failures")).toBe("failures");
				expect(inflectHelper.fn(0, "case", "cases")).toBe("cases");
			});

			it("should return plural for count greater than 1", () => {
				expect(inflectHelper.fn(2, "test", "tests")).toBe("tests");
				expect(inflectHelper.fn(5, "failure", "failures")).toBe("failures");
				expect(inflectHelper.fn("10", "case", "cases")).toBe("cases");
			});
		});

		describe("includeCount functionality", () => {
			it("should include count when includeCount is true", () => {
				expect(inflectHelper.fn(0, "test", "tests", true)).toBe("0 tests");
				expect(inflectHelper.fn(1, "test", "tests", true)).toBe("1 test");
				expect(inflectHelper.fn(5, "test", "tests", true)).toBe("5 tests");
			});

			it("should include count when includeCount is string 'true'", () => {
				expect(inflectHelper.fn(2, "error", "errors", "true")).toBe("2 errors");
				expect(inflectHelper.fn(1, "warning", "warnings", "true")).toBe(
					"1 warning",
				);
			});

			it("should not include count when includeCount is false or omitted", () => {
				expect(inflectHelper.fn(2, "test", "tests", false)).toBe("tests");
				expect(inflectHelper.fn(2, "test", "tests")).toBe("tests");
				expect(inflectHelper.fn(1, "test", "tests", false)).toBe("test");
			});
		});

		describe("edge cases", () => {
			it("should handle negative numbers", () => {
				expect(inflectHelper.fn(-1, "test", "tests")).toBe("tests");
				expect(inflectHelper.fn(-2, "test", "tests")).toBe("tests");
				expect(inflectHelper.fn(-1, "test", "tests", true)).toBe("-1 tests");
			});

			it("should handle decimal numbers", () => {
				expect(inflectHelper.fn(1.5, "test", "tests")).toBe("tests");
				expect(inflectHelper.fn(0.5, "test", "tests")).toBe("tests");
				expect(inflectHelper.fn(1.0, "test", "tests")).toBe("test");
			});

			it("should return empty string for invalid count", () => {
				expect(inflectHelper.fn("invalid", "test", "tests")).toBe("");
				expect(inflectHelper.fn(null, "test", "tests")).toBe("");
				expect(inflectHelper.fn(undefined, "test", "tests")).toBe("");
				expect(inflectHelper.fn({}, "test", "tests")).toBe("");
				expect(inflectHelper.fn([], "test", "tests")).toBe("");
			});

			it("should return empty string for invalid singular/plural forms", () => {
				expect(inflectHelper.fn(1, null, "tests")).toBe("");
				expect(inflectHelper.fn(1, "test", null)).toBe("");
				expect(inflectHelper.fn(1, undefined, "tests")).toBe("");
				expect(inflectHelper.fn(1, "test", undefined)).toBe("");
				expect(inflectHelper.fn(1, 123, "tests")).toBe("");
				expect(inflectHelper.fn(1, "test", 456)).toBe("");
			});

			it("should handle empty strings for singular/plural", () => {
				expect(inflectHelper.fn(1, "", "tests")).toBe("");
				expect(inflectHelper.fn(2, "test", "")).toBe("");
				expect(inflectHelper.fn(1, "", "")).toBe("");
			});
		});

		describe("CTRF test scenarios", () => {
			it("should handle test count scenarios", () => {
				expect(inflectHelper.fn(1, "test", "tests", true)).toBe("1 test");
				expect(inflectHelper.fn(25, "test", "tests", true)).toBe("25 tests");
				expect(inflectHelper.fn(0, "test", "tests", true)).toBe("0 tests");
			});

			it("should handle failure scenarios", () => {
				expect(inflectHelper.fn(0, "failure", "failures")).toBe("failures");
				expect(inflectHelper.fn(1, "failure", "failures")).toBe("failure");
				expect(inflectHelper.fn(3, "failure", "failures", true)).toBe(
					"3 failures",
				);
			});

			it("should handle suite scenarios", () => {
				expect(inflectHelper.fn(1, "test case", "test cases")).toBe(
					"test case",
				);
				expect(inflectHelper.fn(10, "test case", "test cases")).toBe(
					"test cases",
				);
				expect(inflectHelper.fn(5, "suite", "suites", true)).toBe("5 suites");
			});

			it("should handle error reporting scenarios", () => {
				expect(inflectHelper.fn(0, "error", "errors")).toBe("errors");
				expect(inflectHelper.fn(1, "error", "errors", true)).toBe("1 error");
				expect(inflectHelper.fn(7, "warning", "warnings", true)).toBe(
					"7 warnings",
				);
			});
		});
	});

	describe("ordinalizeHelper", () => {
		describe("basic functionality", () => {
			it("should ordinalize single digit numbers correctly", () => {
				expect(ordinalizeHelper.fn(1)).toBe("1st");
				expect(ordinalizeHelper.fn(2)).toBe("2nd");
				expect(ordinalizeHelper.fn(3)).toBe("3rd");
				expect(ordinalizeHelper.fn(4)).toBe("4th");
				expect(ordinalizeHelper.fn(5)).toBe("5th");
				expect(ordinalizeHelper.fn(6)).toBe("6th");
				expect(ordinalizeHelper.fn(7)).toBe("7th");
				expect(ordinalizeHelper.fn(8)).toBe("8th");
				expect(ordinalizeHelper.fn(9)).toBe("9th");
			});

			it("should handle special cases for 11th, 12th, 13th", () => {
				expect(ordinalizeHelper.fn(11)).toBe("11th");
				expect(ordinalizeHelper.fn(12)).toBe("12th");
				expect(ordinalizeHelper.fn(13)).toBe("13th");
				expect(ordinalizeHelper.fn(111)).toBe("111th");
				expect(ordinalizeHelper.fn(112)).toBe("112th");
				expect(ordinalizeHelper.fn(113)).toBe("113th");
			});

			it("should ordinalize numbers ending in 1, 2, 3 correctly", () => {
				expect(ordinalizeHelper.fn(21)).toBe("21st");
				expect(ordinalizeHelper.fn(22)).toBe("22nd");
				expect(ordinalizeHelper.fn(23)).toBe("23rd");
				expect(ordinalizeHelper.fn(31)).toBe("31st");
				expect(ordinalizeHelper.fn(42)).toBe("42nd");
				expect(ordinalizeHelper.fn(53)).toBe("53rd");
				expect(ordinalizeHelper.fn(101)).toBe("101st");
				expect(ordinalizeHelper.fn(102)).toBe("102nd");
				expect(ordinalizeHelper.fn(103)).toBe("103rd");
			});

			it("should handle larger numbers", () => {
				expect(ordinalizeHelper.fn(100)).toBe("100th");
				expect(ordinalizeHelper.fn(1001)).toBe("1001st");
				expect(ordinalizeHelper.fn(1002)).toBe("1002nd");
				expect(ordinalizeHelper.fn(1003)).toBe("1003rd");
				expect(ordinalizeHelper.fn(1011)).toBe("1011th");
			});

			it("should handle string numbers", () => {
				expect(ordinalizeHelper.fn("1")).toBe("1st");
				expect(ordinalizeHelper.fn("21")).toBe("21st");
				expect(ordinalizeHelper.fn("22")).toBe("22nd");
				expect(ordinalizeHelper.fn("11")).toBe("11th");
			});
		});

		describe("edge cases", () => {
			it("should handle zero", () => {
				expect(ordinalizeHelper.fn(0)).toBe("0th");
				expect(ordinalizeHelper.fn("0")).toBe("0th");
			});

			it("should handle negative numbers", () => {
				expect(ordinalizeHelper.fn(-1)).toBe("-1st");
				expect(ordinalizeHelper.fn(-2)).toBe("-2nd");
				expect(ordinalizeHelper.fn(-3)).toBe("-3rd");
				expect(ordinalizeHelper.fn(-11)).toBe("-11th");
				expect(ordinalizeHelper.fn(-21)).toBe("-21st");
			});

			it("should return empty string for invalid input", () => {
				expect(ordinalizeHelper.fn("invalid")).toBe("");
				expect(ordinalizeHelper.fn(null)).toBe("");
				expect(ordinalizeHelper.fn(undefined)).toBe("");
				expect(ordinalizeHelper.fn({})).toBe("");
				expect(ordinalizeHelper.fn([])).toBe("");
				expect(ordinalizeHelper.fn("abc")).toBe("");
			});

			it("should handle decimal numbers by truncating", () => {
				expect(ordinalizeHelper.fn(1.9)).toBe("1st");
				expect(ordinalizeHelper.fn(2.1)).toBe("2nd");
				expect(ordinalizeHelper.fn(3.7)).toBe("3rd");
				expect(ordinalizeHelper.fn(11.5)).toBe("11th");
			});
		});

		describe("CTRF test scenarios", () => {
			it("should handle test attempt scenarios", () => {
				expect(ordinalizeHelper.fn(1)).toBe("1st");
				expect(ordinalizeHelper.fn(2)).toBe("2nd");
				expect(ordinalizeHelper.fn(3)).toBe("3rd");
				expect(ordinalizeHelper.fn(5)).toBe("5th");
			});

			it("should handle retry scenarios", () => {
				expect(ordinalizeHelper.fn(1)).toBe("1st");
				expect(ordinalizeHelper.fn(2)).toBe("2nd");
				expect(ordinalizeHelper.fn(10)).toBe("10th");
			});

			it("should handle suite positioning", () => {
				expect(ordinalizeHelper.fn(1)).toBe("1st");
				expect(ordinalizeHelper.fn(3)).toBe("3rd");
				expect(ordinalizeHelper.fn(11)).toBe("11th");
				expect(ordinalizeHelper.fn(21)).toBe("21st");
			});

			it("should handle ranking scenarios", () => {
				expect(ordinalizeHelper.fn(1)).toBe("1st");
				expect(ordinalizeHelper.fn(2)).toBe("2nd");
				expect(ordinalizeHelper.fn(3)).toBe("3rd");
				expect(ordinalizeHelper.fn(42)).toBe("42nd");
				expect(ordinalizeHelper.fn(101)).toBe("101st");
			});
		});
	});

	describe("inflectionHelpers export", () => {
		it("should contain all inflection helpers", () => {
			expect(inflectionHelpers).toHaveLength(2);
			expect(inflectionHelpers.map((h) => h.name)).toEqual([
				"inflect",
				"ordinalize",
			]);
		});

		it("should have proper helper structure", () => {
			inflectionHelpers.forEach((helper) => {
				expect(helper).toHaveProperty("name");
				expect(helper).toHaveProperty("category", "Inflection");
				expect(helper).toHaveProperty("fn");
				expect(typeof helper.fn).toBe("function");
			});
		});
	});
});
