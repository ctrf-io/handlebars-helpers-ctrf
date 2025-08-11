import { formatTimestampShortHelper, timestampHelpers } from "../../src/helpers/timestamp";

describe("formatTimestampShortHelper", () => {
	it("should format ISO 8601 timestamps to short human-readable format", () => {
		// These tests verify the format structure rather than exact times due to timezone variations
		expect(formatTimestampShortHelper.fn("2025-01-19T15:06:45Z")).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{2}, \d{1,2}:\d{2} (AM|PM)$/);
		expect(formatTimestampShortHelper.fn("2024-12-25T09:30:00Z")).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{2}, \d{1,2}:\d{2} (AM|PM)$/);
		expect(formatTimestampShortHelper.fn("2023-06-15T12:00:00Z")).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{2}, \d{1,2}:\d{2} (AM|PM)$/);
		expect(formatTimestampShortHelper.fn("2025-03-01T12:45:30Z")).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{2}, \d{1,2}:\d{2} (AM|PM)$/);
		
		// Test specific components that should be consistent
		expect(formatTimestampShortHelper.fn("2025-01-19T15:06:45Z")).toContain("Jan 19, 25");
		expect(formatTimestampShortHelper.fn("2024-12-25T09:30:00Z")).toContain("Dec 25, 24");
		expect(formatTimestampShortHelper.fn("2025-03-01T12:45:30Z")).toContain("Mar 1, 25");
	});

	it("should handle different time zones correctly (input is UTC)", () => {
		// Note: These tests assume the system is in a timezone that converts UTC appropriately
		expect(formatTimestampShortHelper.fn("2025-01-19T23:59:59Z")).toMatch(/Jan (19|20), 25, \d{1,2}:\d{2} (AM|PM)/);
		expect(formatTimestampShortHelper.fn("2025-01-19T01:30:00Z")).toMatch(/Jan (18|19), 25, \d{1,2}:\d{2} (AM|PM)/);
	});

	it("should handle CTRF timestamp scenarios", () => {
		// Test execution times - verify format structure and date components
		const testExecResult = formatTimestampShortHelper.fn("2025-01-19T14:30:15.123Z");
		expect(testExecResult).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{2}, \d{1,2}:\d{2} (AM|PM)$/);
		expect(testExecResult).toContain("Jan 19, 25");
		
		// Build timestamps  
		const buildResult = formatTimestampShortHelper.fn("2024-11-05T08:45:00Z");
		expect(buildResult).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{2}, \d{1,2}:\d{2} (AM|PM)$/);
		expect(buildResult).toContain("Nov 5, 24");
		
		// Report generation times
		const reportResult = formatTimestampShortHelper.fn("2025-02-28T17:20:45Z");
		expect(reportResult).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{2}, \d{1,2}:\d{2} (AM|PM)$/);
		expect(reportResult).toContain("Feb 28, 25");
	});

	it("should handle test report timestamps", () => {
		// Typical test execution timestamps - verify format structure
		const morningResult = formatTimestampShortHelper.fn("2025-01-19T10:15:30Z");
		expect(morningResult).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{2}, \d{1,2}:\d{2} (AM|PM)$/);
		expect(morningResult).toContain("Jan 19, 25");
		
		const eveningResult = formatTimestampShortHelper.fn("2025-01-19T22:45:00Z");
		expect(eveningResult).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{2}, \d{1,2}:\d{2} (AM|PM)$/);
		expect(eveningResult).toContain("Jan 19, 25");
		
		// CI/CD pipeline timestamps
		const pipelineResult = formatTimestampShortHelper.fn("2024-12-31T23:59:59Z");
		expect(pipelineResult).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{2}, \d{1,2}:\d{2} (AM|PM)$/);
		expect(pipelineResult).toContain("Dec 31, 24");
	});

	it("should handle edge cases", () => {
		expect(formatTimestampShortHelper.fn("")).toBe("");
		expect(formatTimestampShortHelper.fn("invalid-date")).toBe("");
		expect(formatTimestampShortHelper.fn("2025-13-40T25:99:99Z")).toBe("");
		expect(formatTimestampShortHelper.fn("not-a-timestamp")).toBe("");
	});

	it("should handle non-string inputs", () => {
		expect(formatTimestampShortHelper.fn(null as unknown)).toBe("");
		expect(formatTimestampShortHelper.fn(undefined as unknown)).toBe("");
		expect(formatTimestampShortHelper.fn(123 as unknown)).toBe("");
		expect(formatTimestampShortHelper.fn({} as unknown)).toBe("");
		expect(formatTimestampShortHelper.fn([] as unknown)).toBe("");
	});

	it("should handle different ISO 8601 formats", () => {
		// Test with milliseconds
		const withMs = formatTimestampShortHelper.fn("2025-01-19T15:06:45.123Z");
		expect(withMs).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{2}, \d{1,2}:\d{2} (AM|PM)$/);
		expect(withMs).toContain("Jan 19, 25");
		
		// Test without Z suffix
		expect(formatTimestampShortHelper.fn("2025-01-19T15:06:45")).toMatch(/Jan 19, 25, \d{1,2}:\d{2} (AM|PM)/);
		
		// Test date only (will include default time)
		expect(formatTimestampShortHelper.fn("2025-01-19")).toMatch(/Jan 19, 25, \d{1,2}:\d{2} (AM|PM)/);
	});

	it("should be categorized as Timestamp helper", () => {
		expect(formatTimestampShortHelper.category).toBe("Timestamp");
		expect(formatTimestampShortHelper.name).toBe("formatTimestampShort");
	});
});

describe("timestampHelpers export", () => {
	it("should contain all timestamp helpers", () => {
		expect(timestampHelpers).toHaveLength(1);
		expect(timestampHelpers.map((h: any) => h.name)).toEqual([
			"formatTimestampShort"
		]);
	});

	it("should have proper helper structure", () => {
		timestampHelpers.forEach((helper: any) => {
			expect(helper).toHaveProperty("name");
			expect(helper).toHaveProperty("category");
			expect(helper).toHaveProperty("fn");
			expect(typeof helper.fn).toBe("function");
			expect(helper.category).toBe("Timestamp");
		});
	});
}); 