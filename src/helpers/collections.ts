import type { Helper } from "../helper-registry.js";

/**
 * Checks if a collection (array, object, or string) is empty.
 *
 * Inline, subexpression, or block helper that returns true (or the block) if the given collection is empty,
 * or false (or the inverse block, if supplied) if the collection is not empty.
 *
 * Useful in CTRF test reporting for conditionally rendering sections when there are no tests, errors, or results.
 *
 * @example
 * {{#isEmpty test.results}}No results!{{else}}Results found.{{/isEmpty}}
 * <!-- Renders "No results!" if test.results is empty, otherwise "Results found." -->
 *
 * {{isEmpty test.errors}}
 * <!-- Renders true if test.errors is empty, false otherwise -->
 *
 * @param {unknown} collection - The collection (array, object, or string) to check.
 * @param {unknown} [options] - Handlebars options object (for block usage).
 * @returns {boolean|string} True/false for inline/subexpression, or rendered block for block usage.
 *
 * Use this to hide empty test sections, display fallback messages, or control report layout based on data presence.
 */
export const isEmptyHelper: Helper = {
	name: "isEmpty",
	category: "Collections",
	fn: (collection: unknown, options?: unknown) => {
		let empty = false;
		if (collection == null) {
			empty = true;
		} else if (Array.isArray(collection) || typeof collection === "string") {
			empty = collection.length === 0;
		} else if (typeof collection === "object") {
			empty = Object.keys(collection as object).length === 0;
		}
		// Block helper usage
		if (
			options &&
			typeof options === "object" &&
			options !== null &&
			typeof (options as { fn?: () => string }).fn === "function"
		) {
			if (empty) {
				return (options as { fn: () => string }).fn();
			} else if (
				typeof (options as { inverse?: () => string }).inverse === "function"
			) {
				return (options as { inverse: () => string }).inverse();
			}
			return "";
		}
		// Inline/subexpression usage
		return empty;
	},
};

/**
 * Block helper that iterates over an array or object, exposing each item (and key for objects) to the block.
 *
 * If an array is given, .forEach is called; if an object is given, .forOwn is called; otherwise the inverse block is returned.
 *
 * Useful in CTRF test reporting for iterating over dynamic test results, error maps, or grouped data.
 *
 * @example
 * {{#iterate test.results}}
 *   Test: {{this.name}} - Status: {{this.status}}
 * {{else}}
 *   No test results.
 * {{/iterate}}
 * <!-- Iterates over test.results array, or shows fallback if empty -->
 *
 * {{#iterate test.stats}}
 *   {{@key}}: {{this}}
 * {{/iterate}}
 * <!-- Iterates over object keys/values, e.g. test.stats = { passed: 5, failed: 2 } -->
 *
 * @param {unknown} collection - The collection (array or object) to iterate over.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block for each item, or inverse block if not iterable.
 *
 *  Use this to render dynamic tables, lists, or grouped summaries in test reports.
 */
export const iterateHelper: Helper = {
	name: "iterate",
	category: "Collections",
	fn: (collection: unknown, options: unknown) => {
		if (
			!options ||
			typeof options !== "object" ||
			options === null ||
			typeof (options as { fn?: (context: unknown, opts?: unknown) => string })
				.fn !== "function"
		) {
			return "";
		}
		const fn = (options as { fn: (context: unknown, opts?: unknown) => string })
			.fn;
		const inverse =
			typeof (options as { inverse?: () => string }).inverse === "function"
				? (options as { inverse: () => string }).inverse
				: undefined;
		let output = "";
		if (Array.isArray(collection)) {
			if (collection.length === 0 && inverse) return inverse();
			collection.forEach((item, idx) => {
				output += fn(item, { data: { index: idx } });
			});
			return output;
		} else if (collection && typeof collection === "object") {
			const keys = Object.keys(collection);
			if (keys.length === 0 && inverse) return inverse();
			keys.forEach((key) => {
				// Expose key as @key in Handlebars
				output += fn((collection as Record<string, unknown>)[key], {
					data: { key },
				});
			});
			return output;
		} else if (inverse) {
			return inverse();
		}
		return "";
	},
};

export const collectionsHelpers: Helper[] = [isEmptyHelper, iterateHelper];
