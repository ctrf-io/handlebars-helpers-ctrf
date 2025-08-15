import type { Helper } from "../helper-registry.js";

/**
 * Return the given value of prop from this.options.
 *
 * Useful for accessing runtime options passed to the template, such as CTRF configuration or test report metadata.
 *
 * @example
 * {{option "a.b.c"}}
 * <!-- If options = { a: { b: { c: "foo" } } }, results in: "foo" -->
 *
 * @param {string} prop - The dot-notated property path to retrieve from this.options.
 * @returns {any} The value at the given property path, or undefined if not found.
 *
 * @remarks
 * Use in CTRF templates to access custom options, e.g. test report settings or environment info.
 *
 *
 * Use with: {{option "report.title"}} to inject a custom report title from options.
 */
export const optionHelper: Helper = {
	name: "option",
	category: "Misc",
	fn: function (this: unknown, prop: unknown) {
		if (
			typeof prop !== "string" ||
			typeof this !== "object" ||
			this === null ||
			!("options" in this)
		)
			return undefined;
		const options = (this as { options: unknown }).options;
		if (typeof options !== "object" || options === null) return undefined;
		const parts = prop.split(".");
		let value: unknown = options;
		for (const part of parts) {
			if (typeof value === "object" && value !== null && part in value) {
				value = (value as Record<string, unknown>)[part];
			} else {
				return undefined;
			}
		}
		return value;
	},
};

/**
 * Block helper that renders the block without taking any arguments.
 *
 * Useful for grouping content or as a placeholder in CTRF test report templates.
 *
 * @example
 * {{#noop}}
 *   This block is always rendered.
 * {{/noop}}
 *
 * @param {object} options - Handlebars options object.
 * @returns {string} The rendered block content.
 *
 *
 * Use to wrap template sections for clarity or future extension in CTRF templates.
 */
export const noopHelper: Helper = {
	name: "noop",
	category: "Misc",
	fn: function (this: unknown, options: unknown) {
		if (
			options &&
			typeof options === "object" &&
			options !== null &&
			"fn" in options &&
			typeof (options as { fn: (...args: unknown[]) => unknown }).fn ===
				"function"
		) {
			return (options as { fn: (...args: unknown[]) => unknown }).fn(this);
		}
		return "";
	},
};

/**
 * Get the native type of the given value.
 *
 * Useful for debugging or conditional logic in CTRF test report templates.
 *
 * @example
 * {{typeOf 1}}         //=> 'number'
 * {{typeOf "foo"}}     //=> 'string'
 * {{typeOf test.data}} //=> 'object'
 *
 * @param {any} value - The value to check.
 * @returns {string} The native type of the value.
 *
 *
 * Use to branch template logic based on value type in CTRF templates.
 */
export const typeOfHelper: Helper = {
	name: "typeOf",
	category: "Misc",
	fn: (value: unknown) => {
		if (value === null) return "null";
		if (Array.isArray(value)) return "array";
		return typeof value;
	},
};

/**
 * Block helper that builds the context for the block from the options hash.
 *
 * Useful for injecting dynamic context in CTRF test report templates.
 *
 * @example
 * {{#withHash foo="bar" count=3}}
 *   Foo: {{foo}}, Count: {{count}}
 * {{/withHash}}
 * <!-- results in: Foo: bar, Count: 3 -->
 *
 * @param {object} options - Handlebars options object with hash.
 * @returns {string} The rendered block with hash context.
 *
 *
 * Use to pass ad-hoc data to a block in CTRF templates, e.g. for test metadata.
 */
export const withHashHelper: Helper = {
	name: "withHash",
	category: "Misc",
	fn: function (this: unknown, options: unknown) {
		if (
			options &&
			typeof options === "object" &&
			options !== null &&
			"fn" in options &&
			typeof (options as { fn: (...args: unknown[]) => unknown }).fn ===
				"function" &&
			"hash" in options &&
			typeof (options as { hash: unknown }).hash === "object" &&
			(options as { hash: unknown }).hash !== null
		) {
			return (options as { fn: (...args: unknown[]) => unknown }).fn({
				...(this as object),
				...(options as { hash: object }).hash,
			});
		}
		return "";
	},
};

export const miscHelpers: Helper[] = [
	optionHelper,
	noopHelper,
	typeOfHelper,
	withHashHelper,
];
