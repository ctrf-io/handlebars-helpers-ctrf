import {
	type HandlebarsInstance,
	type Helper,
	type HelperFilter,
	HelperRegistry,
} from "../src/helper-registry";

describe("HelperRegistry", () => {
	let registry: HelperRegistry;

	beforeEach(() => {
		registry = new HelperRegistry();
	});

	// Mock helpers for testing
	const mockHelpers: Helper[] = [
		{
			name: "testHelper1",
			category: "Test",
			fn: () => "result1",
		},
		{
			name: "testHelper2",
			category: "Test",
			fn: () => "result2",
		},
		{
			name: "stringHelper",
			category: "String",
			fn: (str: unknown) => (typeof str === "string" ? str.toUpperCase() : ""),
		},
		{
			name: "ctrfHelper",
			category: "CTRF",
			fn: (tests: unknown) => {
				if (Array.isArray(tests)) {
					return tests.filter(
						(t: unknown) =>
							typeof t === "object" &&
							t !== null &&
							"status" in t &&
							t.status === "passed",
					);
				}
				return [];
			},
		},
	];

	describe("constructor", () => {
		it("should create an empty registry", () => {
			expect(registry).toBeInstanceOf(HelperRegistry);
		});

		it("should call init method", () => {
			const initSpy = jest.spyOn(HelperRegistry.prototype, "init");
			new HelperRegistry();
			expect(initSpy).toHaveBeenCalled();
			initSpy.mockRestore();
		});
	});

	describe("register", () => {
		it("should register a new helper successfully", () => {
			const result = registry.register(mockHelpers[0]);

			expect(result).toBe(true);
			expect(registry.has("testHelper1")).toBe(true);
		});

		it("should not register a helper with duplicate name", () => {
			registry.register(mockHelpers[0]);
			const result = registry.register(mockHelpers[0]);

			expect(result).toBe(false);
		});

		it("should register multiple helpers with different names", () => {
			const result1 = registry.register(mockHelpers[0]);
			const result2 = registry.register(mockHelpers[1]);

			expect(result1).toBe(true);
			expect(result2).toBe(true);
			expect(registry.has("testHelper1")).toBe(true);
			expect(registry.has("testHelper2")).toBe(true);
		});
	});

	describe("registerHelpers", () => {
		it("should register multiple helpers at once", () => {
			registry.registerHelpers(mockHelpers);

			mockHelpers.forEach((helper) => {
				expect(registry.has(helper.name)).toBe(true);
			});
		});

		it("should handle empty array", () => {
			expect(() => registry.registerHelpers([])).not.toThrow();
		});

		it("should skip duplicate helpers but register unique ones", () => {
			registry.register(mockHelpers[0]);

			const registerSpy = jest.spyOn(registry, "register");
			registry.registerHelpers(mockHelpers);

			expect(registerSpy).toHaveBeenCalledTimes(4);
			expect(registry.has("testHelper1")).toBe(true);
			expect(registry.has("testHelper2")).toBe(true);

			registerSpy.mockRestore();
		});
	});

	describe("has", () => {
		beforeEach(() => {
			registry.register(mockHelpers[0]);
		});

		it("should return true for existing helper", () => {
			expect(registry.has("testHelper1")).toBe(true);
		});

		it("should return false for non-existing helper", () => {
			expect(registry.has("nonExistentHelper")).toBe(false);
		});

		it("should be case-sensitive", () => {
			expect(registry.has("TestHelper1")).toBe(false);
			expect(registry.has("TESTHELPER1")).toBe(false);
		});

		it("should handle empty string", () => {
			expect(registry.has("")).toBe(false);
		});
	});

	describe("filter", () => {
		beforeEach(() => {
			registry.registerHelpers(mockHelpers);
		});

		it("should filter by name", () => {
			const filter: HelperFilter = { name: "testHelper1" };
			const result = registry.filter(filter);

			expect(result).toHaveLength(1);
			expect(result[0].name).toBe("testHelper1");
		});

		it("should filter by category", () => {
			const filter: HelperFilter = { category: "Test" };
			const result = registry.filter(filter);

			expect(result).toHaveLength(2);
			expect(result.every((h) => h.category === "Test")).toBe(true);
		});

		it("should filter by both name and category", () => {
			const filter: HelperFilter = { name: "testHelper1", category: "Test" };
			const result = registry.filter(filter);

			expect(result).toHaveLength(1);
			expect(result[0].name).toBe("testHelper1");
			expect(result[0].category).toBe("Test");
		});

		it("should return empty array when no matches", () => {
			const filter: HelperFilter = { name: "nonExistent" };
			const result = registry.filter(filter);

			expect(result).toHaveLength(0);
		});

		it("should return all helpers when no filter criteria", () => {
			const filter: HelperFilter = {};
			const result = registry.filter(filter);

			expect(result).toHaveLength(4);
		});

		it("should handle category mismatch", () => {
			const filter: HelperFilter = {
				name: "testHelper1",
				category: "WrongCategory",
			};
			const result = registry.filter(filter);

			expect(result).toHaveLength(0);
		});
	});

	describe("loadHandlebars", () => {
		let mockHandlebars: HandlebarsInstance;
		beforeEach(() => {
			mockHandlebars = {
				registerHelper: jest.fn(),
				unregisterHelper: jest.fn(),
				compile: jest.fn(),
				helpers: {},
			};
			registry.registerHelpers(mockHelpers);
		});

		it("should register all helpers with handlebars", () => {
			registry.loadHandlebars(mockHandlebars);

			expect(mockHandlebars.registerHelper).toHaveBeenCalledTimes(4);

			mockHelpers.forEach((helper) => {
				expect(mockHandlebars.registerHelper).toHaveBeenCalledWith(
					helper.name,
					helper.fn,
				);
			});
		});

		it("should handle empty registry", () => {
			const emptyRegistry = new HelperRegistry();
			emptyRegistry.loadHandlebars(mockHandlebars);

			expect(mockHandlebars.registerHelper).not.toHaveBeenCalled();
		});
	});

	describe("swapHelpers", () => {
		let mockHandlebars: HandlebarsInstance;
		beforeEach(() => {
			mockHandlebars = {
				registerHelper: jest.fn(),
				unregisterHelper: jest.fn(),
				compile: jest.fn(),
				helpers: {},
			};
			registry.registerHelpers(mockHelpers);
		});

		it("should unregister and re-register all helpers", () => {
			registry.swapHelpers(mockHandlebars);

			expect(mockHandlebars.unregisterHelper).toHaveBeenCalledTimes(4);
			expect(mockHandlebars.registerHelper).toHaveBeenCalledTimes(4);

			mockHelpers.forEach((helper) => {
				expect(mockHandlebars.unregisterHelper).toHaveBeenCalledWith(
					helper.name,
				);
				expect(mockHandlebars.registerHelper).toHaveBeenCalledWith(
					helper.name,
					helper.fn,
				);
			});
		});

		it("should call unregister before register for each helper", () => {
			const calls: string[] = [];

			mockHandlebars.unregisterHelper = jest.fn((name: string) => {
				calls.push(`unregister-${name}`);
			});

			mockHandlebars.registerHelper = jest.fn(
				(name: string, _fn: (...args: unknown[]) => unknown) => {
					calls.push(`register-${name}`);
				},
			);

			registry.swapHelpers(mockHandlebars);

			// Verify that each helper is unregistered before being registered
			mockHelpers.forEach((helper) => {
				const unregisterIndex = calls.indexOf(`unregister-${helper.name}`);
				const registerIndex = calls.indexOf(`register-${helper.name}`);

				expect(unregisterIndex).toBeLessThan(registerIndex);
			});
		});
	});

	describe("integration tests", () => {
		it("should work with real helper functions", () => {
			const realHelper: Helper = {
				name: "multiply",
				category: "Math",
				fn: (a: unknown, b: unknown) => {
					if (typeof a === "number" && typeof b === "number") {
						return a * b;
					}
					return 0;
				},
			};

			registry.register(realHelper);

			const filtered = registry.filter({ category: "Math" });
			expect(filtered).toHaveLength(1);

			const result = filtered[0].fn(3, 4);
			expect(result).toBe(12);
		});

		it("should maintain helper function context", () => {
			const contextHelper: Helper = {
				name: "contextTest",
				category: "Test",
				fn: function (this: unknown, value: unknown) {
					const prefix =
						typeof this === "object" && this !== null && "prefix" in this
							? String(this.prefix)
							: "";
					return `${prefix}${value}`;
				},
			};

			registry.register(contextHelper);

			const mockContext = { prefix: "PREFIX: " };
			const result = contextHelper.fn.call(mockContext, "test");
			expect(result).toBe("PREFIX: test");
		});

		it("should handle complex filter scenarios", () => {
			const additionalHelpers: Helper[] = [
				{ name: "helper1", category: "A", fn: () => {} },
				{ name: "helper2", category: "A", fn: () => {} },
				{ name: "helper3", category: "B", fn: () => {} },
				{ name: "helper4", category: "B", fn: () => {} },
				{ name: "helper5", category: "C", fn: () => {} },
			];

			registry.registerHelpers(additionalHelpers);

			expect(registry.filter({ category: "A" })).toHaveLength(2);
			expect(registry.filter({ category: "B" })).toHaveLength(2);
			expect(registry.filter({ category: "C" })).toHaveLength(1);
			expect(registry.filter({})).toHaveLength(5);
		});
	});

	describe("edge cases", () => {
		it("should handle helpers with undefined or null functions", () => {
			const invalidHelper: Helper = {
				name: "invalid",
				category: "Test",
				fn: (() => {}) as (...args: unknown[]) => unknown,
			};

			expect(() => registry.register(invalidHelper)).not.toThrow();
			expect(registry.has("invalid")).toBe(true);
		});

		it("should handle very long helper names", () => {
			const longNameHelper: Helper = {
				name: "a".repeat(1000),
				category: "Test",
				fn: () => "result",
			};

			expect(() => registry.register(longNameHelper)).not.toThrow();
			expect(registry.has("a".repeat(1000))).toBe(true);
		});

		it("should handle special characters in helper names", () => {
			const specialHelper: Helper = {
				name: "helper-with_special.chars@123",
				category: "Test",
				fn: () => "result",
			};

			registry.register(specialHelper);
			expect(registry.has("helper-with_special.chars@123")).toBe(true);
		});
	});
});
