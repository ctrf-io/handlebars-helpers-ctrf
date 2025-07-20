import type { Helper } from "../helper-registry";

/**
 * Handlebars helper that returns the current year.
 *
 * @returns {number} The current year (e.g., 2024).
 *
 * @example
 *
 * {{year}}
 *
 * "date": "{{year}}"
 *
 *
 */
export const yearHelper: Helper = {
	name: "year",
	category: "Date",
	fn: () => new Date().getFullYear(),
};

export const dateHelpers: Helper[] = [yearHelper];
