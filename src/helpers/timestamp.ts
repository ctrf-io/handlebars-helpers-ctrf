import type { Helper } from "../helper-registry.js";

/**
 * Converts an ISO 8601 timestamp to a human-readable short format.
 * Perfect for displaying test timestamps, build times, or execution dates in a compact format.
 *
 * @example
 * {{formatTimestampShort "2025-01-19T15:06:45Z"}}
 * <!-- results in: "Jan 19, 25, 3:06 PM" -->
 *
 * {{formatTimestampShort test.timestamp}}
 * <!-- converts test execution time to readable format -->
 *
 * {{formatTimestampShort build.createdAt}}
 * <!-- shows build creation time in short format -->
 *
 * @param {unknown} timestamp - The ISO 8601 timestamp string to convert.
 * @returns {string} A human-readable string in format "Mon DD, YY, H:MM AM/PM".
 *  Use for displaying timestamps in test reports, build logs, or execution summaries.
 */
export const formatTimestampShortHelper: Helper = {
	name: "formatTimestampShort",
	category: "Timestamp",
	fn: (timestamp: unknown) => {
		if (typeof timestamp !== "string" || !timestamp) {
			return "";
		}

		try {
			const date = new Date(timestamp);

			// Check if date is valid
			if (Number.isNaN(date.getTime())) {
				return "";
			}

			const options: Intl.DateTimeFormatOptions = {
				year: "2-digit",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
				hour12: true, // This ensures AM/PM format
			};

			return date.toLocaleString("en-US", options);
		} catch {
			return "";
		}
	},
};

export const timestampHelpers: Helper[] = [formatTimestampShortHelper];
