import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Helper } from "../helper-registry.js";

/**
 * Read a file from the file system. Useful for including file contents in CTRF test reports or templates.
 *
 * @example
 * {{read "src/test-data/sample-ctrf-data.ts"}}
 * <!-- includes the contents of the sample CTRF data file in the report -->
 *
 * {{someHelper (read "output/test-report.html")}}
 * <!-- passes the HTML report content to another helper -->
 *
 * @param {unknown} filepath - The path to the file to read (relative to process.cwd() or absolute).
 * @returns {string} The file contents as a string, or an empty string if not found.
 *
 * @remarks
 * Use this helper to include snippets, logs, or test artifacts in your CTRF Handlebars templates.
 */
export const readHelper: Helper = {
	name: "read",
	category: "FS",
	fn: (filepath: unknown) => {
		if (typeof filepath !== "string" || !filepath) return "";
		try {
			const absPath = resolve(process.cwd(), filepath);
			return readFileSync(absPath, "utf8");
		} catch {
			return "";
		}
	},
};

/**
 * Return an array of files from the given directory. Useful for listing test artifacts, screenshots, or log files in CTRF reports.
 *
 * @example
 * {{#each (files "output/")}}
 *   <li>{{this}}</li>
 * {{/each}}
 * <!-- lists all files in the output directory -->
 *
 * @param {unknown} directory - The directory path (relative to process.cwd() or absolute).
 * @returns {string[]} Array of file names in the directory, or an empty array if not found.
 *
 * @remarks
 * Use this helper to dynamically list generated files, such as test logs or screenshots, in your CTRF Handlebars templates.
 */
export const filesHelper: Helper = {
	name: "files",
	category: "FS",
	fn: (directory: unknown) => {
		if (typeof directory !== "string" || !directory) return [];
		try {
			const absPath = resolve(process.cwd(), directory);
			return readdirSync(absPath);
		} catch {
			return [];
		}
	},
};

/**
 * Array of all FS helpers for registration.
 */
export const fsHelpers: Helper[] = [readHelper, filesHelper];
