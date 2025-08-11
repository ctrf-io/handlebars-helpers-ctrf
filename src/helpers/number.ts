import type { Helper } from "../helper-registry.js";

/**
 * Format a number to its equivalent in bytes. If a string is passed,
 * its length will be formatted and returned.
 * Useful for displaying test file sizes, memory usage, or data transfer amounts in test reports.
 *
 * @example
 * {{bytes test.stats.totalFileSize}}
 * <!-- given that totalFileSize is 13661855 -->
 * <!-- results in: "13.66 MB" -->
 *
 * {{bytes test.name}}
 * <!-- given that test.name is "Login Test" -->
 * <!-- results in: "10 B" (length of string) -->
 *
 * {{bytes test.stats.coverageSize}}
 * <!-- given that coverageSize is 825399 -->
 * <!-- results in: "825.39 kB" -->
 *
 * **Use with CTRF templates**: Perfect for displaying test artifact sizes, log file sizes, or memory consumption metrics in test reports.
 *
 * @param {unknown} number - The number or string from test data to format as bytes.
 * @returns {string} The formatted byte string for use in test reports.
 */
export const bytesHelper: Helper = {
	name: "bytes",
	category: "Number",
	fn: (number: unknown) => {
		let bytes: number;

		if (typeof number === "string") {
			bytes = number.length;
		} else if (typeof number === "number" && !Number.isNaN(number)) {
			bytes = number;
		} else {
			return "0 B";
		}

		if (bytes === 0) return "0 B";

		const units = ["B", "kB", "MB", "GB", "TB", "PB"];
		const k = 1000;
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		const size = bytes / k ** i;

		if (i === 0) {
			return `${bytes} B`;
		}

		return `${size.toFixed(2)} ${units[i]}`;
	},
};

/**
 * Add commas to numbers for improved readability.
 * Useful for formatting large numbers like test counts, execution times, or file sizes in test reports.
 *
 * @example
 * {{addCommas test.stats.totalTests}}
 * <!-- given that totalTests is 1500 -->
 * <!-- results in: "1,500" -->
 *
 * {{addCommas test.duration}}
 * <!-- given that duration is 123456 -->
 * <!-- results in: "123,456" -->
 *
 * {{addCommas test.stats.assertions}}
 * <!-- given that assertions is 50000 -->
 * <!-- results in: "50,000" -->
 *
 * **Use with CTRF templates**: Essential for making large test metrics readable, such as total test counts, assertion counts, or execution times in milliseconds.
 *
 * @param {unknown} num - The number from test data to format with commas.
 * @returns {string} The comma-formatted number string for use in test reports.
 */
export const addCommasHelper: Helper = {
	name: "addCommas",
	category: "Number",
	fn: (num: unknown) => {
		if (typeof num !== "number" || Number.isNaN(num)) {
			return "0";
		}
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
};

/**
 * Convert a string or number to a formatted phone number.
 * Useful for formatting contact information in test reports or user data validation tests.
 *
 * @example
 * {{phoneNumber test.user.phone}}
 * <!-- given that user.phone is "8005551212" -->
 * <!-- results in: "(800) 555-1212" -->
 *
 * {{phoneNumber "5551234567"}}
 * <!-- results in: "(555) 123-4567" -->
 *
 * {{phoneNumber test.contactInfo.emergencyPhone}}
 * <!-- formats emergency contact numbers in test user data -->
 *
 * **Use with CTRF templates**: Useful when testing applications with user registration, contact forms, or when displaying formatted test data that includes phone numbers.
 *
 * @param {unknown} num - The phone number from test data to format, e.g., `8005551212`.
 * @returns {string} Formatted phone number: `(800) 555-1212` for use in test reports.
 */
export const phoneNumberHelper: Helper = {
	name: "phoneNumber",
	category: "Number",
	fn: (num: unknown) => {
		let phoneStr: string;

		if (typeof num === "number") {
			phoneStr = num.toString();
		} else if (typeof num === "string") {
			// Remove all non-digit characters
			phoneStr = num.replace(/\D/g, "");
		} else {
			return "";
		}

		// Handle 10-digit US phone numbers
		if (phoneStr.length === 10) {
			return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
		}

		// Handle 11-digit numbers (with country code 1)
		if (phoneStr.length === 11 && phoneStr.startsWith("1")) {
			const tenDigit = phoneStr.slice(1);
			return `(${tenDigit.slice(0, 3)}) ${tenDigit.slice(3, 6)}-${tenDigit.slice(6)}`;
		}

		// Return original if not a standard format
		return phoneStr;
	},
};

/**
 * Abbreviate numbers to the given number of precision. This is for
 * general numbers, not size in bytes.
 * Useful for displaying large test metrics like execution counts or performance numbers in test reports.
 *
 * @example
 * {{abbreviateNumber test.stats.totalAssertions "2"}}
 * <!-- given that totalAssertions is 1234567 -->
 * <!-- results in: "1.23M" -->
 *
 * {{abbreviateNumber test.performance.opsPerSecond "1"}}
 * <!-- given that opsPerSecond is 45000 -->
 * <!-- results in: "45.0k" -->
 *
 * {{abbreviateNumber test.stats.memoryUsage "3"}}
 * <!-- given that memoryUsage is 5500000 -->
 * <!-- results in: "5.500M" -->
 *
 * **Use with CTRF templates**: Perfect for dashboard displays showing abbreviated test metrics, performance indicators, or large statistical values without overwhelming the report layout.
 *
 * @param {unknown} number - The number from test data to abbreviate.
 * @param {unknown} precision - The number of decimal places to show.
 * @returns {string} The abbreviated number string for use in test reports.
 */
export const abbreviateNumberHelper: Helper = {
	name: "abbreviateNumber",
	category: "Number",
	fn: (number: unknown, precision: unknown) => {
		if (typeof number !== "number" || Number.isNaN(number)) {
			return "0";
		}

		let precisionDigits = 1;
		if (typeof precision === "string") {
			const parsed = parseInt(precision, 10);
			if (!Number.isNaN(parsed) && parsed >= 0) {
				precisionDigits = parsed;
			}
		} else if (
			typeof precision === "number" &&
			!Number.isNaN(precision) &&
			precision >= 0
		) {
			precisionDigits = precision;
		}

		const abbreviations = [
			{ value: 1e12, symbol: "T" },
			{ value: 1e9, symbol: "B" },
			{ value: 1e6, symbol: "M" },
			{ value: 1e3, symbol: "k" },
		];

		const abs = Math.abs(number);

		for (const abbr of abbreviations) {
			if (abs >= abbr.value) {
				const abbreviated = number / abbr.value;
				return abbreviated.toFixed(precisionDigits) + abbr.symbol;
			}
		}

		return number.toFixed(precisionDigits);
	},
};

/**
 * Returns a string representing the given number in exponential notation.
 * Useful for displaying very large or very small test metrics and scientific notation in test reports.
 *
 * @example
 * {{toExponential test.stats.totalExecutions}}
 * <!-- given that totalExecutions is 1234567 -->
 * <!-- results in: "1.234567e+6" -->
 *
 * {{toExponential test.performance.nanoseconds "2"}}
 * <!-- given that nanoseconds is 0.000123 -->
 * <!-- results in: "1.23e-4" -->
 *
 * {{toExponential test.stats.bigNumber "4"}}
 * <!-- formats very large numbers with 4 fraction digits -->
 *
 * **Use with CTRF templates**: Ideal for scientific test data, performance benchmarks with extreme values, or when displaying test results that involve very large or very small numbers.
 *
 * @param {unknown} number - The number from test data to convert to exponential notation.
 * @param {unknown} fractionDigits - Optional. The number of digits after the decimal point.
 * @returns {string} The exponential notation string for use in test reports.
 */
export const toExponentialHelper: Helper = {
	name: "toExponential",
	category: "Number",
	fn: (number: unknown, fractionDigits?: unknown) => {
		if (typeof number !== "number" || Number.isNaN(number)) {
			return "0";
		}

		if (fractionDigits === undefined) {
			return number.toExponential();
		}

		let digits: number | undefined;
		if (typeof fractionDigits === "string") {
			const parsed = parseInt(fractionDigits, 10);
			if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 100) {
				digits = parsed;
			}
		} else if (
			typeof fractionDigits === "number" &&
			!Number.isNaN(fractionDigits) &&
			fractionDigits >= 0 &&
			fractionDigits <= 100
		) {
			digits = fractionDigits;
		}

		return digits !== undefined
			? number.toExponential(digits)
			: number.toExponential();
	},
};

/**
 * Formats the given number using fixed-point notation.
 * Useful for displaying consistent decimal precision in test metrics, percentages, and measurements in test reports.
 *
 * @example
 * {{toFixed test.coverage.percentage "2"}}
 * <!-- given that percentage is 85.1234 -->
 * <!-- results in: "85.12" -->
 *
 * {{toFixed test.performance.avgResponseTime "3"}}
 * <!-- given that avgResponseTime is 1.23456 -->
 * <!-- results in: "1.235" -->
 *
 * {{toFixed test.stats.successRate "1"}}
 * <!-- given that successRate is 0.9876 -->
 * <!-- results in: "1.0" -->
 *
 * **Use with CTRF templates**: Essential for displaying consistent formatting of percentages, timing data, success rates, and any decimal values in test reports.
 *
 * @param {unknown} number - The number from test data to format with fixed-point notation.
 * @param {unknown} digits - Optional. The number of digits after the decimal point (0-20).
 * @returns {string} The fixed-point formatted string for use in test reports.
 */
export const toFixedHelper: Helper = {
	name: "toFixed",
	category: "Number",
	fn: (number: unknown, digits?: unknown) => {
		if (typeof number !== "number" || Number.isNaN(number)) {
			return "0";
		}

		let fractionDigits = 0;
		if (typeof digits === "string") {
			const parsed = parseInt(digits, 10);
			if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 20) {
				fractionDigits = parsed;
			}
		} else if (
			typeof digits === "number" &&
			!Number.isNaN(digits) &&
			digits >= 0 &&
			digits <= 20
		) {
			fractionDigits = digits;
		}

		return number.toFixed(fractionDigits);
	},
};

/**
 * Returns a string representing the Number object to the specified precision.
 * Useful for displaying test metrics with consistent significant digits and scientific precision in test reports.
 *
 * @example
 * {{toPrecision test.performance.throughput "3"}}
 * <!-- given that throughput is 1.23456 -->
 * <!-- results in: "1.23" -->
 *
 * {{toPrecision test.stats.memoryUsage "5"}}
 * <!-- given that memoryUsage is 123456.789 -->
 * <!-- results in: "1.2346e+5" -->
 *
 * {{toPrecision test.timing.duration "2"}}
 * <!-- given that duration is 0.00123 -->
 * <!-- results in: "0.0012" -->
 *
 * **Use with CTRF templates**: Perfect for displaying performance metrics, scientific test data, or any values where you need consistent significant digit precision across different scales.
 *
 * @param {unknown} number - The number from test data to format with specified precision.
 * @param {unknown} precision - Optional. The number of significant digits (1-100).
 * @returns {string} The precision-formatted string for use in test reports.
 */
export const toPrecisionHelper: Helper = {
	name: "toPrecision",
	category: "Number",
	fn: (number: unknown, precision?: unknown) => {
		if (typeof number !== "number" || Number.isNaN(number)) {
			return "0";
		}

		if (precision === undefined) {
			return number.toString();
		}

		let significantDigits: number | undefined;
		if (typeof precision === "string") {
			const parsed = parseInt(precision, 10);
			if (!Number.isNaN(parsed) && parsed >= 1 && parsed <= 100) {
				significantDigits = parsed;
			}
		} else if (
			typeof precision === "number" &&
			!Number.isNaN(precision) &&
			precision >= 1 &&
			precision <= 100
		) {
			significantDigits = precision;
		}

		if (significantDigits === undefined) {
			return "0";
		}

		return number.toPrecision(significantDigits);
	},
};

/**
 * Converts a decimal rate (0-1) to a percentage with fixed decimal places.
 * This is specifically for rates from the CTRF insights that are calculated as decimals.
 * Useful for displaying test success rates, failure rates, flaky rates, and coverage percentages in test reports.
 *
 * @example
 * {{toPercent test.stats.successRate 2}}
 * <!-- given that successRate is 0.9876 -->
 * <!-- results in: "98.76" -->
 *
 * {{toPercent test.coverage.failRate 1}}
 * <!-- given that failRate is 0.0525 -->
 * <!-- results in: "5.3" -->
 *
 * {{toPercent test.performance.flakyRate 3}}
 * <!-- given that flakyRate is 0.001 -->
 * <!-- results in: "0.100" -->
 *
 * **Use with CTRF templates**: Essential for displaying test rates, success/failure percentages, coverage metrics, and any decimal values that represent ratios as readable percentages in test reports.
 *
 * @param {unknown} rate - The numeric rate as a decimal (0-1) from test data.
 * @param {unknown} fractionDigits - Optional. The number of decimal places (0-20). Defaults to 2.
 * @returns {string} The formatted percentage string for use in test reports.
 */
export const toPercentHelper: Helper = {
	name: "toPercent",
	category: "Number",
	fn: (rate: unknown, fractionDigits?: unknown) => {
		// Handle null, undefined, or NaN values
		if (rate == null || typeof rate !== "number" || Number.isNaN(rate)) {
			return "0.00";
		}

		let digits = 2; // Default to 2 decimal places for rates
		if (typeof fractionDigits === "string") {
			const parsed = parseInt(fractionDigits, 10);
			if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 20) {
				digits = parsed;
			}
		} else if (
			typeof fractionDigits === "number" &&
			!Number.isNaN(fractionDigits) &&
			fractionDigits >= 0 &&
			fractionDigits <= 20
		) {
			digits = fractionDigits;
		}

		return (rate * 100).toFixed(digits);
	},
};

export const numberHelpers: Helper[] = [
	bytesHelper,
	addCommasHelper,
	phoneNumberHelper,
	abbreviateNumberHelper,
	toExponentialHelper,
	toFixedHelper,
	toPrecisionHelper,
	toPercentHelper,
];
