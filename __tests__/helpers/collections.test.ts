import Handlebars from "handlebars";
import { isEmptyHelper, iterateHelper } from "../../src/helpers/collections";

describe("collections helpers", () => {
	beforeAll(() => {
		Handlebars.registerHelper("isEmpty", isEmptyHelper.fn);
		Handlebars.registerHelper("iterate", iterateHelper.fn);
	});

	describe("isEmpty", () => {
		it("returns true for empty array", () => {
			expect(isEmptyHelper.fn([], undefined)).toBe(true);
		});
		it("returns false for non-empty array", () => {
			expect(isEmptyHelper.fn([1], undefined)).toBe(false);
		});
		it("returns true for empty object", () => {
			expect(isEmptyHelper.fn({}, undefined)).toBe(true);
		});
		it("returns false for non-empty object", () => {
			expect(isEmptyHelper.fn({ a: 1 }, undefined)).toBe(false);
		});
		it("returns true for empty string", () => {
			expect(isEmptyHelper.fn("", undefined)).toBe(true);
		});
		it("returns false for non-empty string", () => {
			expect(isEmptyHelper.fn("abc", undefined)).toBe(false);
		});
		it("returns true for null/undefined", () => {
			expect(isEmptyHelper.fn(null, undefined)).toBe(true);
			expect(isEmptyHelper.fn(undefined, undefined)).toBe(true);
		});
		it("renders block for empty collection", () => {
			const tpl = Handlebars.compile(
				"{{#isEmpty results}}EMPTY{{else}}NOT EMPTY{{/isEmpty}}",
				{ noEscape: true },
			);
			expect(tpl({ results: [] })).toBe("EMPTY");
			expect(tpl({ results: {} })).toBe("EMPTY");
			expect(tpl({ results: "" })).toBe("EMPTY");
			expect(tpl({ results: null })).toBe("EMPTY");
		});
		it("renders inverse block for non-empty collection", () => {
			const tpl = Handlebars.compile(
				"{{#isEmpty results}}EMPTY{{else}}NOT EMPTY{{/isEmpty}}",
				{ noEscape: true },
			);
			expect(tpl({ results: [1] })).toBe("NOT EMPTY");
			expect(tpl({ results: { a: 1 } })).toBe("NOT EMPTY");
			expect(tpl({ results: "abc" })).toBe("NOT EMPTY");
		});
		it("works as inline helper", () => {
			const tpl = Handlebars.compile("{{isEmpty results}}", { noEscape: true });
			expect(tpl({ results: [] })).toBe("true");
			expect(tpl({ results: [1] })).toBe("false");
		});
	});

	describe("iterate", () => {
		it("iterates over array", () => {
			const tpl = Handlebars.compile("{{#iterate arr}}{{this}},{{/iterate}}", {
				noEscape: true,
			});
			expect(tpl({ arr: [1, 2, 3] })).toBe("1,2,3,");
		});
		it("iterates over object and exposes @key", () => {
			const tpl = Handlebars.compile(
				"{{#iterate obj}}{{@key}}={{this}};{{/iterate}}",
				{ noEscape: true },
			);
			expect(tpl({ obj: { a: 1, b: 2 } })).toBe("a=1;b=2;");
		});
		it("renders inverse block for empty array/object", () => {
			const tpl = Handlebars.compile(
				"{{#iterate arr}}X{{else}}EMPTY{{/iterate}}",
				{ noEscape: true },
			);
			expect(tpl({ arr: [] })).toBe("EMPTY");
			expect(tpl({ arr: {} })).toBe("EMPTY");
		});
		it("renders nothing for non-iterable", () => {
			const tpl = Handlebars.compile(
				"{{#iterate notACollection}}X{{else}}EMPTY{{/iterate}}",
				{ noEscape: true },
			);
			expect(tpl({ notACollection: 42 })).toBe("EMPTY");
		});
		it("works with CTRF-like test results", () => {
			const tpl = Handlebars.compile(
				`{{#iterate tests}}[{{this.name}}:{{this.status}}]{{else}}NO TESTS{{/iterate}}`,
				{ noEscape: true },
			);
			expect(
				tpl({
					tests: [
						{ name: "A", status: "passed" },
						{ name: "B", status: "failed" },
					],
				}),
			).toBe("[A:passed][B:failed]");
			expect(tpl({ tests: [] })).toBe("NO TESTS");
		});
		it("works with CTRF-like stats object", () => {
			const tpl = Handlebars.compile(
				`{{#iterate stats}}{{@key}}:{{this}};{{/iterate}}`,
				{ noEscape: true },
			);
			expect(tpl({ stats: { passed: 2, failed: 1 } })).toBe(
				"passed:2;failed:1;",
			);
		});
	});
});
