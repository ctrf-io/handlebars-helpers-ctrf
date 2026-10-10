import { describe, expect, it } from "vitest";
import { filterPassedTestsHelper } from "../src/helpers/ctrf";
const identityReport = () => ({
 reportFormat: "CTRF", specVersion: "0.2.0", reportId: "11111111-1111-4111-8111-111111111111", runId: "run",
 results: { tool: { name: "fixture" }, environment: { shardId: "one" }, summary: { tests: 1, passed: 1, failed: 0, skipped: 0, pending: 0, other: 0, start: 1, stop: 2 }, tests: [{ name: "same", testId: "logical", executionId: "execution",
				attemptId: "final-attempt", status: "passed", duration: 1, retries: 1, flaky: true, retryAttempts: [{ attempt: 1, attemptId: "attempt", status: "failed", attachments: [{ name: "log", path: "prior.txt", contentType: "text/plain", attachmentId: "prior-ref" }] }], attachments: [{ name: "log", path: "final.txt", contentType: "text/plain", attachmentId: "final-ref" }] }] }
});

describe("identity-aware presentation input", () => {
 it("retains distinct executions when filtering identical display names", () => {
  const one = identityReport().results.tests[0]; const two = { ...one, executionId: "another-execution" };
  const tests = [one, two]; const original = JSON.stringify(tests);
  const output = filterPassedTestsHelper.fn(tests);
  expect(output).toEqual(tests);
  expect(JSON.stringify(tests)).toBe(original);
 });
});
