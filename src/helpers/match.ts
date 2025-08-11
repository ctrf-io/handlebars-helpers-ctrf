import { minimatch } from "minimatch";
import type { Helper } from "../helper-registry.js";

/**
 * Returns an array of strings that match the given glob pattern(s).
 * Useful for filtering test files, assets, or any file paths in test reports based on patterns.
 *
 * @example
 * {{match testFiles "*.spec.js"}}
 * {{match (readdir "tests") "**\/*.test.ts"}}
 * {{match test.artifacts "*.png"}}
 *
 * Given testFiles: ["auth.test.js", "login.spec.js", "utils.js"]
 * Results in: ["login.spec.js"]
 *
 * Use with CTRF templates to filter test files by pattern, extract specific artifacts, or organize test results by file type.
 *
 * @param {string[]|string} files - Array of file paths or single file path from test data.
 * @param {string|string[]} patterns - One or more glob patterns to match against.
 * @param {Object} options - Handlebars options object (optional).
 * @returns {string[]} Array of file paths that match the patterns for use in test reports.
 */
export const matchHelper: Helper = {
	name: "match",
	category: "String",
	fn: (files: unknown, patterns: unknown, _options?: unknown) => {
		// Handle both single file and array of files
		let fileList: string[] = [];
		if (typeof files === "string") {
			fileList = [files];
		} else if (Array.isArray(files)) {
			fileList = files.filter(
				(file): file is string => typeof file === "string",
			);
		} else {
			return [];
		}

		// Handle both single pattern and array of patterns
		let patternList: string[] = [];
		if (typeof patterns === "string") {
			patternList = [patterns];
		} else if (Array.isArray(patterns)) {
			patternList = patterns.filter(
				(pattern): pattern is string => typeof pattern === "string",
			);
		} else {
			return [];
		}

		if (patternList.length === 0) {
			return [];
		}

		// Filter files that match any of the patterns
		return fileList.filter((file) =>
			patternList.some((pattern) => minimatch(file, pattern)),
		);
	},
};

/**
 * Returns true if a filepath contains the given pattern.
 * Useful for conditional logic in test reports to check if files match specific patterns.
 *
 * @example
 * {{isMatch "user-login.spec.ts" "*.spec.*"}}
 * {{isMatch test.file "*.test.js"}}
 *
 * Results: true for matching patterns
 *
 * Use with CTRF templates to conditionally render content based on file patterns, categorize tests by file type, or show different icons for different test categories.
 *
 * @param {string} filepath - The file path from test data to check.
 * @param {string} pattern - The glob pattern to match against.
 * @param {Object} options - Handlebars options object (optional).
 * @returns {boolean} True if the filepath matches the pattern for use in test reports.
 */
export const isMatchHelper: Helper = {
	name: "isMatch",
	category: "String",
	fn: (filepath: unknown, pattern: unknown, _options?: unknown) => {
		if (typeof filepath !== "string" || typeof pattern !== "string") {
			return false;
		}

		return minimatch(filepath, pattern);
	},
};

export const matchHelpers: Helper[] = [matchHelper, isMatchHelper];
