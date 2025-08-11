import type { Helper } from "../helper-registry";

/**
 * Return the magnitude (absolute value) of a number.
 * Useful for normalizing test durations, error counts, or differences in CTRF reports.
 *
 * @example
 * {{abs test.duration}}
 * <!-- given that test.duration is -42 -->
 * <!-- results in: 42 -->
 *
 * @param {unknown} a - The value to get the absolute value of.
 * @returns {number} The absolute value.
 *  Use to display positive-only metrics in test summaries.
 */
export const absHelper: Helper = {
	name: "abs",
	category: "Math",
	fn: (a: unknown) => {
		const n = typeof a === "number" ? a : parseFloat(String(a));
		return Number.isNaN(n) ? 0 : Math.abs(n);
	},
};

/**
 * Return the sum of a plus b.
 * Useful for aggregating test metrics, such as total retries or combined durations.
 *
 * @example
 * {{add test.duration 100}}
 * <!-- given that test.duration is 50 -->
 * <!-- results in: 150 -->
 *
 * @param {unknown} a - First number.
 * @param {unknown} b - Second number.
 * @returns {number} The sum.
 *  Use to add fixed offsets to test metrics.
 */
export const addHelper: Helper = {
	name: "add",
	category: "Math",
	fn: (a: unknown, b: unknown) => {
		const n1 = typeof a === "number" ? a : parseFloat(String(a));
		const n2 = typeof b === "number" ? b : parseFloat(String(b));
		return (Number.isNaN(n1) ? 0 : n1) + (Number.isNaN(n2) ? 0 : n2);
	},
};

/**
 * Adds multiple numbers together and returns the sum.
 * Useful for totaling multiple test metrics or values in a single expression.
 *
 * @example
 * {{addAll test.duration test.retries 100}}
 * <!-- given that test.duration is 50 and test.retries is 3 -->
 * <!-- results in: 153 -->
 *
 * {{addAll 1 2 3 4 5}}
 * <!-- results in: 15 -->
 *
 * @param {...unknown} args - The numbers to be added (last argument is Handlebars options).
 * @returns {number} The sum of all provided numbers.
 *  Use to combine multiple test metrics into a total.
 */
export const addAllHelper: Helper = {
	name: "addAll",
	category: "Math",
	fn: (...args: unknown[]) => {
		// Remove the last argument which is Handlebars options object
		const values = args.slice(0, -1);
		return values.reduce((sum: number, value: unknown) => {
			const num = typeof value === "number" ? value : parseFloat(String(value));
			return sum + (Number.isNaN(num) ? 0 : num);
		}, 0);
	},
};

/**
 * Returns the average of all numbers in the given array.
 * Useful for calculating average test durations, retry counts, or error rates in CTRF reports.
 *
 * @example
 * {{avg "[1, 2, 3, 4, 5]"}}
 * <!-- results in: 3 -->
 *
 * @param {unknown} arr - Array of numbers (array or JSON string).
 * @returns {number} The average value.
 *  Use to show average test duration in a summary table.
 */
export const avgHelper: Helper = {
	name: "avg",
	category: "Math",
	fn: (arr: unknown) => {
		let array: unknown[] = [];
		if (Array.isArray(arr)) array = arr;
		else if (typeof arr === "string") {
			try {
				array = JSON.parse(arr);
			} catch {
				return 0;
			}
		}
		const nums = array
			.map((x) => (typeof x === "number" ? x : parseFloat(String(x))))
			.filter((n) => !Number.isNaN(n));
		if (nums.length === 0) return 0;
		return nums.reduce((a, b) => a + b, 0) / nums.length;
	},
};

/**
 * Get the Math.ceil() of the given value.
 * Useful for rounding up test metrics, such as duration or retry counts.
 *
 * @example
 * {{ceil test.duration}}
 * <!-- given that test.duration is 1.2 -->
 * <!-- results in: 2 -->
 *
 * @param {unknown} value - The value to ceil.
 * @returns {number} The ceiled value.
 *  Use to ensure minimum thresholds in test reporting.
 */
export const ceilHelper: Helper = {
	name: "ceil",
	category: "Math",
	fn: (value: unknown) => {
		const n = typeof value === "number" ? value : parseFloat(String(value));
		return Number.isNaN(n) ? 0 : Math.ceil(n);
	},
};

/**
 * Divide a by b.
 * Useful for calculating rates, averages, or percentages in CTRF reports.
 *
 * @example
 * {{divide test.duration test.retries}}
 * <!-- given that test.duration is 100, test.retries is 4 -->
 * <!-- results in: 25 -->
 *
 * @param {unknown} a - Numerator.
 * @param {unknown} b - Denominator.
 * @returns {number} The result of division, or 0 if denominator is 0.
 *  Use to compute average duration per retry.
 */
export const divideHelper: Helper = {
	name: "divide",
	category: "Math",
	fn: (a: unknown, b: unknown) => {
		const n1 = typeof a === "number" ? a : parseFloat(String(a));
		const n2 = typeof b === "number" ? b : parseFloat(String(b));
		if (Number.isNaN(n1) || Number.isNaN(n2) || n2 === 0) return 0;
		return n1 / n2;
	},
};

/**
 * Get the Math.floor() of the given value.
 * Useful for rounding down test metrics, such as duration or retry counts.
 *
 * @example
 * {{floor test.duration}}
 * <!-- given that test.duration is 1.8 -->
 * <!-- results in: 1 -->
 *
 * @param {unknown} value - The value to floor.
 * @returns {number} The floored value.
 *  Use to truncate values for display.
 */
export const floorHelper: Helper = {
	name: "floor",
	category: "Math",
	fn: (value: unknown) => {
		const n = typeof value === "number" ? value : parseFloat(String(value));
		return Number.isNaN(n) ? 0 : Math.floor(n);
	},
};

/**
 * Return the difference of a minus b.
 * Useful for calculating deltas between test metrics, such as duration differences.
 *
 * @example
 * {{minus test.duration 10}}
 * <!-- given that test.duration is 50 -->
 * <!-- results in: 40 -->
 *
 * @param {unknown} a - First number.
 * @param {unknown} b - Second number.
 * @returns {number} The difference.
 *  Use to show improvement or regression in test times.
 */
export const minusHelper: Helper = {
	name: "minus",
	category: "Math",
	fn: (a: unknown, b: unknown) => {
		const n1 = typeof a === "number" ? a : parseFloat(String(a));
		const n2 = typeof b === "number" ? b : parseFloat(String(b));
		return (Number.isNaN(n1) ? 0 : n1) - (Number.isNaN(n2) ? 0 : n2);
	},
};

/**
 * Get the remainder of a division operation (a % b).
 * Useful for calculating modulo in test metrics, such as grouping or bucketing.
 *
 * @example
 * {{modulo test.index 3}}
 * <!-- given that test.index is 7 -->
 * <!-- results in: 1 -->
 *
 * @param {unknown} a - Numerator.
 * @param {unknown} b - Denominator.
 * @returns {number} The remainder.
 *  Use to alternate row colors in test tables.
 */
export const moduloHelper: Helper = {
	name: "modulo",
	category: "Math",
	fn: (a: unknown, b: unknown) => {
		const n1 = typeof a === "number" ? a : parseFloat(String(a));
		const n2 = typeof b === "number" ? b : parseFloat(String(b));
		if (Number.isNaN(n1) || Number.isNaN(n2) || n2 === 0) return 0;
		return n1 % n2;
	},
};

/**
 * Return the product of a times b.
 * Useful for scaling test metrics, such as multiplying durations or retry counts.
 *
 * @example
 * {{multiply test.duration 2}}
 * <!-- given that test.duration is 10 -->
 * <!-- results in: 20 -->
 *
 * @param {unknown} a - First factor.
 * @param {unknown} b - Second factor.
 * @returns {number} The product.
 *  Use to double or scale test metrics.
 */
export const multiplyHelper: Helper = {
	name: "multiply",
	category: "Math",
	fn: (a: unknown, b: unknown) => {
		const n1 = typeof a === "number" ? a : parseFloat(String(a));
		const n2 = typeof b === "number" ? b : parseFloat(String(b));
		return (Number.isNaN(n1) ? 0 : n1) * (Number.isNaN(n2) ? 0 : n2);
	},
};

/**
 * Add a by b (alias for add).
 * Useful for summing test metrics.
 *
 * @example
 * {{plus test.duration 5}}
 * <!-- given that test.duration is 10 -->
 * <!-- results in: 15 -->
 *
 * @param {unknown} a - First number.
 * @param {unknown} b - Second number.
 * @returns {number} The sum.
 *  Use to increment test metrics.
 */
export const plusHelper: Helper = {
	name: "plus",
	category: "Math",
	fn: (a: unknown, b: unknown) => {
		const n1 = typeof a === "number" ? a : parseFloat(String(a));
		const n2 = typeof b === "number" ? b : parseFloat(String(b));
		return (Number.isNaN(n1) ? 0 : n1) + (Number.isNaN(n2) ? 0 : n2);
	},
};

/**
 * Generate a random number between two values (inclusive, integer).
 * Useful for generating random test data or sampling in CTRF reports.
 *
 * @example
 * {{random 1 10}}
 * <!-- results in: 7 (random integer between 1 and 10) -->
 *
 * @param {unknown} min - Minimum value.
 * @param {unknown} max - Maximum value.
 * @returns {number} Random integer between min and max.
 *  Use to create randomized test IDs or sample data.
 */
export const randomHelper: Helper = {
	name: "random",
	category: "Math",
	fn: (min: unknown, max: unknown) => {
		const n1 = typeof min === "number" ? min : parseFloat(String(min));
		const n2 = typeof max === "number" ? max : parseFloat(String(max));
		if (Number.isNaN(n1) || Number.isNaN(n2)) return 0;
		return Math.floor(Math.random() * (n2 - n1 + 1)) + n1;
	},
};

/**
 * Get the remainder when a is divided by b (alias for modulo).
 * Useful for grouping or bucketing test metrics.
 *
 * @example
 * {{remainder test.index 4}}
 * <!-- given that test.index is 10 -->
 * <!-- results in: 2 -->
 *
 * @param {unknown} a - Numerator.
 * @param {unknown} b - Denominator.
 * @returns {number} The remainder.
 *  Use to alternate row colors in test tables.
 */
export const remainderHelper: Helper = {
	name: "remainder",
	category: "Math",
	fn: (a: unknown, b: unknown) => {
		const n1 = typeof a === "number" ? a : parseFloat(String(a));
		const n2 = typeof b === "number" ? b : parseFloat(String(b));
		if (Number.isNaN(n1) || Number.isNaN(n2) || n2 === 0) return 0;
		return n1 % n2;
	},
};

/**
 * Round the given number to the nearest integer.
 * Useful for rounding test metrics for display in CTRF reports.
 *
 * @example
 * {{round test.duration}}
 * <!-- given that test.duration is 1.7 -->
 * <!-- results in: 2 -->
 *
 * @param {unknown} number - The number to round.
 * @returns {number} The rounded value.
 *  Use to display rounded metrics in summary tables.
 */
export const roundHelper: Helper = {
	name: "round",
	category: "Math",
	fn: (number: unknown) => {
		const n = typeof number === "number" ? number : parseFloat(String(number));
		return Number.isNaN(n) ? 0 : Math.round(n);
	},
};

/**
 * Return the difference of a minus b (alias for minus).
 * Useful for calculating deltas between test metrics.
 *
 * @example
 * {{subtract test.duration 5}}
 * <!-- given that test.duration is 10 -->
 * <!-- results in: 5 -->
 *
 * @param {unknown} a - First number.
 * @param {unknown} b - Second number.
 * @returns {number} The difference.
 *  Use to show improvement or regression in test times.
 */
export const subtractHelper: Helper = {
	name: "subtract",
	category: "Math",
	fn: (a: unknown, b: unknown) => {
		const n1 = typeof a === "number" ? a : parseFloat(String(a));
		const n2 = typeof b === "number" ? b : parseFloat(String(b));
		return (Number.isNaN(n1) ? 0 : n1) - (Number.isNaN(n2) ? 0 : n2);
	},
};

/**
 * Returns the sum of all numbers in the given array.
 * Useful for calculating total durations, retries, or error counts in CTRF reports.
 *
 * @example
 * {{sum "[1, 2, 3, 4, 5]"}}
 * <!-- results in: 15 -->
 *
 * @param {unknown} arr - Array of numbers (array or JSON string).
 * @returns {number} The sum.
 *  Use to show total test duration in a summary table.
 */
export const sumHelper: Helper = {
	name: "sum",
	category: "Math",
	fn: (arr: unknown) => {
		let array: unknown[] = [];
		if (Array.isArray(arr)) array = arr;
		else if (typeof arr === "string") {
			try {
				array = JSON.parse(arr);
			} catch {
				return 0;
			}
		}
		const nums = array
			.map((x) => (typeof x === "number" ? x : parseFloat(String(x))))
			.filter((n) => !Number.isNaN(n));
		if (nums.length === 0) return 0;
		return nums.reduce((a, b) => a + b, 0);
	},
};

/**
 * Multiply number a by number b (alias for multiply).
 * Useful for scaling test metrics.
 *
 * @example
 * {{times test.duration 3}}
 * <!-- given that test.duration is 5 -->
 * <!-- results in: 15 -->
 *
 * @param {unknown} a - First factor.
 * @param {unknown} b - Second factor.
 * @returns {number} The product.
 *  Use to scale test metrics for reporting.
 */
export const timesHelper: Helper = {
	name: "times",
	category: "Math",
	fn: (a: unknown, b: unknown) => {
		const n1 = typeof a === "number" ? a : parseFloat(String(a));
		const n2 = typeof b === "number" ? b : parseFloat(String(b));
		return (Number.isNaN(n1) ? 0 : n1) * (Number.isNaN(n2) ? 0 : n2);
	},
};

export const mathHelpers: Helper[] = [
	absHelper,
	addHelper,
	addAllHelper,
	avgHelper,
	ceilHelper,
	divideHelper,
	floorHelper,
	minusHelper,
	moduloHelper,
	multiplyHelper,
	plusHelper,
	randomHelper,
	remainderHelper,
	roundHelper,
	subtractHelper,
	sumHelper,
	timesHelper,
];
