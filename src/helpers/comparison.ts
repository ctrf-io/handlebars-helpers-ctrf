import type { Helper } from "../helper-registry";

/**
 * Helper that renders the block if both of the given values are truthy.
 * If an inverse block is specified it will be rendered when falsy.
 * Works as a block helper, inline helper or subexpression.
 *
 * @example
 * {{#and test.passed (not test.flaky)}}Test is stable and passed{{else}}Unstable or failed{{/and}}
 *  Use to show a message only if a test both passed and is not flaky in a CTRF report.
 */
export const andHelper: Helper = {
	name: "and",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		const result = Boolean(a) && Boolean(b);
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Render a block when a comparison of the first and third arguments returns true.
 * The second argument is the arithmetic operator to use. You may also optionally specify an inverse block to render when falsy.
 *
 * @example
 * {{#compare test.duration ">" 1000}}Long-running test{{else}}Quick test{{/compare}}
 *  Use to highlight tests that exceed a duration threshold in test reports.
 */
export const compareHelper: Helper = {
	name: "compare",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, operator, b, options] = args;
		let result = false;
		switch (operator) {
			case "==":
				// biome-ignore lint/suspicious/noDoubleEquals: This helper intentionally uses loose equality
				result = a == b;
				break;
			case "===":
				result = a === b;
				break;
			case "!=":
				// biome-ignore lint/suspicious/noDoubleEquals: This helper intentionally uses loose equality
				result = a != b;
				break;
			case "!==":
				result = a !== b;
				break;
			case ">":
				result = (a as number) > (b as number);
				break;
			case ">=":
				result = (a as number) >= (b as number);
				break;
			case "<":
				result = (a as number) < (b as number);
				break;
			case "<=":
				result = (a as number) <= (b as number);
				break;
			default:
				throw new Error(`Unknown operator: ${operator}`);
		}
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Block helper that renders the block if collection has the given value, using strict equality (===) for comparison, otherwise the inverse block is rendered (if specified).
 * If a startIndex is specified and is negative, it is used as the offset from the end of the collection.
 *
 * @example
 * {{#contains test.tags "flaky"}}Flaky test{{else}}Stable test{{/contains}}
 *  Use to check if a test's tags include "flaky" or another status in a CTRF report.
 */
export const containsHelper: Helper = {
	name: "contains",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		let [collection, value, startIndex, options] = args;
		if (
			typeof startIndex === "object" &&
			startIndex !== null &&
			options === undefined
		) {
			options = startIndex;
			startIndex = 0;
		}
		let found = false;
		if (Array.isArray(collection) || typeof collection === "string") {
			let idx =
				typeof startIndex === "number"
					? startIndex
					: parseInt(String(startIndex), 10);
			if (Number.isNaN(idx)) idx = 0;
			if (idx < 0) idx = (collection as string | unknown[]).length + idx;
			if (typeof collection === "string") {
				found = collection.slice(idx).includes(value as string);
			} else {
				found = (collection as unknown[]).slice(idx).includes(value);
			}
		} else if (typeof collection === "object" && collection !== null) {
			found = Object.values(collection).includes(value);
		}
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return found
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return found;
	},
};

/**
 * Returns the first value that is not undefined, otherwise the default value is returned.
 *
 * @example
 * {{default test.error "No error message"}}
 *  Use to provide fallback text for missing error messages in test reports.
 */
export const defaultHelper: Helper = {
	name: "default",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [value, defaultValue] = args;
		return value !== undefined ? value : defaultValue;
	},
};

/**
 * Block helper that renders a block if a is equal to b. If an inverse block is specified it will be rendered when falsy.
 * You may optionally use the compare="" hash argument for the second value.
 *
 * @example
 * {{#eq test.status "passed"}}✓ Passed{{else}}✗ Failed{{/eq}}
 *  Use to show a checkmark for passed tests and a cross for failed ones in a CTRF summary.
 */
export const eqHelper: Helper = {
	name: "eq",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		const result = a === b;
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Block helper that renders a block if a is greater than b.
 * If an inverse block is specified it will be rendered when falsy.
 * You may optionally use the compare="" hash argument for the second value.
 *
 * @example
 * {{#gt test.duration 2000}}Test took longer than 2s{{else}}Test was quick{{/gt}}
 *  Use to highlight slow tests in a test duration report.
 */
export const gtHelper: Helper = {
	name: "gt",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		const result = (a as number) > (b as number);
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Block helper that renders a block if a is greater than or equal to b.
 * If an inverse block is specified it will be rendered when falsy.
 * You may optionally use the compare="" hash argument for the second value.
 *
 * @example
 * {{#gte test.retries 1}}Test was retried{{else}}No retries{{/gte}}
 *  Use to show a warning if a test was retried at least once in a CTRF report.
 */
export const gteHelper: Helper = {
	name: "gte",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		const result = (a as number) >= (b as number);
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Block helper that renders a block if value has pattern. If an inverse block is specified it will be rendered when falsy.
 *
 * @example
 * {{#has test.message "timeout"}}Timeout error detected{{else}}No timeout{{/has}}
 *  Use to check if a test's error message contains a specific keyword in a report.
 */
export const hasHelper: Helper = {
	name: "has",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [val, pattern, options] = args;
		let found = false;
		if (typeof val === "string" && typeof pattern === "string") {
			found = val.includes(pattern);
		} else if (Array.isArray(val)) {
			found = val.includes(pattern);
		}
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return found
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return found;
	},
};

/**
 * Returns true if the given value is falsey. Uses JS falsey semantics.
 *
 * @example
 * {{#if (isFalsey test.error)}}No error present{{/if}}
 *  Use to check if a test has no error message in a summary table.
 */
export const isFalseyHelper: Helper = {
	name: "isFalsey",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [val] = args;
		return !val;
	},
};

/**
 * Returns true if the given value is truthy. Uses JS truthy semantics.
 *
 * @example
 * {{#if (isTruthy test.passed)}}Test passed{{/if}}
 *  Use to check if a test passed in a conditional block.
 */
export const isTruthyHelper: Helper = {
	name: "isTruthy",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [val] = args;
		return !!val;
	},
};

/**
 * Return true if the given value is an even number.
 *
 * @example
 * {{#ifEven @index}}Even row{{else}}Odd row{{/ifEven}}
 *  Use to alternate row colors in a test report table by index.
 */
export const ifEvenHelper: Helper = {
	name: "ifEven",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [number, options] = args;
		const result = typeof number === "number" && number % 2 === 0;
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Conditionally renders a block if the remainder is zero when a operand is divided by b. If an inverse block is specified it will be rendered when the remainder is not zero.
 *
 * @example
 * {{#ifNth @index 3}}Every third row{{/ifNth}}
 *  Use to highlight every nth test in a report table.
 */
export const ifNthHelper: Helper = {
	name: "ifNth",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		const result =
			typeof a === "number" && typeof b === "number" && b !== 0 && a % b === 0;
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Block helper that renders a block if value is an odd number. If an inverse block is specified it will be rendered when falsy.
 *
 * @example
 * {{#ifOdd @index}}Odd row{{else}}Even row{{/ifOdd}}
 *  Use to alternate row colors in a test report table by index.
 */
export const ifOddHelper: Helper = {
	name: "ifOdd",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [value, options] = args;
		const result = typeof value === "number" && value % 2 === 1;
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Block helper that renders a block if a is equal to b. If an inverse block is specified it will be rendered when falsy. Similar to eq but does not do strict equality.
 *
 * @example
 * {{#is test.status 1}}Loose match for status{{/is}}
 *  Use for loose equality checks on test status or codes in a report.
 */
export const isHelper: Helper = {
	name: "is",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		// biome-ignore lint/suspicious/noDoubleEquals: This helper intentionally uses loose equality
		const result = a == b;
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Block helper that renders a block if a is not equal to b. If an inverse block is specified it will be rendered when falsy. Similar to unlessEq but does not use strict equality for comparisons.
 *
 * @example
 * {{#isnt test.status "failed"}}Not failed{{/isnt}}
 *  Use to show a message for tests that are not failed in a summary.
 */
export const isntHelper: Helper = {
	name: "isnt",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		// biome-ignore lint/suspicious/noDoubleEquals: This helper intentionally uses loose equality
		const result = a != b;
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Block helper that renders a block if a is less than b.
 * If an inverse block is specified it will be rendered when falsy.
 * You may optionally use the compare="" hash argument for the second value.
 *
 * @example
 * {{#lt test.duration 500}}Very fast test{{else}}Not very fast{{/lt}}
 *  Use to highlight tests that are especially quick in a report.
 */
export const ltHelper: Helper = {
	name: "lt",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		const result = (a as number) < (b as number);
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Block helper that renders a block if a is less than or equal to b.
 * If an inverse block is specified it will be rendered when falsy.
 * You may optionally use the compare="" hash argument for the second value.
 *
 * @example
 * {{#lte test.retries 0}}No retries{{else}}Retried{{/lte}}
 *  Use to show a message for tests that were not retried in a CTRF report.
 */
export const lteHelper: Helper = {
	name: "lte",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		const result = (a as number) <= (b as number);
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Block helper that renders a block if neither of the given values are truthy. If an inverse block is specified it will be rendered when falsy.
 *
 * @example
 * {{#neither test.passed test.retryPassed}}Both failed{{/neither}}
 *  Use to check if both a test and its retry failed in a report.
 */
export const neitherHelper: Helper = {
	name: "neither",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		const result = !a && !b;
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Returns true if val is falsey. Works as a block or inline helper.
 *
 * @example
 * {{#not test.passed}}Test failed{{/not}}
 *  Use to show a message for failed tests in a summary table.
 */
export const notHelper: Helper = {
	name: "not",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [val, options] = args;
		const result = !val;
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string }).fn ===
				"function"
		) {
			return result
				? (options as { fn: () => string }).fn()
				: ((options as { inverse?: () => string }).inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Block helper that renders a block if any of the given values is truthy. If an inverse block is specified it will be rendered when falsy.
 *
 * @example
 * {{#or test.failed test.flaky}}Attention needed{{/or}}
 *  Use to show a warning if a test is either failed or flaky in a CTRF report.
 */
export const orHelper: Helper = {
	name: "or",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		let options: { fn?: () => string; inverse?: () => string } | undefined;
		let values: unknown[] = args;
		if (
			args.length > 0 &&
			typeof args[args.length - 1] === "object" &&
			args[args.length - 1] !== null &&
			typeof (
				args[args.length - 1] as { fn?: () => string; inverse?: () => string }
			).fn === "function"
		) {
			options = args[args.length - 1] as {
				fn?: () => string;
				inverse?: () => string;
			};
			values = args.slice(0, -1);
		}
		const result = values.some(Boolean);
		if (options && typeof options.fn === "function") {
			return result ? options.fn() : (options.inverse?.() ?? "");
		}
		return result;
	},
};

/**
 * Block helper that always renders the inverse block unless a is is equal to b.
 *
 * @example
 * {{#unlessEq test.status "failed"}}Not failed{{/unlessEq}}
 *  Use to show a message for tests that are not failed in a CTRF report.
 */
export const unlessEqHelper: Helper = {
	name: "unlessEq",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		// biome-ignore lint/suspicious/noDoubleEquals: This helper intentionally uses loose equality
		const result = a == b;
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string })
				.inverse === "function"
		) {
			return result
				? (options as { inverse: () => string }).inverse()
				: ((options as { fn?: () => string }).fn?.() ?? "");
		}
		return !result;
	},
};

/**
 * Block helper that always renders the inverse block unless a is is greater than b.
 *
 * @example
 * {{#unlessGt test.duration 1000}}Not long{{/unlessGt}}
 *  Use to show a message for tests that are not long-running in a report.
 */
export const unlessGtHelper: Helper = {
	name: "unlessGt",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		const result = (a as number) > (b as number);
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string })
				.inverse === "function"
		) {
			return result
				? (options as { inverse: () => string }).inverse()
				: ((options as { fn?: () => string }).fn?.() ?? "");
		}
		return !result;
	},
};

/**
 * Block helper that always renders the inverse block unless a is is less than b.
 *
 * @example
 * {{#unlessLt test.duration 500}}Not very fast{{/unlessLt}}
 *  Use to show a message for tests that are not especially quick in a report.
 */
export const unlessLtHelper: Helper = {
	name: "unlessLt",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		const result = (a as number) < (b as number);
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string })
				.inverse === "function"
		) {
			return result
				? (options as { inverse: () => string }).inverse()
				: ((options as { fn?: () => string }).fn?.() ?? "");
		}
		return !result;
	},
};

/**
 * Block helper that always renders the inverse block unless a is is greater than or equal to b.
 *
 * @example
 * {{#unlessGteq test.retries 1}}No retries{{/unlessGteq}}
 *  Use to show a message for tests that were not retried in a CTRF report.
 */
export const unlessGteqHelper: Helper = {
	name: "unlessGteq",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		const result = (a as number) >= (b as number);
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string })
				.inverse === "function"
		) {
			return result
				? (options as { inverse: () => string }).inverse()
				: ((options as { fn?: () => string }).fn?.() ?? "");
		}
		return !result;
	},
};

/**
 * Block helper that always renders the inverse block unless a is is less than or equal to b.
 *
 * @example
 * {{#unlessLteq test.retries 0}}Retried at least once{{/unlessLteq}}
 *  Use to show a message for tests that were retried in a CTRF report.
 */
export const unlessLteqHelper: Helper = {
	name: "unlessLteq",
	category: "Comparison",
	fn: (...args: unknown[]) => {
		const [a, b, options] = args;
		const result = (a as number) <= (b as number);
		if (
			options &&
			typeof (options as { fn?: () => string; inverse?: () => string })
				.inverse === "function"
		) {
			return result
				? (options as { inverse: () => string }).inverse()
				: ((options as { fn?: () => string }).fn?.() ?? "");
		}
		return !result;
	},
};

export const comparisonHelpers: Helper[] = [
	andHelper,
	compareHelper,
	containsHelper,
	defaultHelper,
	eqHelper,
	gtHelper,
	gteHelper,
	hasHelper,
	isFalseyHelper,
	isTruthyHelper,
	ifEvenHelper,
	ifNthHelper,
	ifOddHelper,
	isHelper,
	isntHelper,
	ltHelper,
	lteHelper,
	neitherHelper,
	notHelper,
	orHelper,
	unlessEqHelper,
	unlessGtHelper,
	unlessLtHelper,
	unlessGteqHelper,
	unlessLteqHelper,
];
