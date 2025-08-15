import { basename, dirname, extname, relative, resolve, sep } from "node:path";
import type { Helper } from "../helper-registry.js";

/**
 * Get the directory path segment from the given `filepath`.
 *
 * @example
 * {{dirname "docs/toc.md"}}
 * <!-- results in: 'docs' -->
 *
 * @param {unknown} filepath - The file path to extract the directory from.
 * @returns {string} The directory path segment for use in test reports.
 *
 * @remarks
 * Use in CTRF templates to group test results or artifacts by directory.
 *  Use with: `{{dirname test.file}}` to show the test's directory.
 */
export const dirnameHelper: Helper = {
	name: "dirname",
	category: "Path",
	fn: (filepath: unknown) => {
		if (typeof filepath !== "string") return "";
		const dir = dirname(filepath);
		return dir === "." ? "" : dir;
	},
};

/**
 * Get the relative filepath from `a` to `b`.
 *
 * @example
 * {{relative a b}}
 * <!-- results in: 'b' relative to 'a' -->
 *
 * @param {unknown} a - The base path.
 * @param {unknown} b - The target path.
 * @returns {string} The relative path for use in test reports.
 *
 * @remarks
 * Use in CTRF templates to display relative links between test files or artifacts.
 *  Use with: `{{relative test.suite.file test.file}}` to show file relationships.
 */
export const relativeHelper: Helper = {
	name: "relative",
	category: "Path",
	fn: (a: unknown, b: unknown) => {
		if (typeof a !== "string" || typeof b !== "string") return "";
		return relative(a, b);
	},
};

/**
 * Get the file extension from the given `filepath`.
 *
 * @example
 * {{extname "docs/toc.md"}}
 * <!-- results in: '.md' -->
 *
 * @param {unknown} filepath - The file path to extract the extension from.
 * @returns {string} The file extension for use in test reports.
 *
 * @remarks
 * Use in CTRF templates to filter or display test files by type.
 *  Use with: `{{extname test.file}}` to show the file type.
 */
export const extnameHelper: Helper = {
	name: "extname",
	category: "Path",
	fn: (filepath: unknown) => {
		if (typeof filepath !== "string") return "";
		return extname(filepath);
	},
};

/**
 * Get the "stem" (filename without extension) from the given `filepath`.
 *
 * @example
 * {{stem "docs/toc.md"}}
 * <!-- results in: 'toc' -->
 *
 * @param {unknown} filepath - The file path to extract the stem from.
 * @returns {string} The stem for use in test reports.
 *
 * @remarks
 * Use in CTRF templates to display test names without extensions.
 *  Use with: `{{stem test.file}}` to show the test name.
 */
export const stemHelper: Helper = {
	name: "stem",
	category: "Path",
	fn: (filepath: unknown) => {
		if (typeof filepath !== "string") return "";
		const base = basename(filepath);
		const ext = extname(filepath);
		return ext ? base.slice(0, -ext.length) : base;
	},
};

/**
 * Get the file name from the given `filepath`.
 *
 * @example
 * {{basename "docs/toc.md"}}
 * <!-- results in: 'toc.md' -->
 *
 * @param {unknown} filepath - The file path to extract the base name from.
 * @returns {string} The base name for use in test reports.
 *
 * @remarks
 * Use in CTRF templates to display just the file name of a test or artifact.
 *  Use with: `{{basename test.file}}` to show the file name.
 */
export const basenameHelper: Helper = {
	name: "basename",
	category: "Path",
	fn: (filepath: unknown) => {
		if (typeof filepath !== "string") return "";
		return basename(filepath);
	},
};

/**
 * Resolve an absolute path from the given `filepath`.
 *
 * @example
 * {{resolve "docs/toc.md"}}
 * <!-- results in: '/User/dev/docs/toc.md' -->
 *
 * @param {unknown} filepath - The file path to resolve.
 * @returns {string} The absolute path for use in test reports.
 *
 * @remarks
 * Use in CTRF templates to show the full path to a test file or artifact.
 *  Use with: `{{resolve test.file}}` to show the absolute path.
 */
export const resolveHelper: Helper = {
	name: "resolve",
	category: "Path",
	fn: (filepath: unknown) => {
		if (typeof filepath !== "string") return "";
		return resolve(filepath);
	},
};

/**
 * Get specific (joined) segments of a file path by passing a range of array indices.
 *
 * @example
 * {{segments "a/b/c/d" "2" "3"}}
 * <!-- results in: 'c/d' -->
 *
 * {{segments "a/b/c/d" "1" "3"}}
 * <!-- results in: 'b/c/d' -->
 *
 * {{segments "a/b/c/d" "1" "2"}}
 * <!-- results in: 'b/c' -->
 *
 * @param {unknown} filepath - The file path to split into segments.
 * @param {unknown} start - The start index (string or number).
 * @param {unknown} end - The end index (string or number, inclusive).
 * @returns {string} Returns a single, joined file path.
 *
 * @remarks
 * Use in CTRF templates to extract subpaths for grouping or display.
 *  Use with: `{{segments test.file "1" "2"}}` to show a subpath.
 */
export const segmentsHelper: Helper = {
	name: "segments",
	category: "Path",
	fn: (filepath: unknown, start: unknown, end: unknown) => {
		if (typeof filepath !== "string") return "";
		const parts = filepath.split(sep).filter(Boolean);
		const s = typeof start === "string" ? parseInt(start, 10) : Number(start);
		const e = typeof end === "string" ? parseInt(end, 10) : Number(end);
		if (Number.isNaN(s) || Number.isNaN(e) || s < 0 || e < s) return "";
		return parts.slice(s, e + 1).join(sep);
	},
};

/**
 * Get the directory path segment from the given `filepath` (alias for dirname).
 *
 * @example
 * {{absolute "docs/toc.md"}}
 * <!-- results in: 'docs' -->
 *
 * @param {unknown} filepath - The file path to extract the directory from.
 * @returns {string} The directory path segment for use in test reports.
 *
 * @remarks
 * Alias for dirname. Use in CTRF templates for grouping by directory.
 *  Use with: `{{absolute test.file}}` to show the test's directory.
 */
export const absoluteHelper: Helper = {
	name: "absolute",
	category: "Path",
	fn: dirnameHelper.fn,
};

export const pathHelpers: Helper[] = [
	dirnameHelper,
	relativeHelper,
	extnameHelper,
	stemHelper,
	basenameHelper,
	resolveHelper,
	segmentsHelper,
	absoluteHelper,
];
