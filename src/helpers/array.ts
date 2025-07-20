import type { Helper } from "../helper-registry";

/**
 * Returns all of the items in an array after the specified index. Opposite of before.
 * Useful for slicing test result arrays to show only later results in CTRF reports.
 *
 * @example
 * {{after test.results 1}}
 * <!-- given that test.results is ["a", "b", "c", "d"] -->
 * <!-- results in: ["b", "c", "d"] -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} n - Starting index (number of items to exclude).
 * @returns {unknown[]} Array excluding n items from the start.
 */
export const afterHelper: Helper = {
	name: "after",
	category: "Array",
	fn: (array: unknown, n: unknown) => {
		if (!Array.isArray(array)) return [];
		const idx = typeof n === "number" ? n : parseInt(String(n), 10);
		return array.slice(idx);
	},
};

/**
 * Cast the given value to an array.
 * Useful for normalizing test data fields to arrays for consistent rendering in test reports.
 *
 * @example
 * {{arrayify test.status}}
 * <!-- given that test.status is "passed" -->
 * <!-- results in: ["passed"] -->
 *
 * @param {unknown} value - The value to cast.
 * @returns {unknown[]} The value as an array.
 */
export const arrayifyHelper: Helper = {
	name: "arrayify",
	category: "Array",
	fn: (value: unknown) => {
		if (Array.isArray(value)) return value;
		if (value == null) return [];
		return [value];
	},
};

/**
 * Return all of the items in the collection before the specified count. Opposite of after.
 * Useful for showing only the first N test results or errors in a summary table.
 *
 * @example
 * {{before test.results 2}}
 * <!-- given that test.results is ["a", "b", "c", "d"] -->
 * <!-- results in: ["a", "b"] -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} n - Number of items to include from the start.
 * @returns {unknown[]} Array excluding items after the given number.
 */
export const beforeHelper: Helper = {
	name: "before",
	category: "Array",
	fn: (array: unknown, n: unknown) => {
		if (!Array.isArray(array)) return [];
		const idx = typeof n === "number" ? n : parseInt(String(n), 10);
		return array.slice(0, idx);
	},
};

/**
 * Iterates over each item in an array and exposes the current item and index to the block.
 * Useful for rendering test steps or log entries with their index in CTRF reports.
 *
 * @example
 * {{#eachIndex test.results}}
 *   {{item}} is {{index}}
 * {{/eachIndex}}
 * <!-- given that test.results is ["a", "b"] -->
 * <!-- results in: "a is 0b is 1" -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block for each item with index.
 */
export const eachIndexHelper: Helper = {
	name: "eachIndex",
	category: "Array",
	fn: (array: unknown, options: unknown) => {
		if (
			!Array.isArray(array) ||
			typeof options !== "object" ||
			options === null ||
			typeof (
				options as {
					fn?: (context: { item: unknown; index: number }) => string;
				}
			).fn !== "function"
		)
			return "";
		return array
			.map((item, index) =>
				(
					options as {
						fn: (context: { item: unknown; index: number }) => string;
					}
				).fn({
					item,
					index,
				}),
			)
			.join("");
	},
};

/**
 * Block helper that filters the given array and renders the block for values that evaluate to true, otherwise the inverse block is returned.
 * Useful for displaying only passing or failing tests in a filtered test report section.
 *
 * @example
 * {{#filter test.results "passed"}}AAA{{else}}BBB{{/filter}}
 * <!-- given that test.results is ["passed", "failed"] -->
 * <!-- results in: "AAA" for "passed", "BBB" for others -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} value - The value to filter by.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block for filtered items.
 */
export const filterHelper: Helper = {
	name: "filter",
	category: "Array",
	fn: (array: unknown, value: unknown, options: unknown) => {
		if (
			!Array.isArray(array) ||
			typeof options !== "object" ||
			options === null ||
			typeof (options as { fn?: (item: unknown, index: number) => string })
				.fn !== "function"
		)
			return "";
		const filtered = array.filter((item) => item === value);
		if (filtered.length > 0) {
			return filtered
				.map((item, index) =>
					(options as { fn: (item: unknown, index: number) => string }).fn(
						item,
						index,
					),
				)
				.join("");
		}
		return typeof (options as { inverse?: () => string }).inverse === "function"
			? (options as { inverse: () => string }).inverse()
			: "";
	},
};

/**
 * Returns the first item, or first n items of an array.
 * Useful for showing the first test, or a summary of the first N failures in a report.
 *
 * @example
 * {{first test.results 2}}
 * <!-- given that test.results is ["a", "b", "c"] -->
 * <!-- results in: ["a", "b"] -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} n - Number of items to return from the start.
 * @returns {unknown|unknown[]} The first item or first n items.
 */
export const firstHelper: Helper = {
	name: "first",
	category: "Array",
	fn: (array: unknown, n?: unknown) => {
		if (!Array.isArray(array)) return undefined;
		if (n == null) return array[0];
		const count = typeof n === "number" ? n : parseInt(String(n), 10);
		return array.slice(0, count);
	},
};

/**
 * Iterates over each item in an array and exposes the current item as context to the inner block.
 * Useful for rendering each test case, log entry, or assertion in a test report.
 *
 * @example
 * {{#forEach test.results}}
 *   {{this}}
 * {{/forEach}}
 * <!-- given that test.results is ["a", "b"] -->
 * <!-- results in: "ab" -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block for each item.
 */
export const forEachHelper: Helper = {
	name: "forEach",
	category: "Array",
	fn: (array: unknown, options: unknown) => {
		if (
			!Array.isArray(array) ||
			typeof options !== "object" ||
			options === null ||
			typeof (
				options as {
					fn?: (context: {
						item: unknown;
						index: number;
						isFirst: boolean;
						isLast: boolean;
					}) => string;
				}
			).fn !== "function"
		)
			return "";
		return array
			.map((item, index) => {
				const context = {
					...item,
					index: index,
					total: array.length,
					isFirst: index === 0,
					isLast: index === array.length - 1,
				};
				return (
					options as {
						fn: (context: {
							item: unknown;
							index: number;
							isFirst: boolean;
							isLast: boolean;
						}) => string;
					}
				).fn(context);
			})
			.join("");
	},
};

/**
 * Block helper that renders the block if an array has the given value. Optionally specify an inverse block to render when the array does not have the value.
 * Useful for conditionally rendering sections if a test status or tag is present in the results.
 *
 * @example
 * {{#inArray test.results "passed"}}foo{{else}}bar{{/inArray}}
 * <!-- given that test.results is ["passed", "failed"] -->
 * <!-- results in: "foo" if "passed" is present, otherwise "bar" -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} value - The value to check for.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block if value is present, else inverse.
 */
export const inArrayHelper: Helper = {
	name: "inArray",
	category: "Array",
	fn: (array: unknown, value: unknown, options: unknown) => {
		if (
			!Array.isArray(array) ||
			typeof options !== "object" ||
			options === null ||
			typeof (options as { fn?: () => string }).fn !== "function"
		)
			return "";
		if (array.includes(value)) {
			return (options as { fn: () => string }).fn();
		} else if (
			typeof (options as { inverse?: () => string }).inverse === "function"
		) {
			return (options as { inverse: () => string }).inverse();
		}
		return "";
	},
};

/**
 * Returns true if value is an ES5 array.
 * Useful for checking if a test field is an array before iterating in a template.
 *
 * @example
 * {{isArray test.results}}
 * <!-- given that test.results is ["a", "b"] -->
 * <!-- results in: true -->
 *
 * @param {unknown} value - The value to test.
 * @returns {boolean} True if value is an array.
 */
export const isArrayHelper: Helper = {
	name: "isArray",
	category: "Array",
	fn: (value: unknown) => Array.isArray(value),
};

/**
 * Returns the item from array at index idx.
 *
 * @example
 * {{itemAt test.results 1}}
 * <!-- given that test.results is ["a", "b", "c"] -->
 * <!-- results in: "b" -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} idx - The index to retrieve.
 * @returns {unknown} The item at the given index.
 */
export const itemAtHelper: Helper = {
	name: "itemAt",
	category: "Array",
	fn: (array: unknown, idx: unknown) => {
		if (!Array.isArray(array)) return undefined;
		const index = typeof idx === "number" ? idx : parseInt(String(idx), 10);
		return array[index];
	},
};

/**
 * Join all elements of array into a string, optionally using a given separator.
 *
 * @example
 * {{join test.results}}
 * <!-- given that test.results is ["a", "b", "c"] -->
 * <!-- results in: "a,b,c" -->
 *
 * {{join test.results "-"}}
 * <!-- results in: "a-b-c" -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} separator - The separator to use. Defaults to ','.
 * @returns {string} The joined string.
 */
export const joinHelper: Helper = {
	name: "join",
	category: "Array",
	fn: (array: unknown, separator?: unknown) => {
		if (!Array.isArray(array)) return "";
		return array.join(typeof separator === "string" ? separator : ",");
	},
};

/**
 * Returns true if the length of the given value is equal to the given length. Can be used as a block or inline helper.
 *
 * @example
 * {{equalsLength test.results 2}}
 * <!-- given that test.results is ["a", "b"] -->
 * <!-- results in: true -->
 *
 * @param {unknown} value - The value to test (array or string).
 * @param {unknown} length - The length to compare to.
 * @returns {boolean} True if lengths are equal.
 */
export const equalsLengthHelper: Helper = {
	name: "equalsLength",
	category: "Array",
	fn: (value: unknown, length: unknown) => {
		if (!value || (typeof length !== "number" && typeof length !== "string"))
			return false;
		const len =
			Array.isArray(value) || typeof value === "string" ? value.length : 0;
		const target =
			typeof length === "number" ? length : parseInt(String(length), 10);
		return len === target;
	},
};

/**
 * Returns the last item, or last n items in an array or string. Opposite of first.
 *
 * @example
 * {{last test.results}}
 * <!-- given that test.results is ["a", "b", "c"] -->
 * <!-- results in: "c" -->
 *
 * {{last test.results 2}}
 * <!-- results in: ["b", "c"] -->
 *
 * @param {unknown} value - The array or string from test data.
 * @param {unknown} n - Number of items to return from the end.
 * @returns {unknown|unknown[]} The last item or last n items.
 */
export const lastHelper: Helper = {
	name: "last",
	category: "Array",
	fn: (value: unknown, n?: unknown) => {
		if (!Array.isArray(value) && typeof value !== "string") return undefined;
		const arr = typeof value === "string" ? value.split("") : value;
		if (n == null) return arr[arr.length - 1];
		const count = typeof n === "number" ? n : parseInt(String(n), 10);
		return arr.slice(-count);
	},
};

/**
 * Returns the length of the given string or array.
 *
 * @example
 * {{length test.results}}
 * <!-- given that test.results is ["a", "b", "c"] -->
 * <!-- results in: 3 -->
 *
 * @param {unknown} value - The value to measure (array, object, or string).
 * @returns {number} The length of the value.
 */
export const lengthHelper: Helper = {
	name: "length",
	category: "Array",
	fn: (value: unknown) => {
		if (Array.isArray(value) || typeof value === "string") return value.length;
		if (typeof value === "object" && value !== null)
			return Object.keys(value).length;
		return 0;
	},
};

/**
 * Alias for equalsLength.
 */
export const lengthEqualHelper = equalsLengthHelper;

/**
 * Returns a new array, created by calling function on each element of the given array.
 *
 * @example
 * {{map test.results double}}
 * <!-- given that test.results is [1, 2, 3] and double doubles the value -->
 * <!-- results in: [2, 4, 6] -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} fn - The function to call on each element.
 * @returns {unknown[]} The mapped array.
 */
export const mapHelper: Helper = {
	name: "map",
	category: "Array",
	fn: (...args: unknown[]) => {
		const [array, fn] = args;
		if (!Array.isArray(array) || typeof fn !== "function") return [];
		return array.map(
			fn as (item: unknown, index: number, array: unknown[]) => unknown,
		);
	},
};

/**
 * Map over the given object or array of objects and create an array of values from the given prop. Dot-notation may be used (as a string) to get nested properties.
 *
 * @example
 * {{pluck test.results "name"}}
 * <!-- given that test.results is [{name: "a"}, {name: "b"}] -->
 * <!-- results in: ["a", "b"] -->
 *
 * @param {unknown} collection - The array or object from test data.
 * @param {unknown} prop - The property to pluck (dot notation allowed).
 * @returns {unknown[]} The plucked values.
 */
export const pluckHelper: Helper = {
	name: "pluck",
	category: "Array",
	fn: (...args: unknown[]) => {
		const [collection, prop] = args;
		if (!Array.isArray(collection) || typeof prop !== "string") return [];
		const getProp = (obj: Record<string, unknown>, path: string) => {
			const keys = path.split(".");
			let acc: unknown = obj;
			for (const key of keys) {
				if (typeof acc === "object" && acc !== null && key in acc) {
					acc = (acc as Record<string, unknown>)[key];
				} else {
					return undefined;
				}
			}
			return acc;
		};
		return collection.map((item) =>
			getProp(item as Record<string, unknown>, prop),
		);
	},
};

/**
 * Reverse the elements in an array, or the characters in a string.
 *
 * @example
 * {{reverse test.results}}
 * <!-- given that test.results is ["a", "b", "c"] -->
 * <!-- results in: ["c", "b", "a"] -->
 *
 * @param {unknown} value - The array or string from test data.
 * @returns {unknown} The reversed array or string.
 */
export const reverseHelper: Helper = {
	name: "reverse",
	category: "Array",
	fn: (value: unknown) => {
		if (Array.isArray(value)) return [...value].reverse();
		if (typeof value === "string") return value.split("").reverse().join("");
		return value;
	},
};

/**
 * Block helper that returns the block if the callback returns true for some value in the given array.
 *
 * @example
 * {{#some test.results isString}}
 *   Render me if the array has a string.
 * {{else}}
 *   Render me if it doesn't.
 * {{/some}}
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} iter - The iteratee function.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block if some item passes the iteratee.
 */
export const someHelper: Helper = {
	name: "some",
	category: "Array",
	fn: (...args: unknown[]) => {
		const [array, iter, options] = args;
		if (
			!Array.isArray(array) ||
			typeof iter !== "function" ||
			typeof options !== "object" ||
			options === null ||
			typeof (options as { fn?: () => string; inverse?: () => string }).fn !==
				"function"
		)
			return "";
		return array.some(
			iter as (item: unknown, index: number, array: unknown[]) => boolean,
		)
			? (options as { fn: () => string }).fn()
			: typeof (options as { inverse?: () => string }).inverse === "function"
				? (options as { inverse: () => string }).inverse()
				: "";
	},
};

/**
 * Sort the given array. If an array of objects is passed, you may optionally pass a key to sort on as the second argument. You may alternatively pass a sorting function as the second argument.
 *
 * @example
 * {{sort test.results}}
 * <!-- given that test.results is [3, 1, 2] -->
 * <!-- results in: [1, 2, 3] -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} keyOrFn - The key to sort by, or a sorting function.
 * @returns {unknown[]} The sorted array.
 */
export const sortHelper: Helper = {
	name: "sort",
	category: "Array",
	fn: (array: unknown, keyOrFn?: unknown) => {
		if (!Array.isArray(array)) return [];
		const arr = [...array];
		if (typeof keyOrFn === "function" && keyOrFn.length === 2) {
			return arr.sort(keyOrFn as (a: unknown, b: unknown) => number);
		}
		if (typeof keyOrFn === "string") {
			return arr.sort((a, b) => {
				if (a[keyOrFn] < b[keyOrFn]) return -1;
				if (a[keyOrFn] > b[keyOrFn]) return 1;
				return 0;
			});
		}
		return arr.sort();
	},
};

/**
 * Sort an array. If an array of objects is passed, you may optionally pass a key to sort on as the second argument. You may alternatively pass a sorting function as the second argument.
 *
 * @example
 * {{sortBy test.results "score"}}
 * <!-- given that test.results is [{score: 2}, {score: 1}] -->
 * <!-- results in: [{score: 1}, {score: 2}] -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} props - The property or properties to sort by.
 * @returns {unknown[]} The sorted array.
 */
export const sortByHelper: Helper = {
	name: "sortBy",
	category: "Array",
	fn: (array: unknown, props: unknown) => {
		if (!Array.isArray(array)) return [];
		const arr = [...array];
		if (typeof props === "string") {
			return arr.sort((a, b) => {
				const aVal = a[props];
				const bVal = b[props];
				if (aVal < bVal) return -1;
				if (aVal > bVal) return 1;
				return 0;
			});
		}
		return arr.sort();
	},
};

/**
 * Use the items in the array after the specified index as context inside a block. Opposite of withBefore.
 *
 * @example
 * {{#withAfter test.results 2}}
 *   {{this}}
 * {{/withAfter}}
 * <!-- given that test.results is ["a", "b", "c", "d"] -->
 * <!-- results in: "c d" -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} idx - The index after which to use items.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block for items after idx.
 */
export const withAfterHelper: Helper = {
	name: "withAfter",
	category: "Array",
	fn: (array: unknown, idx: unknown, options: unknown) => {
		if (
			!Array.isArray(array) ||
			typeof options !== "object" ||
			options === null ||
			typeof (options as { fn?: (item: unknown) => string }).fn !== "function"
		)
			return "";
		const index = typeof idx === "number" ? idx : parseInt(String(idx), 10);
		return array
			.slice(index + 1)
			.map((item) => (options as { fn: (item: unknown) => string }).fn(item))
			.join("");
	},
};

/**
 * Use the items in the array before the specified index as context inside a block. Opposite of withAfter.
 *
 * @example
 * {{#withBefore test.results 2}}
 *   {{this}}
 * {{/withBefore}}
 * <!-- given that test.results is ["a", "b", "c", "d"] -->
 * <!-- results in: "a b" -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} idx - The index before which to use items.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block for items before idx.
 */
export const withBeforeHelper: Helper = {
	name: "withBefore",
	category: "Array",
	fn: (array: unknown, idx: unknown, options: unknown) => {
		if (
			!Array.isArray(array) ||
			typeof options !== "object" ||
			options === null ||
			typeof (options as { fn?: (item: unknown) => string }).fn !== "function"
		)
			return "";
		const index = typeof idx === "number" ? idx : parseInt(String(idx), 10);
		return array
			.slice(0, index)
			.map((item) => (options as { fn: (item: unknown) => string }).fn(item))
			.join("");
	},
};

/**
 * Use the first item in a collection inside a handlebars block expression. Opposite of withLast.
 *
 * @example
 * {{#withFirst test.results}}
 *   {{this}}
 * {{/withFirst}}
 * <!-- given that test.results is ["a", "b"] -->
 * <!-- results in: "a" -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block for the first item.
 */
export const withFirstHelper: Helper = {
	name: "withFirst",
	category: "Array",
	fn: (array: unknown, options: unknown) => {
		if (
			!Array.isArray(array) ||
			typeof options !== "object" ||
			options === null ||
			typeof (options as { fn?: (item: unknown) => string }).fn !== "function"
		)
			return "";
		return array.length > 0
			? (options as { fn: (item: unknown) => string }).fn(array[0])
			: "";
	},
};

/**
 * Block helper that groups array elements by given group size.
 *
 * @example
 * {{#withGroup test.results 2}}
 *   {{#each this}}
 *     {{.}}
 *   {{/each}}
 *   <br>
 * {{/withGroup}}
 * <!-- given that test.results is ["a", "b", "c", "d"] -->
 * <!-- results in: "a b<br>c d<br>" -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} size - The desired length of each group.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block for each group.
 */
export const withGroupHelper: Helper = {
	name: "withGroup",
	category: "Array",
	fn: (array: unknown, size: unknown, options: unknown) => {
		if (
			!Array.isArray(array) ||
			typeof options !== "object" ||
			options === null ||
			typeof (options as { fn?: (group: unknown[]) => string }).fn !==
				"function"
		)
			return "";
		const groupSize =
			typeof size === "number" ? size : parseInt(String(size), 10);
		const groups = [];
		for (let i = 0; i < array.length; i += groupSize) {
			groups.push(array.slice(i, i + groupSize));
		}
		return groups
			.map((group) =>
				(options as { fn: (group: unknown[]) => string }).fn(group),
			)
			.join("");
	},
};

/**
 * Use the last item or n items in an array as context inside a block. Opposite of withFirst.
 *
 * @example
 * {{#withLast test.results}}
 *   {{this}}
 * {{/withLast}}
 * <!-- given that test.results is ["a", "b", "c"] -->
 * <!-- results in: "c" -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block for the last item.
 */
export const withLastHelper: Helper = {
	name: "withLast",
	category: "Array",
	fn: (array: unknown, options: unknown) => {
		if (
			!Array.isArray(array) ||
			typeof options !== "object" ||
			options === null ||
			typeof (options as { fn?: (item: unknown) => string }).fn !== "function"
		)
			return "";
		return array.length > 0
			? (options as { fn: (item: unknown) => string }).fn(
					array[array.length - 1],
				)
			: "";
	},
};

/**
 * Block helper that sorts a collection and exposes the sorted collection as context inside the block.
 *
 * @example
 * {{#withSort test.results "score"}}{{this}}{{/withSort}}
 * <!-- given that test.results is [{score: 2}, {score: 1}] -->
 * <!-- results in: "{score: 1}{score: 2}" -->
 *
 * @param {unknown} array - The array from test data.
 * @param {unknown} prop - The property to sort by.
 * @param {unknown} options - Handlebars options object.
 * @returns {string} Rendered block for sorted items.
 */
export const withSortHelper: Helper = {
	name: "withSort",
	category: "Array",
	fn: (array: unknown, prop: unknown, options: unknown) => {
		if (
			!Array.isArray(array) ||
			typeof prop !== "string" ||
			typeof options !== "object" ||
			options === null ||
			typeof (options as { fn?: (item: unknown) => string }).fn !== "function"
		)
			return "";
		const arr = [...array].sort((a, b) => {
			const aVal = a[prop];
			const bVal = b[prop];
			if (aVal < bVal) return -1;
			if (aVal > bVal) return 1;
			return 0;
		});
		return arr
			.map((item) => (options as { fn: (item: unknown) => string }).fn(item))
			.join("");
	},
};

/**
 * Block helper that returns an array with all duplicate values removed. Best used along with an each helper.
 *
 * @example
 * {{#each (unique test.results)}}{{.}}{{/each}}
 * <!-- given that test.results is ["a", "b", "a"] -->
 * <!-- results in: "ab" -->
 *
 * @param {unknown} array - The array from test data.
 * @returns {unknown[]} Array with duplicates removed.
 */
export const uniqueHelper: Helper = {
	name: "unique",
	category: "Array",
	fn: (array: unknown) => {
		if (!Array.isArray(array)) return [];
		return Array.from(new Set(array));
	},
};

export const arrayHelpers: Helper[] = [
	afterHelper,
	arrayifyHelper,
	beforeHelper,
	eachIndexHelper,
	filterHelper,
	firstHelper,
	forEachHelper,
	inArrayHelper,
	isArrayHelper,
	itemAtHelper,
	joinHelper,
	equalsLengthHelper,
	lastHelper,
	lengthHelper,
	lengthEqualHelper,
	mapHelper,
	pluckHelper,
	reverseHelper,
	someHelper,
	sortHelper,
	sortByHelper,
	withAfterHelper,
	withBeforeHelper,
	withFirstHelper,
	withGroupHelper,
	withLastHelper,
	withSortHelper,
	uniqueHelper,
];
