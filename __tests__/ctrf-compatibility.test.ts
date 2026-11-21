import Handlebars from "handlebars";
import { validate } from "ctrf";
import { loadHelpers } from "../src/index";

describe("CTRF report compatibility", () => {
	const template = `{{specVersion}}|{{#each (filterFailedTests results.tests)}}{{name}}:{{description}}:{{#each assertionFailures}}{{message}}{{/each}}:{{#each retryAttempts}}{{threadId}}/{{#each assertionFailures}}{{message}}{{/each}}{{/each}}{{/each}}|{{#each results.errors}}{{message}}{{/each}}|{{#each provenance.inputs}}{{reportId}}{{/each}}`;

	it("renders 0.3.0 diagnostics and lineage without changing the report", () => {
		const report = {
			reportFormat: "CTRF",
			specVersion: "0.3.0",
			reportId: "11111111-1111-4111-8111-111111111111",
			provenance: {
				inputs: [{ reportId: "22222222-2222-4222-8222-222222222222" }],
			},
			results: {
				tool: { name: "compatibility-test" },
				summary: {
					tests: 1,
					passed: 0,
					failed: 1,
					skipped: 0,
					pending: 0,
					other: 0,
					start: 0,
					stop: 20,
				},
				tests: [
					{
						name: "checkout",
						description: "Completes an order",
						status: "failed",
						duration: 10,
						threadId: "worker-2",
						assertionFailures: [{ message: "final failure" }],
						retries: 1,
						retryAttempts: [
							{
								attempt: 1,
								status: "failed",
								threadId: "worker-1",
								assertionFailures: [{ message: "earlier failure" }],
							},
						],
					},
				],
				errors: [{ message: "teardown error" }],
			},
		};
		const original = JSON.stringify(report);
		expect(validate(report).valid).toBe(true);
		const handlebars = Handlebars.create();
		loadHelpers(handlebars);

		expect(handlebars.compile(template)(report)).toBe(
			"0.3.0|checkout:Completes an order:final failure:worker-1/earlier failure|teardown error|22222222-2222-4222-8222-222222222222",
		);
		expect(JSON.stringify(report)).toBe(original);
	});

	it("continues rendering legacy 0.2.0 reports without new optional fields", () => {
		const report = {
			reportFormat: "CTRF",
			specVersion: "0.2.0",
			results: {
				tool: { name: "legacy-test" },
				summary: {
					tests: 1,
					passed: 0,
					failed: 1,
					skipped: 0,
					pending: 0,
					other: 0,
					start: 0,
					stop: 10,
				},
				tests: [{ name: "legacy", status: "failed", duration: 10 }],
			},
		};
		const original = JSON.stringify(report);
		expect(validate(report).valid).toBe(true);
		const handlebars = Handlebars.create();
		loadHelpers(handlebars);

		expect(handlebars.compile(template)(report)).toBe("0.2.0|legacy:::||");
		expect(JSON.stringify(report)).toBe(original);
	});
});
