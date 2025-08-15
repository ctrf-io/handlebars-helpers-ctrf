import type { Helper } from "../helper-registry.js";

/**
 * Retrieves a GitHub octicon URL for a given test state or category.
 * Useful for creating GitHub-styled test reports, pull request comments, and GitHub Actions outputs.
 *
 * @example
 * {{getGitHubIcon "passed"}}
 * <!-- results in: "https://ctrf.io/assets/github/check-circle.svg" -->
 *
 * {{getGitHubIcon "failed"}}
 * <!-- results in: "https://ctrf.io/assets/github/stop.svg" -->
 *
 * {{getGitHubIcon "flaky"}}
 * <!-- results in: "https://ctrf.io/assets/github/alert.svg" -->
 *
 * {{getGitHubIcon "stats"}}
 * <!-- results in: "https://ctrf.io/assets/github/pulse.svg" -->
 *
 * **Use with CTRF templates**: Perfect for creating GitHub-styled test reports, pull request status comments, GitHub Actions summaries, and any GitHub-integrated test reporting that needs consistent GitHub octicon iconography.
 *
 * @param {unknown} status - The test state or category to get a GitHub octicon for.
 * @returns {string} The GitHub octicon URL corresponding to the provided state.
 */
export const getGitHubIconHelper: Helper = {
	name: "getGitHubIcon",
	category: "GitHub",
	fn: (status: unknown): string => {
		if (typeof status !== "string") {
			return "https://ctrf.io/assets/github/question.svg";
		}

		return getGitHubIcon(status);
	},
};

/**
 * Internal function that maps CTRF states and keywords to appropriate GitHub octicon names.
 * Returns URLs to GitHub octicon SVGs hosted on ctrf.io.
 *
 * @param status - The test state or category to get an octicon for.
 * @returns The GitHub octicon URL.
 */
function getGitHubIcon(status: string): string {
	const iconNames: Record<string, string> = {
		passed: "check-circle",
		failed: "stop",
		skipped: "skip",
		pending: "hourglass",
		other: "question",
		build: "workflow",
		duration: "clock",
		flaky: "alert",
		tests: "checklist",
		result: "beaker",
		warning: "alert",
		stats: "pulse",
		link: "link-external",
		report: "package",
		commit: "git-pull-request",
		info: "info",
		"git-pull-request": "git-pull-request",
		beaker: "beaker",
		clock: "clock",
	};

	const iconName = iconNames[status] || "question";

	return `https://ctrf.io/assets/github/${iconName}.svg`;
}

/**
 * Formats a test path by replacing spaces and ">" with GitHub arrow-right octicon.
 * This makes test paths more readable in markdown.
 * Useful for creating GitHub-styled test reports with clear path hierarchies.
 *
 * @example
 * {{formatTestPath "filename.ts > suiteone > suitetwo" "test name"}}
 * <!-- results in: "filename.ts ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) suiteone ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) suitetwo ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) test name" -->
 *
 * {{formatTestPath suite.name "Login Test"}}
 * <!-- formats suite path with arrow separators -->
 *
 * {{formatTestPath "User Tests > Authentication" "should login with valid credentials"}}
 * <!-- creates clear test hierarchy visualization -->
 *
 * **Use with CTRF templates**: Perfect for creating GitHub-styled test reports, pull request comments, and any documentation that needs clear test path hierarchies with professional arrow separators.
 *
 * @param {unknown} suite - The test suite path (may contain spaces or ">" as separators).
 * @param {unknown} name - The test name.
 * @returns {string} A formatted string with GitHub arrow-right icons between path segments.
 */
export const formatTestPathHelper: Helper = {
	name: "formatTestPath",
	category: "GitHub",
	fn: (suite: unknown, name: unknown): string => {
		if (!suite || typeof suite !== "string") {
			return typeof name === "string" ? name : "";
		}

		if (!name || typeof name !== "string") {
			return suite;
		}

		const normalizedPath = suite
			.replace(/\s*>\s*/g, "|")
			.replace(/\s*&gt;\s*/g, "|")
			.replace(/\s+/g, "|");

		const parts = normalizedPath.split("|").filter(Boolean);

		const formattedPath = parts
			.map((part) => part.trim())
			.filter(Boolean)
			.join(" ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) ");

		return `${formattedPath} ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) ${name.trim()}`;
	},
};

export const githubHelpers: Helper[] = [
	getGitHubIconHelper,
	formatTestPathHelper,
];
