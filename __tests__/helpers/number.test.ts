import {
	abbreviateNumberHelper,
	addCommasHelper,
	bytesHelper,
	numberHelpers,
	phoneNumberHelper,
	toExponentialHelper,
	toFixedHelper,
	toPrecisionHelper,
} from "../../src/helpers/number";

describe("bytesHelper", () => {
	it("should format numbers to bytes correctly", () => {
		expect(bytesHelper.fn(0)).toBe("0 B");
		expect(bytesHelper.fn(1396)).toBe("1.40 kB");
		expect(bytesHelper.fn(825399)).toBe("825.40 kB");
		expect(bytesHelper.fn(13661855)).toBe("13.66 MB");
		expect(bytesHelper.fn(1000000000)).toBe("1.00 GB");
		expect(bytesHelper.fn(1000000000000)).toBe("1.00 TB");
	});

	it("should handle string input by using its length", () => {
		expect(bytesHelper.fn("foo")).toBe("3 B");
		expect(bytesHelper.fn("hello world")).toBe("11 B");
		expect(bytesHelper.fn("")).toBe("0 B");
	});

	it("should handle edge cases", () => {
		expect(bytesHelper.fn(null)).toBe("0 B");
		expect(bytesHelper.fn(undefined)).toBe("0 B");
		expect(bytesHelper.fn(Number.NaN)).toBe("0 B");
		expect(bytesHelper.fn({})).toBe("0 B");
		expect(bytesHelper.fn([])).toBe("0 B");
	});

	it("should be registered correctly", () => {
		expect(bytesHelper.name).toBe("bytes");
		expect(bytesHelper.category).toBe("Number");
		expect(typeof bytesHelper.fn).toBe("function");
	});
});

describe("addCommasHelper", () => {
	it("should add commas to numbers", () => {
		expect(addCommasHelper.fn(1000)).toBe("1,000");
		expect(addCommasHelper.fn(10000)).toBe("10,000");
		expect(addCommasHelper.fn(100000)).toBe("100,000");
		expect(addCommasHelper.fn(1000000)).toBe("1,000,000");
		expect(addCommasHelper.fn(1234567)).toBe("1,234,567");
		expect(addCommasHelper.fn(123456789)).toBe("123,456,789");
	});

	it("should handle small numbers", () => {
		expect(addCommasHelper.fn(0)).toBe("0");
		expect(addCommasHelper.fn(1)).toBe("1");
		expect(addCommasHelper.fn(12)).toBe("12");
		expect(addCommasHelper.fn(123)).toBe("123");
		expect(addCommasHelper.fn(999)).toBe("999");
	});

	it("should handle negative numbers", () => {
		expect(addCommasHelper.fn(-1000)).toBe("-1,000");
		expect(addCommasHelper.fn(-1234567)).toBe("-1,234,567");
	});

	it("should handle decimal numbers", () => {
		expect(addCommasHelper.fn(1234.56)).toBe("1,234.56");
		expect(addCommasHelper.fn(1234567.89)).toBe("1,234,567.89");
	});

	it("should handle edge cases", () => {
		expect(addCommasHelper.fn(null)).toBe("0");
		expect(addCommasHelper.fn(undefined)).toBe("0");
		expect(addCommasHelper.fn(Number.NaN)).toBe("0");
		expect(addCommasHelper.fn("string")).toBe("0");
		expect(addCommasHelper.fn({})).toBe("0");
	});

	it("should be registered correctly", () => {
		expect(addCommasHelper.name).toBe("addCommas");
		expect(addCommasHelper.category).toBe("Number");
		expect(typeof addCommasHelper.fn).toBe("function");
	});
});

describe("phoneNumberHelper", () => {
	it("should format 10-digit phone numbers", () => {
		expect(phoneNumberHelper.fn("8005551212")).toBe("(800) 555-1212");
		expect(phoneNumberHelper.fn("5551234567")).toBe("(555) 123-4567");
		expect(phoneNumberHelper.fn("1234567890")).toBe("(123) 456-7890");
	});

	it("should format numeric phone numbers", () => {
		expect(phoneNumberHelper.fn(8005551212)).toBe("(800) 555-1212");
		expect(phoneNumberHelper.fn(5551234567)).toBe("(555) 123-4567");
	});

	it("should handle 11-digit numbers with country code", () => {
		expect(phoneNumberHelper.fn("18005551212")).toBe("(800) 555-1212");
		expect(phoneNumberHelper.fn(18005551212)).toBe("(800) 555-1212");
	});

	it("should clean formatted phone numbers", () => {
		expect(phoneNumberHelper.fn("(800) 555-1212")).toBe("(800) 555-1212");
		expect(phoneNumberHelper.fn("800-555-1212")).toBe("(800) 555-1212");
		expect(phoneNumberHelper.fn("800.555.1212")).toBe("(800) 555-1212");
		expect(phoneNumberHelper.fn("800 555 1212")).toBe("(800) 555-1212");
	});

	it("should handle invalid lengths", () => {
		expect(phoneNumberHelper.fn("123")).toBe("123");
		expect(phoneNumberHelper.fn("12345678901234")).toBe("12345678901234");
		expect(phoneNumberHelper.fn("28005551212")).toBe("28005551212"); // 11 digits but doesn't start with 1
	});

	it("should handle edge cases", () => {
		expect(phoneNumberHelper.fn(null)).toBe("");
		expect(phoneNumberHelper.fn(undefined)).toBe("");
		expect(phoneNumberHelper.fn({})).toBe("");
		expect(phoneNumberHelper.fn([])).toBe("");
		expect(phoneNumberHelper.fn("")).toBe("");
	});

	it("should be registered correctly", () => {
		expect(phoneNumberHelper.name).toBe("phoneNumber");
		expect(phoneNumberHelper.category).toBe("Number");
		expect(typeof phoneNumberHelper.fn).toBe("function");
	});
});

describe("abbreviateNumberHelper", () => {
	it("should abbreviate large numbers", () => {
		expect(abbreviateNumberHelper.fn(1000, "1")).toBe("1.0k");
		expect(abbreviateNumberHelper.fn(45000, "1")).toBe("45.0k");
		expect(abbreviateNumberHelper.fn(1234567, "2")).toBe("1.23M");
		expect(abbreviateNumberHelper.fn(5500000, "3")).toBe("5.500M");
		expect(abbreviateNumberHelper.fn(1000000000, "1")).toBe("1.0B");
		expect(abbreviateNumberHelper.fn(1000000000000, "2")).toBe("1.00T");
	});

	it("should handle small numbers", () => {
		expect(abbreviateNumberHelper.fn(0, "1")).toBe("0.0");
		expect(abbreviateNumberHelper.fn(1, "2")).toBe("1.00");
		expect(abbreviateNumberHelper.fn(999, "1")).toBe("999.0");
	});

	it("should handle precision parameter as string", () => {
		expect(abbreviateNumberHelper.fn(1234567, "0")).toBe("1M");
		expect(abbreviateNumberHelper.fn(1234567, "1")).toBe("1.2M");
		expect(abbreviateNumberHelper.fn(1234567, "3")).toBe("1.235M");
	});

	it("should handle precision parameter as number", () => {
		expect(abbreviateNumberHelper.fn(1234567, 0)).toBe("1M");
		expect(abbreviateNumberHelper.fn(1234567, 2)).toBe("1.23M");
	});

	it("should handle invalid precision", () => {
		expect(abbreviateNumberHelper.fn(1234567, "invalid")).toBe("1.2M"); // falls back to default 1
		expect(abbreviateNumberHelper.fn(1234567, -1)).toBe("1.2M"); // falls back to default 1
		expect(abbreviateNumberHelper.fn(1234567, null)).toBe("1.2M"); // falls back to default 1
	});

	it("should handle negative numbers", () => {
		expect(abbreviateNumberHelper.fn(-1234567, "2")).toBe("-1.23M");
		expect(abbreviateNumberHelper.fn(-45000, "1")).toBe("-45.0k");
	});

	it("should handle edge cases", () => {
		expect(abbreviateNumberHelper.fn(null, "1")).toBe("0");
		expect(abbreviateNumberHelper.fn(undefined, "1")).toBe("0");
		expect(abbreviateNumberHelper.fn(Number.NaN, "1")).toBe("0");
		expect(abbreviateNumberHelper.fn("string", "1")).toBe("0");
	});

	it("should be registered correctly", () => {
		expect(abbreviateNumberHelper.name).toBe("abbreviateNumber");
		expect(abbreviateNumberHelper.category).toBe("Number");
		expect(typeof abbreviateNumberHelper.fn).toBe("function");
	});
});

describe("toExponentialHelper", () => {
	it("should convert to exponential notation", () => {
		expect(toExponentialHelper.fn(1234567)).toBe("1.234567e+6");
		expect(toExponentialHelper.fn(0.000123)).toMatch(/1\.23e-4/);
		expect(toExponentialHelper.fn(123.456)).toMatch(/1\.23456e\+2/);
	});

	it("should handle fraction digits parameter", () => {
		expect(toExponentialHelper.fn(1234567, "2")).toBe("1.23e+6");
		expect(toExponentialHelper.fn(0.000123, "1")).toBe("1.2e-4");
		expect(toExponentialHelper.fn(123.456, "3")).toBe("1.235e+2");
	});

	it("should handle fraction digits as number", () => {
		expect(toExponentialHelper.fn(1234567, 2)).toBe("1.23e+6");
		expect(toExponentialHelper.fn(123.456, 0)).toBe("1e+2");
	});

	it("should handle invalid fraction digits", () => {
		expect(toExponentialHelper.fn(1234567, "invalid")).toBe("1.234567e+6");
		expect(toExponentialHelper.fn(1234567, -1)).toBe("1.234567e+6");
		expect(toExponentialHelper.fn(1234567, 101)).toBe("1.234567e+6"); // > 100
	});

	it("should handle special numbers", () => {
		expect(toExponentialHelper.fn(0)).toBe("0e+0");
		expect(toExponentialHelper.fn(-123.456, "2")).toBe("-1.23e+2");
	});

	it("should handle edge cases", () => {
		expect(toExponentialHelper.fn(null)).toBe("0");
		expect(toExponentialHelper.fn(undefined)).toBe("0");
		expect(toExponentialHelper.fn(Number.NaN)).toBe("0");
		expect(toExponentialHelper.fn("string")).toBe("0");
	});

	it("should be registered correctly", () => {
		expect(toExponentialHelper.name).toBe("toExponential");
		expect(toExponentialHelper.category).toBe("Number");
		expect(typeof toExponentialHelper.fn).toBe("function");
	});
});

describe("toFixedHelper", () => {
	it("should format with fixed decimal places", () => {
		expect(toFixedHelper.fn(85.1234, "2")).toBe("85.12");
		expect(toFixedHelper.fn(1.23456, "3")).toBe("1.235");
		expect(toFixedHelper.fn(0.9876, "1")).toBe("1.0");
		expect(toFixedHelper.fn(123.456, "0")).toBe("123");
	});

	it("should handle digits parameter as number", () => {
		expect(toFixedHelper.fn(85.1234, 2)).toBe("85.12");
		expect(toFixedHelper.fn(1.23456, 4)).toBe("1.2346");
	});

	it("should handle no digits parameter", () => {
		expect(toFixedHelper.fn(85.1234)).toBe("85");
		expect(toFixedHelper.fn(1.9)).toBe("2");
	});

	it("should handle invalid digits parameter", () => {
		expect(toFixedHelper.fn(85.1234, "invalid")).toBe("85");
		expect(toFixedHelper.fn(85.1234, -1)).toBe("85");
		expect(toFixedHelper.fn(85.1234, 21)).toBe("85"); // > 20
	});

	it("should handle integers", () => {
		expect(toFixedHelper.fn(123, "2")).toBe("123.00");
		expect(toFixedHelper.fn(0, "3")).toBe("0.000");
	});

	it("should handle negative numbers", () => {
		expect(toFixedHelper.fn(-85.1234, "2")).toBe("-85.12");
		expect(toFixedHelper.fn(-1.5, "0")).toBe("-2");
	});

	it("should handle edge cases", () => {
		expect(toFixedHelper.fn(null)).toBe("0");
		expect(toFixedHelper.fn(undefined)).toBe("0");
		expect(toFixedHelper.fn(Number.NaN)).toBe("0");
		expect(toFixedHelper.fn("string")).toBe("0");
	});

	it("should be registered correctly", () => {
		expect(toFixedHelper.name).toBe("toFixed");
		expect(toFixedHelper.category).toBe("Number");
		expect(typeof toFixedHelper.fn).toBe("function");
	});
});

describe("toPrecisionHelper", () => {
	it("should format with specified precision", () => {
		expect(toPrecisionHelper.fn(1.23456, "3")).toBe("1.23");
		expect(toPrecisionHelper.fn(123456.789, "5")).toBe("1.2346e+5");
		expect(toPrecisionHelper.fn(0.00123, "2")).toBe("0.0012");
		expect(toPrecisionHelper.fn(12345, "3")).toBe("1.23e+4");
	});

	it("should handle precision parameter as number", () => {
		expect(toPrecisionHelper.fn(1.23456, 3)).toBe("1.23");
		expect(toPrecisionHelper.fn(123.456, 2)).toBe("1.2e+2");
	});

	it("should handle no precision parameter", () => {
		expect(toPrecisionHelper.fn(1.23456)).toBe("1.23456");
		expect(toPrecisionHelper.fn(123)).toBe("123");
	});

	it("should handle invalid precision parameter", () => {
		expect(toPrecisionHelper.fn(1.23456, "invalid")).toBe("0");
		expect(toPrecisionHelper.fn(1.23456, 0)).toBe("0"); // < 1
		expect(toPrecisionHelper.fn(1.23456, 101)).toBe("0"); // > 100
	});

	it("should handle single digit precision", () => {
		expect(toPrecisionHelper.fn(123.456, "1")).toBe("1e+2");
		expect(toPrecisionHelper.fn(0.123, "1")).toBe("0.1");
	});

	it("should handle large precision values", () => {
		expect(toPrecisionHelper.fn(1.23456, "10")).toBe("1.234560000");
	});

	it("should handle negative numbers", () => {
		expect(toPrecisionHelper.fn(-1.23456, "3")).toBe("-1.23");
		expect(toPrecisionHelper.fn(-123456.789, "4")).toBe("-1.235e+5");
	});

	it("should handle special numbers", () => {
		expect(toPrecisionHelper.fn(0, "3")).toBe("0.00");
	});

	it("should handle edge cases", () => {
		expect(toPrecisionHelper.fn(null)).toBe("0");
		expect(toPrecisionHelper.fn(undefined)).toBe("0");
		expect(toPrecisionHelper.fn(Number.NaN)).toBe("0");
		expect(toPrecisionHelper.fn("string")).toBe("0");
	});

	it("should be registered correctly", () => {
		expect(toPrecisionHelper.name).toBe("toPrecision");
		expect(toPrecisionHelper.category).toBe("Number");
		expect(typeof toPrecisionHelper.fn).toBe("function");
	});
});

describe("numberHelpers array", () => {
	it("should contain all number helpers", () => {
		expect(numberHelpers).toHaveLength(7);
		expect(numberHelpers).toContain(bytesHelper);
		expect(numberHelpers).toContain(addCommasHelper);
		expect(numberHelpers).toContain(phoneNumberHelper);
		expect(numberHelpers).toContain(abbreviateNumberHelper);
		expect(numberHelpers).toContain(toExponentialHelper);
		expect(numberHelpers).toContain(toFixedHelper);
		expect(numberHelpers).toContain(toPrecisionHelper);
	});

	it("should have proper Helper structure for all helpers", () => {
		for (const helper of numberHelpers) {
			expect(helper).toHaveProperty("name");
			expect(helper).toHaveProperty("category");
			expect(helper).toHaveProperty("fn");
			expect(typeof helper.name).toBe("string");
			expect(helper.category).toBe("Number");
			expect(typeof helper.fn).toBe("function");
		}
	});

	it("should have unique names", () => {
		const names = numberHelpers.map((helper) => helper.name);
		const uniqueNames = [...new Set(names)];
		expect(names).toHaveLength(uniqueNames.length);
	});
});
