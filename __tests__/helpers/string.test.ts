import type { Helper } from "../../src/helper-registry";
import {
	ansiToHtmlHelper,
	appendHelper,
	camelCaseHelper,
	capitalizeAllHelper,
	capitalizeHelper,
	centerHelper,
	chopHelper,
	dashCaseHelper,
	dotCaseHelper,
	downCaseHelper,
	ellipsisHelper,
	escapeMarkdownHelper,
	hyphenateHelper,
	isStringHelper,
	lowerCaseHelper,
	occurrencesHelper,
	pascalCaseHelper,
	pathCaseHelper,
	plusifyHelper,
	prependHelper,
	rawHelper,
	removeFirstHelper,
	removeHelper,
	replaceFirstHelper,
	replaceHelper,
	reverseHelper,
	sentenceHelper,
	sliceStringHelper,
	snakeCaseHelper,
	splitHelper,
	splitLinesHelper,
	startsWithHelper,
	stripAnsiHelper,
	stringHelpers,
	titleizeHelper,
	trimHelper,
	trimLeftHelper,
	trimRightHelper,
	truncateHelper,
	truncateWordsHelper,
	upcaseHelper,
	uppercaseHelper,
} from "../../src/helpers/string";

// Tests for new helpers (plusify through uppercase)

describe("plusifyHelper", () => {
	it("should replace spaces with plus signs", () => {
		expect(plusifyHelper.fn("User Login Test")).toBe("User+Login+Test");
		expect(plusifyHelper.fn("API Endpoint Test")).toBe("API+Endpoint+Test");
	});

	it("should handle edge cases", () => {
		expect(plusifyHelper.fn("")).toBe("");
		expect(plusifyHelper.fn("NoSpaces")).toBe("NoSpaces");
		expect(plusifyHelper.fn("  multiple   spaces  ")).toBe(
			"++multiple+++spaces++",
		);
	});

	it("should return empty string for non-string input", () => {
		expect(plusifyHelper.fn(null as unknown)).toBe("");
		expect(plusifyHelper.fn(undefined as unknown)).toBe("");
		expect(plusifyHelper.fn(123 as unknown)).toBe("");
	});
});

describe("prependHelper", () => {
	it("should prepend string with prefix", () => {
		expect(prependHelper.fn("User Login", "✓ ")).toBe("✓ User Login");
		expect(prependHelper.fn("PASSED", "Status: ")).toBe("Status: PASSED");
	});

	it("should handle edge cases", () => {
		expect(prependHelper.fn("", "prefix")).toBe("prefix");
		expect(prependHelper.fn("test", "")).toBe("test");
		expect(prependHelper.fn("", "")).toBe("");
	});

	it("should return empty string for non-string input", () => {
		expect(prependHelper.fn(null as unknown, "prefix")).toBe("");
		expect(prependHelper.fn("test", null as unknown)).toBe("");
		expect(prependHelper.fn(123 as unknown, "prefix")).toBe("");
	});
});

describe("rawHelper", () => {
	it("should return raw content from options.fn", () => {
		const mockOptions = {
			fn: () => "{{test.name}} - {{test.status}}",
		};
		expect(rawHelper.fn.call({}, mockOptions)).toBe(
			"{{test.name}} - {{test.status}}",
		);
	});

	it("should handle missing options.fn", () => {
		expect(rawHelper.fn.call({}, {})).toBe("");
		expect(rawHelper.fn.call({}, { fn: null })).toBe("");
	});
});

describe("removeHelper", () => {
	it("should remove all occurrences of substring", () => {
		expect(removeHelper.fn("User_Login_Test_Suite", "_")).toBe(
			"UserLoginTestSuite",
		);
		expect(removeHelper.fn("test_name_test", "test")).toBe("_name_");
	});

	it("should handle edge cases", () => {
		expect(removeHelper.fn("test", "xyz")).toBe("test");
		expect(removeHelper.fn("", "test")).toBe("");
		expect(removeHelper.fn("test", "")).toBe("test");
	});

	it("should return empty string for non-string input", () => {
		expect(removeHelper.fn(null as unknown, "test")).toBe("");
		expect(removeHelper.fn("test", null as unknown)).toBe("");
	});
});

describe("removeFirstHelper", () => {
	it("should remove first occurrence of substring", () => {
		expect(removeFirstHelper.fn("API_Test_API_Suite", "API_")).toBe(
			"Test_API_Suite",
		);
		expect(removeFirstHelper.fn("test_name_test", "test")).toBe("_name_test");
	});

	it("should handle edge cases", () => {
		expect(removeFirstHelper.fn("test", "xyz")).toBe("test");
		expect(removeFirstHelper.fn("", "test")).toBe("");
		expect(removeFirstHelper.fn("test", "")).toBe("test");
	});

	it("should return empty string for non-string input", () => {
		expect(removeFirstHelper.fn(null as unknown, "test")).toBe("");
		expect(removeFirstHelper.fn("test", null as unknown)).toBe("");
	});
});

describe("replaceHelper", () => {
	it("should replace all occurrences", () => {
		expect(replaceHelper.fn("User_Login_Test", "_", " ")).toBe(
			"User Login Test",
		);
		expect(replaceHelper.fn("PASSED", "PASSED", "✓ PASSED")).toBe("✓ PASSED");
	});

	it("should handle edge cases", () => {
		expect(replaceHelper.fn("test", "xyz", "abc")).toBe("test");
		expect(replaceHelper.fn("", "test", "abc")).toBe("");
		expect(replaceHelper.fn("test", "", "abc")).toBe("test");
	});

	it("should return empty string for non-string input", () => {
		expect(replaceHelper.fn(null as unknown, "a", "b")).toBe("");
		expect(replaceHelper.fn("test", null as unknown, "b")).toBe("");
		expect(replaceHelper.fn("test", "a", null as unknown)).toBe("");
	});
});

describe("replaceFirstHelper", () => {
	it("should replace first occurrence only", () => {
		expect(replaceFirstHelper.fn("Test Login Test", "Test", "Suite")).toBe(
			"Suite Login Test",
		);
		expect(
			replaceFirstHelper.fn("Error: Connection failed", "Error:", "⚠️ Error:"),
		).toBe("⚠️ Error: Connection failed");
	});

	it("should handle edge cases", () => {
		expect(replaceFirstHelper.fn("test", "xyz", "abc")).toBe("test");
		expect(replaceFirstHelper.fn("", "test", "abc")).toBe("");
		expect(replaceFirstHelper.fn("test", "", "abc")).toBe("test");
	});

	it("should return empty string for non-string input", () => {
		expect(replaceFirstHelper.fn(null as unknown, "a", "b")).toBe("");
		expect(replaceFirstHelper.fn("test", null as unknown, "b")).toBe("");
		expect(replaceFirstHelper.fn("test", "a", null as unknown)).toBe("");
	});
});

describe("reverseHelper", () => {
	it("should reverse string", () => {
		expect(reverseHelper.fn("Login Test")).toBe("tseT nigoL");
		expect(reverseHelper.fn("API")).toBe("IPA");
	});

	it("should handle edge cases", () => {
		expect(reverseHelper.fn("")).toBe("");
		expect(reverseHelper.fn("a")).toBe("a");
		expect(reverseHelper.fn("12345")).toBe("54321");
	});

	it("should return empty string for non-string input", () => {
		expect(reverseHelper.fn(null as unknown)).toBe("");
		expect(reverseHelper.fn(undefined as unknown)).toBe("");
		expect(reverseHelper.fn(123 as unknown)).toBe("");
	});
});

describe("sentenceHelper", () => {
	it("should capitalize first letter of each sentence", () => {
		expect(sentenceHelper.fn("hello world. goodbye world.")).toBe(
			"Hello world. Goodbye world.",
		);
		expect(sentenceHelper.fn("test failed! check logs? try again.")).toBe(
			"Test failed! Check logs? Try again.",
		);
	});

	it("should handle edge cases", () => {
		expect(sentenceHelper.fn("")).toBe("");
		expect(sentenceHelper.fn("no punctuation")).toBe("No punctuation");
		expect(sentenceHelper.fn("ALREADY CAPS. second sentence.")).toBe(
			"ALREADY CAPS. Second sentence.",
		);
	});

	it("should return empty string for non-string input", () => {
		expect(sentenceHelper.fn(null as unknown)).toBe("");
		expect(sentenceHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("sliceStringHelper", () => {
	it("should extract substring with start and end indices", () => {
		expect(sliceStringHelper.fn("d9a40a70dd26e3b309e9d106adaca2417d4ffb1e", 0, 7)).toBe("d9a40a7");
		expect(sliceStringHelper.fn("User Login Test", 5, 10)).toBe("Login");
		expect(sliceStringHelper.fn("Hello World", 0, 5)).toBe("Hello");
		expect(sliceStringHelper.fn("Test Case", 5, 9)).toBe("Case");
	});

	it("should extract substring from start to end when end is omitted", () => {
		expect(sliceStringHelper.fn("d9a40a70dd26e3b309e9d106adaca2417d4ffb1e", 8)).toBe("dd26e3b309e9d106adaca2417d4ffb1e");
		expect(sliceStringHelper.fn("User Login Test", 5)).toBe("Login Test");
		expect(sliceStringHelper.fn("Hello World", 6)).toBe("World");
	});

	it("should handle string indices", () => {
		expect(sliceStringHelper.fn("Test String", "2", "6")).toBe("st S");
		expect(sliceStringHelper.fn("Hello World", "0", "5")).toBe("Hello");
		expect(sliceStringHelper.fn("API Test", "4")).toBe("Test");
	});

	it("should handle commit hash scenarios", () => {
		const commitHash = "a1b2c3d4e5f6789012345678901234567890abcd";
		expect(sliceStringHelper.fn(commitHash, 0, 8)).toBe("a1b2c3d4");
		expect(sliceStringHelper.fn(commitHash, 0, 12)).toBe("a1b2c3d4e5f6");
		expect(sliceStringHelper.fn(commitHash, 8, 16)).toBe("e5f67890");
	});

	it("should handle test ID extraction", () => {
		expect(sliceStringHelper.fn("TEST_USER_LOGIN_001", 5, 9)).toBe("USER");
		expect(sliceStringHelper.fn("API_ENDPOINT_VALIDATION_TEST", 0, 3)).toBe("API");
		expect(sliceStringHelper.fn("DB_CONNECTION_TEST_SUITE", 14, 18)).toBe("TEST");
	});

	it("should handle edge cases", () => {
		expect(sliceStringHelper.fn("", 0, 5)).toBe("");
		expect(sliceStringHelper.fn("Test", 0, 0)).toBe("");
		expect(sliceStringHelper.fn("Test", 2, 2)).toBe("");
		expect(sliceStringHelper.fn("Test", 10, 20)).toBe("");
		expect(sliceStringHelper.fn("Test", -2, 2)).toBe(""); // -2 becomes index 2, slice(2,2) = ""
	});

	it("should handle negative indices like native slice", () => {
		expect(sliceStringHelper.fn("Hello World", -5, -1)).toBe("Worl");
		expect(sliceStringHelper.fn("Test Case", -4)).toBe("Case");
		expect(sliceStringHelper.fn("User Login", -5, -1)).toBe("Logi");
	});

	it("should handle invalid indices gracefully", () => {
		expect(sliceStringHelper.fn("Test String", "invalid", 5)).toBe("Test ");
		expect(sliceStringHelper.fn("Test String", 0, "invalid")).toBe("Test String");
		expect(sliceStringHelper.fn("Test String", "abc", "def")).toBe("Test String");
	});

	it("should handle non-string inputs", () => {
		expect(sliceStringHelper.fn(null as unknown, 0, 5)).toBe("");
		expect(sliceStringHelper.fn(undefined as unknown, 0, 5)).toBe("");
		expect(sliceStringHelper.fn(123 as unknown, 0, 2)).toBe("");
		expect(sliceStringHelper.fn({} as unknown, 0, 5)).toBe("");
	});

	it("should handle CTRF test scenarios", () => {
		expect(sliceStringHelper.fn("test_user_authentication_flow", 5, 9)).toBe("user");
		expect(sliceStringHelper.fn("FAILED_API_ENDPOINT_TEST", 7, 10)).toBe("API");
		expect(sliceStringHelper.fn("integration_test_suite_v2.1.0", 12, 16)).toBe("test");
		expect(sliceStringHelper.fn("error_validation_check_001", 0, 5)).toBe("error");
	});

	it("should handle file path extraction", () => {
		expect(sliceStringHelper.fn("src/components/UserLogin.tsx", 4, 14)).toBe("components");
		expect(sliceStringHelper.fn("/path/to/test/file.js", 9, 13)).toBe("test");
		expect(sliceStringHelper.fn("tests/unit/auth.spec.ts", 11, 15)).toBe("auth");
	});

	it("should be categorized as String helper", () => {
		expect(sliceStringHelper.category).toBe("String");
		expect(sliceStringHelper.name).toBe("sliceString");
	});
});

describe("snakeCaseHelper", () => {
	it("should convert to snake_case", () => {
		expect(snakeCaseHelper.fn("User Login Test")).toBe("user_login_test");
		expect(snakeCaseHelper.fn("API Endpoint Tests")).toBe("api_endpoint_tests");
		expect(snakeCaseHelper.fn("Database_Connection-Test")).toBe(
			"database_connection_test",
		);
	});

	it("should handle edge cases", () => {
		expect(snakeCaseHelper.fn("")).toBe("");
		expect(snakeCaseHelper.fn("alreadysnakecase")).toBe("alreadysnakecase");
		expect(snakeCaseHelper.fn("   spaced   words   ")).toBe("spaced_words");
	});

	it("should return empty string for non-string input", () => {
		expect(snakeCaseHelper.fn(null as unknown)).toBe("");
		expect(snakeCaseHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("splitHelper", () => {
	it("should split string by separator", () => {
		expect(splitHelper.fn("unit,integration,api", ",")).toEqual([
			"unit",
			"integration",
			"api",
		]);
		expect(splitHelper.fn("User Login Test", " ")).toEqual([
			"User",
			"Login",
			"Test",
		]);
	});

	it("should handle edge cases", () => {
		expect(splitHelper.fn("", ",")).toEqual([""]);
		expect(splitHelper.fn("no-separator", ",")).toEqual(["no-separator"]);
		expect(splitHelper.fn("test", "")).toEqual(["t", "e", "s", "t"]);
	});

	it("should return array for non-string input", () => {
		expect(splitHelper.fn(null as unknown, ",")).toEqual([]);
		expect(splitHelper.fn("test", null as unknown)).toEqual(["test"]);
	});
});

describe("splitLinesHelper", () => {
	it("should split multiline text into lines, removing empty lines", () => {
		expect(splitLinesHelper.fn("Line one\nLine two\nLine three")).toEqual([
			"Line one",
			"Line two", 
			"Line three"
		]);
		
		expect(splitLinesHelper.fn("Line one\n\nLine two\nLine three")).toEqual([
			"Line one",
			"Line two",
			"Line three"
		]);
	});

	it("should handle various types of empty lines", () => {
		expect(splitLinesHelper.fn("Line 1\n\nLine 3\n   \nLine 5")).toEqual([
			"Line 1",
			"Line 3",
			"Line 5"
		]);
		
		expect(splitLinesHelper.fn("Line 1\n\t\nLine 3\n \n \nLine 6")).toEqual([
			"Line 1",
			"Line 3",
			"Line 6"
		]);
	});

	it("should handle stack traces and error messages", () => {
		const stackTrace = "Error: Test failed\n  at test.js:10:5\n\n  at runner.js:45:12\n  at main.js:20:3";
		expect(splitLinesHelper.fn(stackTrace)).toEqual([
			"Error: Test failed",
			"  at test.js:10:5",
			"  at runner.js:45:12",
			"  at main.js:20:3"
		]);
	});

	it("should handle console output with empty lines", () => {
		const consoleOutput = "Starting tests...\n\n✓ Test 1 passed\n✗ Test 2 failed\n\nTest run complete";
		expect(splitLinesHelper.fn(consoleOutput)).toEqual([
			"Starting tests...",
			"✓ Test 1 passed",
			"✗ Test 2 failed",
			"Test run complete"
		]);
	});

	it("should handle CTRF test scenarios", () => {
		const testOutput = "[PASSED] User login test\n\n[FAILED] Password validation\n  Expected: valid\n  Actual: invalid\n\n[SKIPPED] OAuth integration";
		expect(splitLinesHelper.fn(testOutput)).toEqual([
			"[PASSED] User login test",
			"[FAILED] Password validation",
			"  Expected: valid",
			"  Actual: invalid",
			"[SKIPPED] OAuth integration"
		]);
	});

	it("should handle edge cases", () => {
		expect(splitLinesHelper.fn("")).toEqual([]);
		expect(splitLinesHelper.fn("Single line")).toEqual(["Single line"]);
		expect(splitLinesHelper.fn("\n\n\n")).toEqual([]);
		expect(splitLinesHelper.fn("   \n  \n   \n")).toEqual([]);
		expect(splitLinesHelper.fn("\nStart\n\nEnd\n")).toEqual(["Start", "End"]);
	});

	it("should handle non-string inputs", () => {
		expect(splitLinesHelper.fn(null as unknown)).toEqual([]);
		expect(splitLinesHelper.fn(undefined as unknown)).toEqual([]);
		expect(splitLinesHelper.fn(123 as unknown)).toEqual([]);
		expect(splitLinesHelper.fn({} as unknown)).toEqual([]);
	});

	it("should handle multiline error messages", () => {
		const errorMessage = "AssertionError: expected true to be false\n\n    at Context.it (test.js:15:8)\n    at Test.run (runner.js:45:12)\n\n    + expected\n    - actual\n\n    - true\n    + false";
		expect(splitLinesHelper.fn(errorMessage)).toEqual([
			"AssertionError: expected true to be false",
			"    at Context.it (test.js:15:8)",
			"    at Test.run (runner.js:45:12)",
			"    + expected",
			"    - actual",
			"    - true",
			"    + false"
		]);
	});

	it("should preserve line content with leading/trailing spaces (but filter empty lines)", () => {
		expect(splitLinesHelper.fn("  Line with spaces  \n\n  Another line  ")).toEqual([
			"  Line with spaces  ",
			"  Another line  "
		]);
	});

	it("should be categorized as String helper", () => {
		expect(splitLinesHelper.category).toBe("String");
		expect(splitLinesHelper.name).toBe("splitLines");
	});
});

describe("startsWithHelper", () => {
	it("should check if string starts with prefix", () => {
		expect(startsWithHelper.fn("API Test Suite", "API")).toBe(true);
		expect(startsWithHelper.fn("Integration Tests", "Unit")).toBe(false);
	});

	it("should handle edge cases", () => {
		expect(startsWithHelper.fn("", "")).toBe(true);
		expect(startsWithHelper.fn("test", "")).toBe(true);
		expect(startsWithHelper.fn("", "test")).toBe(false);
	});

	it("should return false for non-string input", () => {
		expect(startsWithHelper.fn(null as unknown, "test")).toBe(false);
		expect(startsWithHelper.fn("test", null as unknown)).toBe(false);
	});
});

describe("titleizeHelper", () => {
	it("should convert to title case", () => {
		expect(titleizeHelper.fn("this is title case")).toBe("This Is Title Case");
		expect(titleizeHelper.fn("integration test suite")).toBe(
			"Integration Test Suite",
		);
	});

	it("should handle edge cases", () => {
		expect(titleizeHelper.fn("")).toBe("");
		expect(titleizeHelper.fn("UPPERCASE")).toBe("Uppercase");
		expect(titleizeHelper.fn("mixed-Case_words")).toBe("Mixed-case_words");
	});

	it("should return empty string for non-string input", () => {
		expect(titleizeHelper.fn(null as unknown)).toBe("");
		expect(titleizeHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("trimHelper", () => {
	it("should trim whitespace from both ends", () => {
		expect(trimHelper.fn(" User Login Test ")).toBe("User Login Test");
		expect(trimHelper.fn("\t\nAPI Test\t\n")).toBe("API Test");
	});

	it("should handle edge cases", () => {
		expect(trimHelper.fn("")).toBe("");
		expect(trimHelper.fn("   ")).toBe("");
		expect(trimHelper.fn("no-spaces")).toBe("no-spaces");
	});

	it("should return empty string for non-string input", () => {
		expect(trimHelper.fn(null as unknown)).toBe("");
		expect(trimHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("trimLeftHelper", () => {
	it("should trim whitespace from left only", () => {
		expect(trimLeftHelper.fn(" User Login Test ")).toBe("User Login Test ");
		expect(trimLeftHelper.fn("\t\nAPI Test")).toBe("API Test");
	});

	it("should handle edge cases", () => {
		expect(trimLeftHelper.fn("")).toBe("");
		expect(trimLeftHelper.fn("   ")).toBe("");
		expect(trimLeftHelper.fn("no-spaces")).toBe("no-spaces");
	});

	it("should return empty string for non-string input", () => {
		expect(trimLeftHelper.fn(null as unknown)).toBe("");
		expect(trimLeftHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("trimRightHelper", () => {
	it("should trim whitespace from right only", () => {
		expect(trimRightHelper.fn(" User Login Test ")).toBe(" User Login Test");
		expect(trimRightHelper.fn("API Test\t\n")).toBe("API Test");
	});

	it("should handle edge cases", () => {
		expect(trimRightHelper.fn("")).toBe("");
		expect(trimRightHelper.fn("   ")).toBe("");
		expect(trimRightHelper.fn("no-spaces")).toBe("no-spaces");
	});

	it("should return empty string for non-string input", () => {
		expect(trimRightHelper.fn(null as unknown)).toBe("");
		expect(trimRightHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("truncateHelper", () => {
	it("should truncate to specified length", () => {
		expect(truncateHelper.fn("Very Long Test Name", "10")).toBe("Very Long…");
		expect(truncateHelper.fn("Short Test", "15")).toBe("Short Test");
	});

	it("should use custom suffix", () => {
		expect(truncateHelper.fn("Long Error Message", "10", "...")).toBe(
			"Long Er...",
		);
	});

	it("should handle edge cases", () => {
		expect(truncateHelper.fn("", "10")).toBe("");
		expect(truncateHelper.fn("test", "invalid")).toBe("test");
		expect(truncateHelper.fn("test", "0")).toBe("test");
	});

	it("should return empty string for non-string input", () => {
		expect(truncateHelper.fn(null as unknown, "10")).toBe("");
		expect(truncateHelper.fn("test", null as unknown)).toBe("test");
	});
});

describe("truncateWordsHelper", () => {
	it("should truncate to specified word count", () => {
		expect(
			truncateWordsHelper.fn("User Login Integration Test Suite", "3"),
		).toBe("User Login Integration...");
		expect(truncateWordsHelper.fn("Short Test", "5")).toBe("Short Test");
	});

	it("should use custom suffix", () => {
		expect(
			truncateWordsHelper.fn("API Endpoint Integration Test", "2", " [...]"),
		).toBe("API Endpoint [...]");
	});

	it("should handle edge cases", () => {
		expect(truncateWordsHelper.fn("", "3")).toBe("");
		expect(truncateWordsHelper.fn("test", "invalid")).toBe("test");
		expect(truncateWordsHelper.fn("test", "0")).toBe("test");
	});

	it("should return empty string for non-string input", () => {
		expect(truncateWordsHelper.fn(null as unknown, "3")).toBe("");
		expect(truncateWordsHelper.fn("test", null as unknown)).toBe("test");
	});
});

describe("upcaseHelper", () => {
	it("should convert to uppercase", () => {
		expect(upcaseHelper.fn("passed")).toBe("PASSED");
		expect(upcaseHelper.fn("api test")).toBe("API TEST");
	});

	it("should handle edge cases", () => {
		expect(upcaseHelper.fn("")).toBe("");
		expect(upcaseHelper.fn("ALREADY UPPER")).toBe("ALREADY UPPER");
		expect(upcaseHelper.fn("Mixed123Case")).toBe("MIXED123CASE");
	});

	it("should return empty string for non-string input", () => {
		expect(upcaseHelper.fn(null as unknown)).toBe("");
		expect(upcaseHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("uppercaseHelper", () => {
	it("should convert to uppercase", () => {
		expect(uppercaseHelper.fn("passed")).toBe("PASSED");
		expect(uppercaseHelper.fn("api endpoint test")).toBe("API ENDPOINT TEST");
	});

	it("should handle edge cases", () => {
		expect(uppercaseHelper.fn("")).toBe("");
		expect(uppercaseHelper.fn("ALREADY UPPER")).toBe("ALREADY UPPER");
		expect(uppercaseHelper.fn("Mixed123Case")).toBe("MIXED123CASE");
	});

	it("should return empty string for non-string input", () => {
		expect(uppercaseHelper.fn(null as unknown)).toBe("");
		expect(uppercaseHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("String Helpers", () => {
	describe("appendHelper", () => {
		it("should append suffix to string", () => {
			expect(appendHelper.fn("test", " [FLAKY]")).toBe("test [FLAKY]");
			expect(appendHelper.fn("Login Test", " - Failed")).toBe(
				"Login Test - Failed",
			);
		});

		it("should handle empty strings", () => {
			expect(appendHelper.fn("", "suffix")).toBe("suffix");
			expect(appendHelper.fn("prefix", "")).toBe("prefix");
			expect(appendHelper.fn("", "")).toBe("");
		});

		it("should handle non-string inputs", () => {
			expect(appendHelper.fn(null as unknown, "suffix")).toBe("");
			expect(appendHelper.fn("prefix", null as unknown)).toBe("");
			expect(appendHelper.fn(123 as unknown, "suffix")).toBe("");
			expect(appendHelper.fn("prefix", 456 as unknown)).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(appendHelper.fn("API Test", " [PASSED]")).toBe(
				"API Test [PASSED]",
			);
			expect(appendHelper.fn("AuthSuite", ".log")).toBe("AuthSuite.log");
			expect(appendHelper.fn("test-file", ".json")).toBe("test-file.json");
		});
	});

	describe("camelCaseHelper", () => {
		it("should convert basic strings to camelCase", () => {
			expect(camelCaseHelper.fn("hello world")).toBe("helloWorld");
			expect(camelCaseHelper.fn("user login test")).toBe("userLoginTest");
			expect(camelCaseHelper.fn("database connection suite")).toBe(
				"databaseConnectionSuite",
			);
		});

		it("should handle different delimiters", () => {
			expect(camelCaseHelper.fn("hello-world-test")).toBe("helloWorldTest");
			expect(camelCaseHelper.fn("hello_world_test")).toBe("helloWorldTest");
			expect(camelCaseHelper.fn("hello.world.test")).toBe("helloWorldTest");
			expect(camelCaseHelper.fn("hello@world#test")).toBe("helloWorldTest");
		});

		it("should handle edge cases", () => {
			expect(camelCaseHelper.fn("")).toBe("");
			expect(camelCaseHelper.fn("   ")).toBe("");
			expect(camelCaseHelper.fn("singleword")).toBe("singleword");
			expect(camelCaseHelper.fn("ALLCAPS")).toBe("allcaps");
		});

		it("should handle non-string inputs", () => {
			expect(camelCaseHelper.fn(null as unknown)).toBe("");
			expect(camelCaseHelper.fn(undefined as unknown)).toBe("");
			expect(camelCaseHelper.fn(123 as unknown)).toBe("");
		});

		it("should handle case sensitivity", () => {
			expect(camelCaseHelper.fn("Hello World")).toBe("helloWorld");
			expect(camelCaseHelper.fn("HELLO WORLD")).toBe("helloWorld");
			expect(camelCaseHelper.fn("hELLO wORLD")).toBe("helloWorld");
		});

		it("should handle unicode characters", () => {
			expect(camelCaseHelper.fn("café test")).toBe("caféTest");
			expect(camelCaseHelper.fn("naïve approach")).toBe("naïveApproach");
		});

		it("should handle CTRF test scenarios", () => {
			expect(camelCaseHelper.fn("User Login Test")).toBe("userLoginTest");
			expect(camelCaseHelper.fn("Database Connection Suite")).toBe(
				"databaseConnectionSuite",
			);
			expect(camelCaseHelper.fn("API Endpoint Validation")).toBe(
				"apiEndpointValidation",
			);
			expect(camelCaseHelper.fn("test-name-with-dashes")).toBe(
				"testNameWithDashes",
			);
			expect(camelCaseHelper.fn("test_name_with_underscores")).toBe(
				"testNameWithUnderscores",
			);
		});
	});

	describe("capitalizeHelper", () => {
		it("should capitalize the first character of a string", () => {
			expect(capitalizeHelper.fn("hello world")).toBe("Hello world");
			expect(capitalizeHelper.fn("user authentication should work")).toBe(
				"User authentication should work",
			);
			expect(capitalizeHelper.fn("integration tests")).toBe(
				"Integration tests",
			);
		});

		it("should handle already capitalized strings", () => {
			expect(capitalizeHelper.fn("Hello World")).toBe("Hello World");
			expect(capitalizeHelper.fn("API Tests")).toBe("API Tests");
		});

		it("should handle single character strings", () => {
			expect(capitalizeHelper.fn("a")).toBe("A");
			expect(capitalizeHelper.fn("z")).toBe("Z");
			expect(capitalizeHelper.fn("1")).toBe("1");
		});

		it("should handle edge cases", () => {
			expect(capitalizeHelper.fn("")).toBe("");
			expect(capitalizeHelper.fn(" ")).toBe(" ");
			expect(capitalizeHelper.fn("   hello")).toBe("   hello");
		});

		it("should handle non-string inputs", () => {
			expect(capitalizeHelper.fn(null as unknown)).toBe("");
			expect(capitalizeHelper.fn(undefined as unknown)).toBe("");
			expect(capitalizeHelper.fn(123 as unknown)).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(capitalizeHelper.fn("user authentication should work")).toBe(
				"User authentication should work",
			);
			expect(capitalizeHelper.fn("integration tests")).toBe(
				"Integration tests",
			);
			expect(capitalizeHelper.fn("api endpoint validation")).toBe(
				"Api endpoint validation",
			);
			expect(capitalizeHelper.fn("database connection failed")).toBe(
				"Database connection failed",
			);
		});
	});

	describe("capitalizeAllHelper", () => {
		it("should capitalize all words in a string", () => {
			expect(capitalizeAllHelper.fn("hello world")).toBe("Hello World");
			expect(capitalizeAllHelper.fn("user authentication tests")).toBe(
				"User Authentication Tests",
			);
			expect(capitalizeAllHelper.fn("api endpoint validation")).toBe(
				"Api Endpoint Validation",
			);
		});

		it("should handle already capitalized strings", () => {
			expect(capitalizeAllHelper.fn("Hello World")).toBe("Hello World");
			expect(capitalizeAllHelper.fn("API Tests")).toBe("API Tests");
		});

		it("should handle single words", () => {
			expect(capitalizeAllHelper.fn("hello")).toBe("Hello");
			expect(capitalizeAllHelper.fn("test")).toBe("Test");
		});

		it("should handle different separators", () => {
			expect(capitalizeAllHelper.fn("hello-world-test")).toBe(
				"Hello-World-Test",
			);
			expect(capitalizeAllHelper.fn("hello_world_test")).toBe(
				"Hello_World_Test",
			);
			expect(capitalizeAllHelper.fn("hello.world.test")).toBe(
				"Hello.World.Test",
			);
		});

		it("should handle edge cases", () => {
			expect(capitalizeAllHelper.fn("")).toBe("");
			expect(capitalizeAllHelper.fn(" ")).toBe(" ");
			expect(capitalizeAllHelper.fn("   hello world   ")).toBe(
				"   Hello World   ",
			);
		});

		it("should handle non-string inputs", () => {
			expect(capitalizeAllHelper.fn(null as unknown)).toBe("");
			expect(capitalizeAllHelper.fn(undefined as unknown)).toBe("");
			expect(capitalizeAllHelper.fn(123 as unknown)).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(capitalizeAllHelper.fn("user authentication tests")).toBe(
				"User Authentication Tests",
			);
			expect(capitalizeAllHelper.fn("integration test suite")).toBe(
				"Integration Test Suite",
			);
			expect(capitalizeAllHelper.fn("api endpoint validation")).toBe(
				"Api Endpoint Validation",
			);
			expect(capitalizeAllHelper.fn("database connection tests")).toBe(
				"Database Connection Tests",
			);
			expect(capitalizeAllHelper.fn("smoke test scenarios")).toBe(
				"Smoke Test Scenarios",
			);
		});
	});

	describe("centerHelper", () => {
		it("should center strings correctly", () => {
			expect(centerHelper.fn("PASSED", "10")).toBe(
				"\u00A0\u00A0PASSED\u00A0\u00A0",
			);
			expect(centerHelper.fn("FAILED", "12")).toBe(
				"\u00A0\u00A0\u00A0FAILED\u00A0\u00A0\u00A0",
			);
			expect(centerHelper.fn("OK", "6")).toBe("\u00A0\u00A0OK\u00A0\u00A0");
		});

		it("should handle odd/even padding differences", () => {
			expect(centerHelper.fn("TEST", "9")).toBe(
				"\u00A0\u00A0TEST\u00A0\u00A0\u00A0",
			);
			expect(centerHelper.fn("TEST", "8")).toBe("\u00A0\u00A0TEST\u00A0\u00A0");
		});

		it("should return original string if already at or exceeds width", () => {
			expect(centerHelper.fn("TOOLONG", "6")).toBe("TOOLONG");
			expect(centerHelper.fn("EXACT", "5")).toBe("EXACT");
		});

		it("should handle edge cases", () => {
			expect(centerHelper.fn("", "5")).toBe("\u00A0\u00A0\u00A0\u00A0\u00A0");
			expect(centerHelper.fn("A", "1")).toBe("A");
			expect(centerHelper.fn("TEST", "0")).toBe("TEST");
			expect(centerHelper.fn("TEST", "-5")).toBe("TEST");
		});

		it("should handle non-string inputs", () => {
			expect(centerHelper.fn(null as unknown, "10")).toBe("");
			expect(centerHelper.fn("TEST", null as unknown)).toBe("TEST");
			expect(centerHelper.fn("TEST", "abc")).toBe("TEST");
			expect(centerHelper.fn(123 as unknown, "10")).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(centerHelper.fn("PASSED", "20")).toBe(
				`${"\u00A0".repeat(7)}PASSED${"\u00A0".repeat(7)}`,
			);
			expect(centerHelper.fn("FAILED", "15")).toBe(
				`${"\u00A0".repeat(4)}FAILED${"\u00A0".repeat(5)}`,
			);
			expect(centerHelper.fn("SKIPPED", "18")).toBe(
				`${"\u00A0".repeat(5)}SKIPPED${"\u00A0".repeat(6)}`,
			);
		});
	});

	describe("chopHelper", () => {
		it("should remove whitespace and non-word characters from edges", () => {
			expect(chopHelper.fn(" __Test Name__ ")).toBe("Test Name");
			expect(chopHelper.fn("---API-Test---")).toBe("API-Test");
			expect(chopHelper.fn("!!!Hello World!!!")).toBe("Hello World");
		});

		it("should handle mixed whitespace and special characters", () => {
			expect(chopHelper.fn("  ___Test___  ")).toBe("Test");
			expect(chopHelper.fn("\t\n  Test  \n\t")).toBe("Test");
			expect(chopHelper.fn("@@@ User Login @@@")).toBe("User Login");
		});

		it("should preserve internal characters", () => {
			expect(chopHelper.fn("__Test-Name__")).toBe("Test-Name");
			expect(chopHelper.fn("  API_Endpoint_Test  ")).toBe("API_Endpoint_Test");
			expect(chopHelper.fn("###User@Domain###")).toBe("User@Domain");
		});

		it("should handle edge cases", () => {
			expect(chopHelper.fn("")).toBe("");
			expect(chopHelper.fn("   ")).toBe("");
			expect(chopHelper.fn("___")).toBe("");
			expect(chopHelper.fn("Test")).toBe("Test");
		});

		it("should handle non-string inputs", () => {
			expect(chopHelper.fn(null as unknown)).toBe("");
			expect(chopHelper.fn(undefined as unknown)).toBe("");
			expect(chopHelper.fn(123 as unknown)).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(chopHelper.fn(" __Login Test__ ")).toBe("Login Test");
			expect(chopHelper.fn("===API Validation===")).toBe("API Validation");
			expect(chopHelper.fn("  {{test.name}}  ")).toBe("{{test.name}}");
			expect(chopHelper.fn("___Database-Connection___")).toBe(
				"Database-Connection",
			);
		});
	});

	describe("dashCaseHelper", () => {
		it("should convert strings to dash-case", () => {
			expect(dashCaseHelper.fn("User Login Test")).toBe("user-login-test");
			expect(dashCaseHelper.fn("API Endpoint Tests")).toBe(
				"api-endpoint-tests",
			);
			expect(dashCaseHelper.fn("Database_Connection Test")).toBe(
				"database-connection-test",
			);
		});

		it("should handle different separators", () => {
			expect(dashCaseHelper.fn("hello world")).toBe("hello-world");
			expect(dashCaseHelper.fn("hello_world")).toBe("hello-world");
			expect(dashCaseHelper.fn("hello.world")).toBe("hello-world");
			expect(dashCaseHelper.fn("hello-world")).toBe("hello-world");
		});

		it("should handle special characters", () => {
			expect(dashCaseHelper.fn("Test@Name#123")).toBe("testname123");
			expect(dashCaseHelper.fn("API (v2) Test")).toBe("api-v2-test");
			expect(dashCaseHelper.fn("User & Password")).toBe("user-password");
		});

		it("should handle edge cases", () => {
			expect(dashCaseHelper.fn("")).toBe("");
			expect(dashCaseHelper.fn("   ")).toBe("");
			expect(dashCaseHelper.fn("test")).toBe("test");
			expect(dashCaseHelper.fn("TEST")).toBe("test");
		});

		it("should handle consecutive separators", () => {
			expect(dashCaseHelper.fn("test   multiple   spaces")).toBe(
				"test-multiple-spaces",
			);
			expect(dashCaseHelper.fn("test___underscores")).toBe("test-underscores");
			expect(dashCaseHelper.fn("test---dashes")).toBe("test-dashes");
		});

		it("should handle non-string inputs", () => {
			expect(dashCaseHelper.fn(null as unknown)).toBe("");
			expect(dashCaseHelper.fn(undefined as unknown)).toBe("");
			expect(dashCaseHelper.fn(123 as unknown)).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(dashCaseHelper.fn("User Login Test")).toBe("user-login-test");
			expect(dashCaseHelper.fn("Database Connection Suite")).toBe(
				"database-connection-suite",
			);
			expect(dashCaseHelper.fn("API Endpoint Validation")).toBe(
				"api-endpoint-validation",
			);
			expect(dashCaseHelper.fn("Integration_Test_Suite")).toBe(
				"integration-test-suite",
			);
		});
	});

	describe("dotCaseHelper", () => {
		it("should convert strings to dot.case", () => {
			expect(dotCaseHelper.fn("User Login Test")).toBe("user.login.test");
			expect(dotCaseHelper.fn("API Endpoint Tests")).toBe("api.endpoint.tests");
			expect(dotCaseHelper.fn("Database_Connection-Test")).toBe(
				"database.connection.test",
			);
		});

		it("should handle different separators", () => {
			expect(dotCaseHelper.fn("hello world")).toBe("hello.world");
			expect(dotCaseHelper.fn("hello_world")).toBe("hello.world");
			expect(dotCaseHelper.fn("hello-world")).toBe("hello.world");
			expect(dotCaseHelper.fn("hello.world")).toBe("hello.world");
		});

		it("should handle special characters", () => {
			expect(dotCaseHelper.fn("Test@Name#123")).toBe("testname123");
			expect(dotCaseHelper.fn("API (v2) Test")).toBe("api.v2.test");
			expect(dotCaseHelper.fn("User & Password")).toBe("user.password");
		});

		it("should handle edge cases", () => {
			expect(dotCaseHelper.fn("")).toBe("");
			expect(dotCaseHelper.fn("   ")).toBe("");
			expect(dotCaseHelper.fn("test")).toBe("test");
			expect(dotCaseHelper.fn("TEST")).toBe("test");
		});

		it("should handle consecutive separators", () => {
			expect(dotCaseHelper.fn("test   multiple   spaces")).toBe(
				"test.multiple.spaces",
			);
			expect(dotCaseHelper.fn("test___underscores")).toBe("test.underscores");
			expect(dotCaseHelper.fn("test...dots")).toBe("test.dots");
		});

		it("should handle non-string inputs", () => {
			expect(dotCaseHelper.fn(null as unknown)).toBe("");
			expect(dotCaseHelper.fn(undefined as unknown)).toBe("");
			expect(dotCaseHelper.fn(123 as unknown)).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(dotCaseHelper.fn("User Login Test")).toBe("user.login.test");
			expect(dotCaseHelper.fn("Database Connection Suite")).toBe(
				"database.connection.suite",
			);
			expect(dotCaseHelper.fn("API Endpoint Validation")).toBe(
				"api.endpoint.validation",
			);
			expect(dotCaseHelper.fn("Integration_Test-Suite")).toBe(
				"integration.test.suite",
			);
		});
	});

	describe("downCaseHelper", () => {
		it("should convert strings to lowercase", () => {
			expect(downCaseHelper.fn("PASSED")).toBe("passed");
			expect(downCaseHelper.fn("API ENDPOINT TEST")).toBe("api endpoint test");
			expect(downCaseHelper.fn("Database Connection")).toBe(
				"database connection",
			);
		});

		it("should handle mixed case", () => {
			expect(downCaseHelper.fn("MiXeD cAsE")).toBe("mixed case");
			expect(downCaseHelper.fn("CamelCase")).toBe("camelcase");
			expect(downCaseHelper.fn("UPPERCASE")).toBe("uppercase");
		});

		it("should preserve special characters and spacing", () => {
			expect(downCaseHelper.fn("Test-Name_123")).toBe("test-name_123");
			expect(downCaseHelper.fn("API (v2) Test")).toBe("api (v2) test");
			expect(downCaseHelper.fn("User@Domain.com")).toBe("user@domain.com");
		});

		it("should handle edge cases", () => {
			expect(downCaseHelper.fn("")).toBe("");
			expect(downCaseHelper.fn("   ")).toBe("   ");
			expect(downCaseHelper.fn("123")).toBe("123");
			expect(downCaseHelper.fn("already lowercase")).toBe("already lowercase");
		});

		it("should handle non-string inputs", () => {
			expect(downCaseHelper.fn(null as unknown)).toBe("");
			expect(downCaseHelper.fn(undefined as unknown)).toBe("");
			expect(downCaseHelper.fn(123 as unknown)).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(downCaseHelper.fn("PASSED")).toBe("passed");
			expect(downCaseHelper.fn("FAILED")).toBe("failed");
			expect(downCaseHelper.fn("SKIPPED")).toBe("skipped");
			expect(downCaseHelper.fn("USER LOGIN TEST")).toBe("user login test");
			expect(downCaseHelper.fn("API ENDPOINT VALIDATION")).toBe(
				"api endpoint validation",
			);
		});
	});

	describe("ellipsisHelper", () => {
		it("should truncate strings correctly", () => {
			expect(ellipsisHelper.fn("User Authentication Test", "20")).toBe(
				"User Authentication…",
			);
			expect(ellipsisHelper.fn("Short", "10")).toBe("Short");
			expect(ellipsisHelper.fn("Exactly10C", "10")).toBe("Exactly10C");
		});

		it("should handle edge cases", () => {
			expect(ellipsisHelper.fn("", "5")).toBe("");
			expect(ellipsisHelper.fn("Test", "1")).toBe("…");
			expect(ellipsisHelper.fn("Test", "0")).toBe("Test");
			expect(ellipsisHelper.fn("Test", "-5")).toBe("Test");
		});

		it("should handle non-string inputs", () => {
			expect(ellipsisHelper.fn(null as unknown, "10")).toBe("");
			expect(ellipsisHelper.fn("Test", null as unknown)).toBe("Test");
			expect(ellipsisHelper.fn("Test", "abc")).toBe("Test");
			expect(ellipsisHelper.fn(123 as unknown, "10")).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(
				ellipsisHelper.fn("User Authentication Integration Test", "25"),
			).toBe("User Authentication Inte…");
			expect(ellipsisHelper.fn("Database Connection Failed", "15")).toBe(
				"Database Conne…",
			);
			expect(ellipsisHelper.fn("API Test Passed", "12")).toBe("API Test Pa…");
		});
	});

	describe("escapeMarkdownHelper", () => {
		it("should escape basic Markdown characters", () => {
			expect(escapeMarkdownHelper.fn("Hello *world*")).toBe("Hello \\*world\\*");
			expect(escapeMarkdownHelper.fn("Text with _italics_")).toBe("Text with \\_italics\\_");
			expect(escapeMarkdownHelper.fn("Link [text](url)")).toBe("Link \\[text\\]\\(url\\)");
		});

		it("should escape all special Markdown characters", () => {
			expect(escapeMarkdownHelper.fn("\\")).toBe("\\\\");
			expect(escapeMarkdownHelper.fn("*")).toBe("\\*");
			expect(escapeMarkdownHelper.fn("_")).toBe("\\_");
			expect(escapeMarkdownHelper.fn("{}")).toBe("\\{\\}");
			expect(escapeMarkdownHelper.fn("[]")).toBe("\\[\\]");
			expect(escapeMarkdownHelper.fn("()")).toBe("\\(\\)");
			expect(escapeMarkdownHelper.fn("#")).toBe("\\#");
			expect(escapeMarkdownHelper.fn("+")).toBe("\\+");
			expect(escapeMarkdownHelper.fn("-")).toBe("\\-");
			expect(escapeMarkdownHelper.fn(".")).toBe("\\.");
			expect(escapeMarkdownHelper.fn("!")).toBe("\\!");
		});

		it("should handle complex test names and file paths", () => {
			expect(escapeMarkdownHelper.fn("test_[important]_case")).toBe("test\\_\\[important\\]\\_case");
			expect(escapeMarkdownHelper.fn("src/utils/*.js")).toBe("src/utils/\\*\\.js");
			expect(escapeMarkdownHelper.fn("User#123_login-test")).toBe("User\\#123\\_login\\-test");
		});

		it("should handle error messages with special characters", () => {
			expect(escapeMarkdownHelper.fn("Expected *value* but got null")).toBe("Expected \\*value\\* but got null");
			expect(escapeMarkdownHelper.fn("Function() { return true; }")).toBe("Function\\(\\) \\{ return true; \\}");
			expect(escapeMarkdownHelper.fn("Array[0] is undefined!")).toBe("Array\\[0\\] is undefined\\!");
		});

		it("should handle CTRF test scenarios", () => {
			expect(escapeMarkdownHelper.fn("Test_Case_*_Wildcard")).toBe("Test\\_Case\\_\\*\\_Wildcard");
			expect(escapeMarkdownHelper.fn("[PASSED] User login test")).toBe("\\[PASSED\\] User login test");
			expect(escapeMarkdownHelper.fn("# Header Test Case")).toBe("\\# Header Test Case");
			expect(escapeMarkdownHelper.fn("Error! Connection failed.")).toBe("Error\\! Connection failed\\.");
		});

		it("should handle mixed Markdown formatting", () => {
			expect(escapeMarkdownHelper.fn("**bold** and *italic* text")).toBe("\\*\\*bold\\*\\* and \\*italic\\* text");
			expect(escapeMarkdownHelper.fn("# Header with [link](url)")).toBe("\\# Header with \\[link\\]\\(url\\)");
			expect(escapeMarkdownHelper.fn("- List item with _emphasis_")).toBe("\\- List item with \\_emphasis\\_");
		});

		it("should handle non-string inputs", () => {
			expect(escapeMarkdownHelper.fn(null as unknown)).toBe("");
			expect(escapeMarkdownHelper.fn(undefined as unknown)).toBe("");
			expect(escapeMarkdownHelper.fn(123 as unknown)).toBe("");
			expect(escapeMarkdownHelper.fn({} as unknown)).toBe("");
		});

		it("should handle empty and edge case strings", () => {
			expect(escapeMarkdownHelper.fn("")).toBe("");
			expect(escapeMarkdownHelper.fn("No special chars")).toBe("No special chars");
			expect(escapeMarkdownHelper.fn("   ")).toBe("   ");
		});

		it("should be categorized as String helper", () => {
			expect(escapeMarkdownHelper.category).toBe("String");
			expect(escapeMarkdownHelper.name).toBe("escapeMarkdown");
		});
	});

	describe("hyphenateHelper", () => {
		it("should replace spaces with hyphens", () => {
			expect(hyphenateHelper.fn("User Login Test")).toBe("User-Login-Test");
			expect(hyphenateHelper.fn("API Endpoint Tests")).toBe(
				"API-Endpoint-Tests",
			);
			expect(hyphenateHelper.fn("Database Connection")).toBe(
				"Database-Connection",
			);
		});

		it("should handle multiple spaces", () => {
			expect(hyphenateHelper.fn("test   multiple   spaces")).toBe(
				"test---multiple---spaces",
			);
			expect(hyphenateHelper.fn("single space")).toBe("single-space");
		});

		it("should handle edge cases", () => {
			expect(hyphenateHelper.fn("")).toBe("");
			expect(hyphenateHelper.fn("   ")).toBe("---");
			expect(hyphenateHelper.fn("NoSpaces")).toBe("NoSpaces");
		});

		it("should handle non-string inputs", () => {
			expect(hyphenateHelper.fn(null as unknown)).toBe("");
			expect(hyphenateHelper.fn(undefined as unknown)).toBe("");
			expect(hyphenateHelper.fn(123 as unknown)).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(hyphenateHelper.fn("User Login Test")).toBe("User-Login-Test");
			expect(hyphenateHelper.fn("API Endpoint Validation")).toBe(
				"API-Endpoint-Validation",
			);
			expect(hyphenateHelper.fn("Database Connection Suite")).toBe(
				"Database-Connection-Suite",
			);
		});
	});

	describe("isStringHelper", () => {
		it("should return true for strings", () => {
			expect(isStringHelper.fn("test")).toBe(true);
			expect(isStringHelper.fn("")).toBe(true);
			expect(isStringHelper.fn("User Login Test")).toBe(true);
		});

		it("should return false for non-strings", () => {
			expect(isStringHelper.fn(123)).toBe(false);
			expect(isStringHelper.fn(null)).toBe(false);
			expect(isStringHelper.fn(undefined)).toBe(false);
			expect(isStringHelper.fn({})).toBe(false);
			expect(isStringHelper.fn([])).toBe(false);
			expect(isStringHelper.fn(true)).toBe(false);
		});

		it("should handle CTRF test scenarios", () => {
			expect(isStringHelper.fn("PASSED")).toBe(true);
			expect(isStringHelper.fn("Test Name")).toBe(true);
			expect(isStringHelper.fn(123)).toBe(false); // duration might be number
			expect(isStringHelper.fn(null)).toBe(false); // optional fields
		});
	});

	describe("lowerCaseHelper", () => {
		it("should convert strings to lowercase", () => {
			expect(lowerCaseHelper.fn("PASSED")).toBe("passed");
			expect(lowerCaseHelper.fn("API ENDPOINT TEST")).toBe("api endpoint test");
			expect(lowerCaseHelper.fn("Database Connection")).toBe(
				"database connection",
			);
		});

		it("should handle mixed case", () => {
			expect(lowerCaseHelper.fn("MiXeD cAsE")).toBe("mixed case");
			expect(lowerCaseHelper.fn("CamelCase")).toBe("camelcase");
			expect(lowerCaseHelper.fn("UPPERCASE")).toBe("uppercase");
		});

		it("should preserve special characters and spacing", () => {
			expect(lowerCaseHelper.fn("Test-Name_123")).toBe("test-name_123");
			expect(lowerCaseHelper.fn("API (v2) Test")).toBe("api (v2) test");
			expect(lowerCaseHelper.fn("User@Domain.com")).toBe("user@domain.com");
		});

		it("should handle edge cases", () => {
			expect(lowerCaseHelper.fn("")).toBe("");
			expect(lowerCaseHelper.fn("   ")).toBe("   ");
			expect(lowerCaseHelper.fn("123")).toBe("123");
			expect(lowerCaseHelper.fn("already lowercase")).toBe("already lowercase");
		});

		it("should handle non-string inputs", () => {
			expect(lowerCaseHelper.fn(null as unknown)).toBe("");
			expect(lowerCaseHelper.fn(undefined as unknown)).toBe("");
			expect(lowerCaseHelper.fn(123 as unknown)).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(lowerCaseHelper.fn("PASSED")).toBe("passed");
			expect(lowerCaseHelper.fn("FAILED")).toBe("failed");
			expect(lowerCaseHelper.fn("SKIPPED")).toBe("skipped");
			expect(lowerCaseHelper.fn("USER LOGIN TEST")).toBe("user login test");
			expect(lowerCaseHelper.fn("API ENDPOINT VALIDATION")).toBe(
				"api endpoint validation",
			);
		});
	});

	describe("occurrencesHelper", () => {
		it("should count substring occurrences", () => {
			expect(occurrencesHelper.fn("test API test API test", "API")).toBe(2);
			expect(occurrencesHelper.fn("User Login Test", "Test")).toBe(1);
			expect(occurrencesHelper.fn("Database Connection", "Connection")).toBe(1);
		});

		it("should handle overlapping matches", () => {
			expect(occurrencesHelper.fn("aaa", "aa")).toBe(2);
			expect(occurrencesHelper.fn("test test test", "test")).toBe(3);
		});

		it("should handle edge cases", () => {
			expect(occurrencesHelper.fn("", "test")).toBe(0);
			expect(occurrencesHelper.fn("test", "")).toBe(0);
			expect(occurrencesHelper.fn("", "")).toBe(0);
			expect(occurrencesHelper.fn("test", "missing")).toBe(0);
		});

		it("should handle non-string inputs", () => {
			expect(occurrencesHelper.fn(null as unknown, "test")).toBe(0);
			expect(occurrencesHelper.fn("test", null as unknown)).toBe(0);
			expect(occurrencesHelper.fn(123 as unknown, "test")).toBe(0);
		});

		it("should handle CTRF test scenarios", () => {
			expect(occurrencesHelper.fn("API Test for API Validation", "API")).toBe(
				2,
			);
			expect(
				occurrencesHelper.fn("Failed: Database connection failed", "failed"),
			).toBe(1);
			expect(
				occurrencesHelper.fn("Error: Authentication error occurred", "error"),
			).toBe(1);
			expect(occurrencesHelper.fn("Test test TEST", "test")).toBe(1); // case sensitive
		});
	});

	describe("pascalCaseHelper", () => {
		it("should convert strings to PascalCase", () => {
			expect(pascalCaseHelper.fn("user login test")).toBe("UserLoginTest");
			expect(pascalCaseHelper.fn("API endpoint tests")).toBe(
				"ApiEndpointTests",
			);
			expect(pascalCaseHelper.fn("database connection")).toBe(
				"DatabaseConnection",
			);
		});

		it("should handle different separators", () => {
			expect(pascalCaseHelper.fn("hello-world-test")).toBe("HelloWorldTest");
			expect(pascalCaseHelper.fn("hello_world_test")).toBe("HelloWorldTest");
			expect(pascalCaseHelper.fn("hello.world.test")).toBe("HelloWorldTest");
			expect(pascalCaseHelper.fn("hello@world#test")).toBe("HelloWorldTest");
		});

		it("should handle edge cases", () => {
			expect(pascalCaseHelper.fn("")).toBe("");
			expect(pascalCaseHelper.fn("   ")).toBe("");
			expect(pascalCaseHelper.fn("singleword")).toBe("Singleword");
			expect(pascalCaseHelper.fn("ALLCAPS")).toBe("Allcaps");
		});

		it("should handle non-string inputs", () => {
			expect(pascalCaseHelper.fn(null as unknown)).toBe("");
			expect(pascalCaseHelper.fn(undefined as unknown)).toBe("");
			expect(pascalCaseHelper.fn(123 as unknown)).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(pascalCaseHelper.fn("User Login Test")).toBe("UserLoginTest");
			expect(pascalCaseHelper.fn("Database Connection Suite")).toBe(
				"DatabaseConnectionSuite",
			);
			expect(pascalCaseHelper.fn("API Endpoint Validation")).toBe(
				"ApiEndpointValidation",
			);
			expect(pascalCaseHelper.fn("integration-test-suite")).toBe(
				"IntegrationTestSuite",
			);
		});
	});

	describe("pathCaseHelper", () => {
		it("should convert strings to path/case", () => {
			expect(pathCaseHelper.fn("User Login Test")).toBe("user/login/test");
			expect(pathCaseHelper.fn("API Endpoint Tests")).toBe(
				"api/endpoint/tests",
			);
			expect(pathCaseHelper.fn("Database_Connection-Test")).toBe(
				"database/connection/test",
			);
		});

		it("should handle different separators", () => {
			expect(pathCaseHelper.fn("hello world")).toBe("hello/world");
			expect(pathCaseHelper.fn("hello_world")).toBe("hello/world");
			expect(pathCaseHelper.fn("hello-world")).toBe("hello/world");
		});

		it("should handle special characters", () => {
			expect(pathCaseHelper.fn("Test@Name#123")).toBe("testname123");
			expect(pathCaseHelper.fn("API (v2) Test")).toBe("api/v2/test");
			expect(pathCaseHelper.fn("User & Password")).toBe("user/password");
		});

		it("should handle edge cases", () => {
			expect(pathCaseHelper.fn("")).toBe("");
			expect(pathCaseHelper.fn("   ")).toBe("");
			expect(pathCaseHelper.fn("test")).toBe("test");
			expect(pathCaseHelper.fn("TEST")).toBe("test");
		});

		it("should handle consecutive separators", () => {
			expect(pathCaseHelper.fn("test   multiple   spaces")).toBe(
				"test/multiple/spaces",
			);
			expect(pathCaseHelper.fn("test___underscores")).toBe("test/underscores");
			expect(pathCaseHelper.fn("test///slashes")).toBe("test/slashes");
		});

		it("should handle non-string inputs", () => {
			expect(pathCaseHelper.fn(null as unknown)).toBe("");
			expect(pathCaseHelper.fn(undefined as unknown)).toBe("");
			expect(pathCaseHelper.fn(123 as unknown)).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(pathCaseHelper.fn("User Login Test")).toBe("user/login/test");
			expect(pathCaseHelper.fn("Database Connection Suite")).toBe(
				"database/connection/suite",
			);
			expect(pathCaseHelper.fn("API Endpoint Validation")).toBe(
				"api/endpoint/validation",
			);
			expect(pathCaseHelper.fn("Integration_Test-Suite")).toBe(
				"integration/test/suite",
			);
		});
	});

	describe("stripAnsiHelper", () => {
		it("should strip basic ANSI escape codes", () => {
			expect(stripAnsiHelper.fn("Hello \u001b[31mRed\u001b[0m")).toBe("Hello Red");
			expect(stripAnsiHelper.fn("\u001b[32mGreen text\u001b[0m")).toBe("Green text");
			expect(stripAnsiHelper.fn("\u001b[1mBold\u001b[0m")).toBe("Bold");
		});

		it("should strip multiple ANSI codes", () => {
			expect(stripAnsiHelper.fn("\u001b[31m\u001b[1mBold Red\u001b[0m\u001b[0m")).toBe("Bold Red");
			expect(stripAnsiHelper.fn("\u001b[32mGreen \u001b[33mYellow\u001b[0m")).toBe("Green Yellow");
		});

		it("should handle complex ANSI sequences", () => {
			expect(stripAnsiHelper.fn("\u001b[38;5;196mHello\u001b[0m")).toBe("Hello");
			expect(stripAnsiHelper.fn("\u001b[48;5;21mBackground\u001b[0m")).toBe("Background");
		});

		it("should handle strings without ANSI codes", () => {
			expect(stripAnsiHelper.fn("Plain text")).toBe("Plain text");
			expect(stripAnsiHelper.fn("")).toBe("");
		});

		it("should handle edge cases", () => {
			expect(stripAnsiHelper.fn("Text with \u001b[0m reset only")).toBe("Text with  reset only");
			expect(stripAnsiHelper.fn("\u001b[J Clear screen")).toBe(" Clear screen");
		});

		it("should handle non-string inputs", () => {
			expect(stripAnsiHelper.fn(null as unknown)).toBe("");
			expect(stripAnsiHelper.fn(undefined as unknown)).toBe("");
			expect(stripAnsiHelper.fn(123 as unknown)).toBe("");
			expect(stripAnsiHelper.fn({} as unknown)).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(stripAnsiHelper.fn("Test \u001b[32mPASSED\u001b[0m")).toBe("Test PASSED");
			expect(stripAnsiHelper.fn("Test \u001b[31mFAILED\u001b[0m")).toBe("Test FAILED");
			expect(stripAnsiHelper.fn("\u001b[33mWARNING:\u001b[0m Test skipped")).toBe("WARNING: Test skipped");
		});
	});

	describe("ansiToHtmlHelper", () => {
		it("should convert basic ANSI escape codes to HTML", () => {
			expect(ansiToHtmlHelper.fn("Hello \u001b[31mRed\u001b[0m")).toBe("Hello <span style=\"color:#A00\">Red</span>");
			expect(ansiToHtmlHelper.fn("\u001b[32mGreen text\u001b[0m")).toBe("<span style=\"color:#0A0\">Green text</span>");
			expect(ansiToHtmlHelper.fn("\u001b[1mBold\u001b[0m")).toBe("<b>Bold</b>");
		});

		it("should convert multiple ANSI codes to HTML", () => {
			expect(ansiToHtmlHelper.fn("\u001b[31m\u001b[1mBold Red\u001b[0m")).toBe("<span style=\"color:#A00\"><b>Bold Red</b></span>");
			expect(ansiToHtmlHelper.fn("\u001b[32mGreen \u001b[33mYellow\u001b[0m")).toContain("Green");
			expect(ansiToHtmlHelper.fn("\u001b[32mGreen \u001b[33mYellow\u001b[0m")).toContain("Yellow");
		});

		it("should handle complex ANSI sequences", () => {
			const result = ansiToHtmlHelper.fn("\u001b[38;5;196mHello\u001b[0m");
			expect(result).toContain("<span");
			expect(result).toContain("Hello");
			expect(result).toContain("</span>");
		});

		it("should handle strings without ANSI codes", () => {
			expect(ansiToHtmlHelper.fn("Plain text")).toBe("Plain text");
			expect(ansiToHtmlHelper.fn("")).toBe("");
		});

		it("should handle non-string inputs", () => {
			expect(ansiToHtmlHelper.fn(null as unknown)).toBe("");
			expect(ansiToHtmlHelper.fn(undefined as unknown)).toBe("");
			expect(ansiToHtmlHelper.fn(123 as unknown)).toBe("");
			expect(ansiToHtmlHelper.fn({} as unknown)).toBe("");
		});

		it("should handle CTRF test scenarios", () => {
			expect(ansiToHtmlHelper.fn("Test \u001b[32mPASSED\u001b[0m")).toBe("Test <span style=\"color:#0A0\">PASSED</span>");
			expect(ansiToHtmlHelper.fn("Test \u001b[31mFAILED\u001b[0m")).toBe("Test <span style=\"color:#A00\">FAILED</span>");
			expect(ansiToHtmlHelper.fn("\u001b[33mWARNING:\u001b[0m Test skipped")).toBe("<span style=\"color:#A50\">WARNING:</span> Test skipped");
		});

		it("should handle HTML characters without escaping", () => {
			expect(ansiToHtmlHelper.fn("Test & <script>")).toBe("Test & <script>");
			expect(ansiToHtmlHelper.fn("Quote \"test\"")).toBe("Quote \"test\"");
		});

		it("should convert underline and other styles", () => {
			expect(ansiToHtmlHelper.fn("\u001b[4mUnderlined\u001b[0m")).toBe("<u>Underlined</u>");
			expect(ansiToHtmlHelper.fn("\u001b[3mItalic\u001b[0m")).toBe("<i>Italic</i>");
		});
	});



	describe("stringHelpers export", () => {
		it("should contain all string helpers", () => {
			expect(stringHelpers).toHaveLength(41);
			expect(stringHelpers.map((h: Helper) => h.name)).toEqual([
				"ansiToHtml",
				"append",
				"camelcase",
				"capitalize",
				"capitalizeAll",
				"center",
				"chop",
				"dashcase",
				"dotcase",
				"downcase",
				"ellipsis",
				"escapeMarkdown",
				"hyphenate",
				"isString",
				"lowercase",
				"occurrences",
				"pascalcase",
				"pathcase",
				"plusify",
				"prepend",
				"raw",
				"remove",
				"removeFirst",
				"replace",
				"replaceFirst",
				"reverse",
				"sentence",
				"sliceString",
				"snakecase",
				"split",
				"splitLines",
				"startsWith",
				"stripAnsi",
				"titleize",
				"trim",
				"trimLeft",
				"trimRight",
				"truncate",
				"truncateWords",
				"upcase",
				"uppercase",
			]);
		});

		it("should have proper helper structure", () => {
			stringHelpers.forEach((helper: Helper) => {
				expect(helper).toHaveProperty("name");
				expect(helper).toHaveProperty("category", "String");
				expect(helper).toHaveProperty("fn");
				expect(typeof helper.fn).toBe("function");
			});
		});
	});
});
