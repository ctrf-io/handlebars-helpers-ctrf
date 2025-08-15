import {
	noopHelper,
	optionHelper,
	typeOfHelper,
	withHashHelper,
} from "../../src/helpers/misc";

describe("misc helpers", () => {
	describe("optionHelper", () => {
		const context = {
			options: {
				a: { b: { c: "foo" } },
				report: { title: "Test Report" },
				value: 42,
			},
		};
		it("returns nested value from options", () => {
			expect(optionHelper.fn.call(context, "a.b.c")).toBe("foo");
		});
		it("returns top-level value from options", () => {
			expect(optionHelper.fn.call(context, "value")).toBe(42);
		});
		it("returns undefined for missing path", () => {
			expect(optionHelper.fn.call(context, "a.b.x")).toBeUndefined();
		});
		it("returns undefined if no options", () => {
			expect(optionHelper.fn.call({}, "a.b.c")).toBeUndefined();
		});
		it("returns undefined if prop is not string", () => {
			expect(optionHelper.fn.call(context, 123)).toBeUndefined();
		});
	});

	describe("noopHelper", () => {
		it("renders the block content", () => {
			const options = { fn: jest.fn().mockReturnValue("block content") };
			expect(noopHelper.fn.call({}, options)).toBe("block content");
			expect(options.fn).toHaveBeenCalledWith({});
		});
		it("returns empty string if no fn", () => {
			expect(noopHelper.fn.call({}, {})).toBe("");
		});
	});

	describe("typeOfHelper", () => {
		it("returns 'number' for numbers", () => {
			expect(typeOfHelper.fn(1)).toBe("number");
		});
		it("returns 'string' for strings", () => {
			expect(typeOfHelper.fn("foo")).toBe("string");
		});
		it("returns 'object' for objects", () => {
			expect(typeOfHelper.fn({})).toBe("object");
		});
		it("returns 'array' for arrays", () => {
			expect(typeOfHelper.fn([1, 2, 3])).toBe("array");
		});
		it("returns 'null' for null", () => {
			expect(typeOfHelper.fn(null)).toBe("null");
		});
		it("returns 'boolean' for booleans", () => {
			expect(typeOfHelper.fn(true)).toBe("boolean");
		});
		it("returns 'undefined' for undefined", () => {
			expect(typeOfHelper.fn(undefined)).toBe("undefined");
		});
	});

	describe("withHashHelper", () => {
		it("merges hash into context and renders block", () => {
			const options = {
				hash: { foo: "bar", count: 3 },
				fn: jest.fn((ctx) => `Foo: ${ctx.foo}, Count: ${ctx.count}`),
			};
			const context = { existing: "value" };
			expect(withHashHelper.fn.call(context, options)).toBe(
				"Foo: bar, Count: 3",
			);
			expect(options.fn).toHaveBeenCalledWith({ ...context, ...options.hash });
		});
		it("returns empty string if no fn", () => {
			expect(withHashHelper.fn.call({}, { hash: { foo: 1 } })).toBe("");
		});
		it("returns empty string if no hash", () => {
			const options = { fn: jest.fn() };
			expect(withHashHelper.fn.call({}, options)).toBe("");
		});
	});


});
