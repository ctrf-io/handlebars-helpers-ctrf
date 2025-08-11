import type { Helper } from "../helper-registry.js";

/**
 * Extend the context with the properties of other objects.
 * A shallow merge is performed to avoid mutating the context.
 * Useful for combining test metadata, configuration objects, and report data in CTRF templates.
 *
 * @example
 * {{extend test.metadata test.config}}
 * <!-- merges test metadata with configuration for comprehensive reporting -->
 *
 * {{extend test.results test.summary}}
 * <!-- combines test results with summary data for complete report -->
 *
 * @param {unknown} context - The base context object from test data.
 * @param {...unknown} objects - One or more objects to extend with.
 * @returns {Record<string, unknown>} The extended object for use in test reports.
 */
export const extendHelper: Helper = {
	name: "extend",
	category: "Object",
	fn: (context: unknown, ...objects: unknown[]) => {
		if (typeof context !== "object" || context === null) {
			return {};
		}

		const result = { ...(context as Record<string, unknown>) };

		for (const obj of objects) {
			if (typeof obj === "object" && obj !== null) {
				Object.assign(result, obj as Record<string, unknown>);
			}
		}

		return result;
	},
};

/**
 * Block helper that iterates over the properties of an object, exposing each key and value on the context.
 * Useful for rendering test metadata, configuration settings, or nested test data in CTRF reports.
 *
 * @example
 * {{#forIn test.metadata}}
 *   {{@key}}: {{this}}
 * {{/forIn}}
 * <!-- renders all metadata key-value pairs -->
 *
 * {{#forIn test.config}}
 *   <tr><td>{{@key}}</td><td>{{this}}</td></tr>
 * {{/forIn}}
 * <!-- creates table rows for configuration settings -->
 *
 * @param {unknown} context - The object to iterate over from test data.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block for each property with key and value exposed.
 */
export const forInHelper: Helper = {
	name: "forIn",
	category: "Object",
	fn: (context: unknown, options: unknown) => {
		if (
			typeof context !== "object" ||
			context === null ||
			typeof options !== "object" ||
			options === null ||
			typeof (options as { fn?: (context: unknown) => string }).fn !==
				"function"
		) {
			return "";
		}

		const obj = context as Record<string, unknown>;
		let result = "";

		for (const key in obj) {
			if (Object.hasOwn(obj, key)) {
				const blockContext = { this: obj[key], "@key": key };
				result += (options as { fn: (context: unknown) => string }).fn(
					blockContext,
				);
			}
		}

		return result;
	},
};

/**
 * Block helper that iterates over the **own** properties of an object, exposing each key and value on the context.
 * Useful for rendering test-specific data without inherited properties in CTRF reports.
 *
 * @example
 * {{#forOwn test.results}}
 *   {{@key}}: {{this}}
 * {{/forOwn}}
 * <!-- renders only own properties of test results -->
 *
 * {{#forOwn test.metadata}}
 *   <li>{{@key}}: {{this}}</li>
 * {{/forOwn}}
 * <!-- creates list items for metadata properties -->
 *
 * @param {unknown} obj - The object to iterate over from test data.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block for each own property with key and value exposed.
 */
export const forOwnHelper: Helper = {
	name: "forOwn",
	category: "Object",
	fn: (obj: unknown, options: unknown) => {
		if (
			typeof obj !== "object" ||
			obj === null ||
			typeof options !== "object" ||
			options === null ||
			typeof (options as { fn?: (context: unknown) => string }).fn !==
				"function"
		) {
			return "";
		}

		const object = obj as Record<string, unknown>;
		let result = "";

		for (const key of Object.keys(object)) {
			const blockContext = { this: object[key], "@key": key };
			result += (options as { fn: (context: unknown) => string }).fn(
				blockContext,
			);
		}

		return result;
	},
};

/**
 * Take arguments and, if they are string or number, convert them to a dot-delineated object property path.
 * Useful for creating dynamic property paths for accessing nested test data in CTRF reports.
 *
 * @example
 * {{toPath "test" "results" "status"}}
 * <!-- results in: "test.results.status" -->
 *
 * {{toPath "suite" 0 "name"}}
 * <!-- results in: "suite.0.name" -->
 *
 * @param {...unknown} props - The property segments to assemble (can be multiple).
 * @returns {string} The dot-delineated property path for use in test reports.
 */
export const toPathHelper: Helper = {
	name: "toPath",
	category: "Object",
	fn: (...props: unknown[]) => {
		return props.map((prop) => String(prop)).join(".");
	},
};

/**
 * Use property paths (`a.b.c`) to get a value or nested value from the context.
 * Works as a regular helper or block helper.
 * Useful for accessing deeply nested test data, configuration values, or metadata in CTRF reports.
 *
 * @example
 * {{get "test.results.status" test}}
 * <!-- gets the status from nested test results -->
 *
 * {{get "suite.tests.0.name" data}}
 * <!-- gets the name of the first test in a suite -->
 *
 * {{#get "test.metadata" test}}
 *   {{this}}
 * {{/get}}
 * <!-- renders metadata as block content -->
 *
 * @param {unknown} prop - The property to get, optionally using dot notation for nested properties.
 * @param {unknown} context - The context object from test data.
 * @param {unknown} options - The handlebars options object, if used as a block helper.
 * @returns {unknown} The retrieved value for use in test reports.
 */
export const getHelper: Helper = {
	name: "get",
	category: "Object",
	fn: (prop: unknown, context: unknown, options?: unknown) => {
		if (
			typeof prop !== "string" ||
			typeof context !== "object" ||
			context === null
		) {
			return undefined;
		}

		const getNestedValue = (
			obj: Record<string, unknown>,
			path: string,
		): unknown => {
			const keys = path.split(".");
			let current = obj;

			for (const key of keys) {
				if (current === null || typeof current !== "object") {
					return undefined;
				}
				current = current[key] as Record<string, unknown>;
			}

			return current;
		};

		const value = getNestedValue(context as Record<string, unknown>, prop);

		// If used as a block helper
		if (
			options &&
			typeof options === "object" &&
			options !== null &&
			typeof (options as { fn?: (context: unknown) => string }).fn ===
				"function"
		) {
			return (options as { fn: (context: unknown) => string }).fn(value);
		}

		return value;
	},
};

/**
 * Use property paths (`a.b.c`) to get an object from the context.
 * Differs from the `get` helper in that this helper will return the actual object, including the given property key.
 * Also, this helper does not work as a block helper.
 * Useful for accessing parent objects or containers in CTRF reports.
 *
 * @example
 * {{getObject "test.results" test}}
 * <!-- gets the entire results object, not just a nested value -->
 *
 * {{getObject "suite.tests" data}}
 * <!-- gets the tests array object from the suite -->
 *
 * @param {unknown} prop - The property to get, optionally using dot notation for nested properties.
 * @param {unknown} context - The context object from test data.
 * @returns {unknown} The retrieved object for use in test reports.
 */
export const getObjectHelper: Helper = {
	name: "getObject",
	category: "Object",
	fn: (prop: unknown, context: unknown) => {
		if (
			typeof prop !== "string" ||
			typeof context !== "object" ||
			context === null
		) {
			return undefined;
		}

		const getNestedObject = (
			obj: Record<string, unknown>,
			path: string,
		): unknown => {
			const keys = path.split(".");
			let current = obj;

			for (let i = 0; i < keys.length - 1; i++) {
				const key = keys[i];
				if (current === null || typeof current !== "object") {
					return undefined;
				}
				current = current[key] as Record<string, unknown>;
			}

			const lastKey = keys[keys.length - 1];
			if (current === null || typeof current !== "object") {
				return undefined;
			}

			return current[lastKey];
		};

		return getNestedObject(context as Record<string, unknown>, prop);
	},
};

/**
 * Return true if `key` is an own, enumerable property of the given `context` object.
 * Useful for conditional logic and validation in CTRF report templates.
 *
 * @example
 * {{hasOwn test "status"}}
 * <!-- returns true if test has own status property -->
 *
 * {{#if (hasOwn test.metadata "priority")}}
 *   Priority: {{test.metadata.priority}}
 * {{/if}}
 * <!-- conditionally displays priority if it exists -->
 *
 * @param {unknown} context - The context object from test data.
 * @param {unknown} key - The property key to check.
 * @returns {boolean} True if the key is an own, enumerable property for use in test reports.
 */
export const hasOwnHelper: Helper = {
	name: "hasOwn",
	category: "Object",
	fn: (context: unknown, key: unknown) => {
		if (
			typeof context !== "object" ||
			context === null ||
			typeof key !== "string"
		) {
			return false;
		}

		return Object.hasOwn(context, key);
	},
};

/**
 * Return true if `value` is an object.
 * Useful for conditional logic and type checking in CTRF report templates.
 *
 * @example
 * {{isObject test.results}}
 * <!-- returns true if test.results is an object -->
 *
 * {{isObject "string"}}
 * <!-- returns false -->
 *
 * {{#if (isObject test.metadata)}}
 *   {{#forIn test.metadata}}
 *     {{@key}}: {{this}}
 *   {{/forIn}}
 * {{/if}}
 * <!-- only iterate if metadata is an object -->
 *
 * @param {unknown} value - The value from test data to check.
 * @returns {boolean} True if the value is an object for use in test reports.
 */
export const isObjectHelper: Helper = {
	name: "isObject",
	category: "Object",
	fn: (value: unknown) => {
		return typeof value === "object" && value !== null;
	},
};

/**
 * Parses the given string using `JSON.parse`.
 * Useful for parsing JSON strings from test data, configuration, or API responses in CTRF reports.
 *
 * @example
 * {{JSONparse test.jsonData}}
 * <!-- given that test.jsonData is '{"status": "passed", "duration": 1000}' -->
 * <!-- results in: { status: 'passed', duration: 1000 } -->
 *
 * {{#JSONparse test.configString}}
 *   {{status}} - {{duration}}ms
 * {{/JSONparse}}
 * <!-- parses and renders parsed JSON as block content -->
 *
 * @param {unknown} string - The string to parse from test data.
 * @param {unknown} options - Handlebars options object for block usage.
 * @returns {unknown} The parsed object for use in test reports.
 */
export const JSONparseHelper: Helper = {
	name: "JSONparse",
	category: "Object",
	fn: (string: unknown, options?: unknown) => {
		if (typeof string !== "string") {
			return undefined;
		}

		try {
			const parsed = JSON.parse(string);

			// If used as a block helper
			if (
				options &&
				typeof options === "object" &&
				options !== null &&
				typeof (options as { fn?: (context: unknown) => string }).fn ===
					"function"
			) {
				return (options as { fn: (context: unknown) => string }).fn(parsed);
			}

			return parsed;
		} catch {
			return undefined;
		}
	},
};

/**
 * Stringify an object using `JSON.stringify`.
 * Useful for serializing test data, configuration objects, or complex data structures in CTRF reports.
 *
 * @example
 * {{JSONstringify test.results}}
 * <!-- given that test.results is { status: 'passed', duration: 1000 } -->
 * <!-- results in: '{"status":"passed","duration":1000}' -->
 *
 * {{JSONstringify test.metadata}}
 * <!-- serializes metadata for logging or debugging -->
 *
 * @param {unknown} obj - Object to stringify from test data.
 * @returns {string} The JSON string for use in test reports.
 */
export const JSONstringifyHelper: Helper = {
	name: "JSONstringify",
	category: "Object",
	fn: (obj: unknown) => {
		try {
			return JSON.stringify(obj);
		} catch {
			return "";
		}
	},
};

/**
 * Deeply merge the properties of the given `objects` with the context object.
 * Useful for combining test data, configuration, and metadata with deep merging in CTRF reports.
 *
 * @example
 * {{merge test.results test.metadata}}
 * <!-- deeply merges test results with metadata -->
 *
 * {{merge {} test.config test.overrides}}
 * <!-- creates a new object by merging config with overrides -->
 *
 * @param {unknown} object - The target object. Pass an empty object to shallow clone.
 * @param {...unknown} objects - Additional objects to merge.
 * @returns {Record<string, unknown>} The merged object for use in test reports.
 */
export const mergeHelper: Helper = {
	name: "merge",
	category: "Object",
	fn: (object: unknown, ...objects: unknown[]) => {
		if (typeof object !== "object" || object === null) {
			return {};
		}

		const deepMerge = (
			target: Record<string, unknown>,
			source: Record<string, unknown>,
		): Record<string, unknown> => {
			const result = { ...target };

			for (const key in source) {
				if (Object.hasOwn(source, key)) {
					const targetValue = result[key];
					const sourceValue = source[key];

					if (
						typeof targetValue === "object" &&
						targetValue !== null &&
						typeof sourceValue === "object" &&
						sourceValue !== null &&
						!Array.isArray(targetValue) &&
						!Array.isArray(sourceValue)
					) {
						result[key] = deepMerge(
							targetValue as Record<string, unknown>,
							sourceValue as Record<string, unknown>,
						);
					} else {
						result[key] = sourceValue;
					}
				}
			}

			return result;
		};

		let result = { ...(object as Record<string, unknown>) };

		for (const obj of objects) {
			if (typeof obj === "object" && obj !== null) {
				result = deepMerge(result, obj as Record<string, unknown>);
			}
		}

		return result;
	},
};

/**
 * Pick properties from the context object.
 * Useful for selecting specific test data fields, creating filtered views, or extracting relevant information in CTRF reports.
 *
 * @example
 * {{pick test "name" "status" "duration"}}
 * <!-- picks only name, status, and duration from test object -->
 *
 * {{#pick test.metadata "priority" "category"}}
 *   {{priority}} - {{category}}
 * {{/pick}}
 * <!-- picks specific metadata fields and renders as block -->
 *
 * {{#pick test.results "passed" "failed"}}
 *   Passed: {{passed}}, Failed: {{failed}}
 * {{else}}
 *   No results available
 * {{/pick}}
 * <!-- conditionally renders picked values or fallback -->
 *
 * @param {unknown} properties - One or more properties to pick.
 * @param {unknown} context - The context object from test data.
 * @param {unknown} options - Handlebars options object.
 * @returns {unknown} Returns an object with the picked values. If used as a block helper, the values are passed as context to the inner block. If no values are found, the context is passed to the inverse block.
 */
export const pickHelper: Helper = {
	name: "pick",
	category: "Object",
	fn: (properties: unknown, context: unknown, options?: unknown) => {
		if (
			typeof context !== "object" ||
			context === null ||
			typeof properties !== "string"
		) {
			return {};
		}

		const props = properties.split(/\s+/).filter(Boolean);
		const picked: Record<string, unknown> = {};
		let hasValues = false;

		for (const prop of props) {
			if (Object.hasOwn(context, prop)) {
				picked[prop] = (context as Record<string, unknown>)[prop];
				hasValues = true;
			}
		}

		// If used as a block helper
		if (options && typeof options === "object" && options !== null) {
			const optionsObj = options as {
				fn?: (context: unknown) => string;
				inverse?: () => string;
			};

			if (hasValues && typeof optionsObj.fn === "function") {
				return optionsObj.fn(picked);
			} else if (typeof optionsObj.inverse === "function") {
				return optionsObj.inverse();
			}
		}

		return picked;
	},
};

export const objectHelpers: Helper[] = [
	extendHelper,
	forInHelper,
	forOwnHelper,
	getHelper,
	getObjectHelper,
	hasOwnHelper,
	isObjectHelper,
	JSONparseHelper,
	JSONstringifyHelper,
	mergeHelper,
	pickHelper,
	toPathHelper,
];
