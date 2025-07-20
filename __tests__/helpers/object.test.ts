import {
	extendHelper,
	forInHelper,
	forOwnHelper,
	getHelper,
	getObjectHelper,
	hasOwnHelper,
	isObjectHelper,
	JSONparseHelper,
	JSONstringifyHelper,
	mergeHelper,
	objectHelpers,
	pickHelper,
	toPathHelper,
} from "../../src/helpers/object";

describe("extendHelper", () => {
	it("should extend context with properties of other objects", () => {
		const context = { name: "test", status: "pending" };
		const obj1 = { status: "passed", duration: 1000 };
		const obj2 = { metadata: { priority: "high" } };

		const result = extendHelper.fn(context, obj1, obj2) as Record<
			string,
			unknown
		>;

		expect(result.name).toBe("test");
		expect(result.status).toBe("passed");
		expect(result.duration).toBe(1000);
		expect(result.metadata).toEqual({ priority: "high" });
	});

	it("should handle non-object inputs", () => {
		expect(extendHelper.fn(null as unknown, { a: 1 })).toEqual({});
		expect(extendHelper.fn({ a: 1 }, null as unknown)).toEqual({ a: 1 });
		expect(extendHelper.fn({ a: 1 }, "string" as unknown)).toEqual({ a: 1 });
	});

	it("should not mutate the original context", () => {
		const context = { name: "test" };
		const obj = { status: "passed" };

		extendHelper.fn(context, obj);

		expect(context).toEqual({ name: "test" });
	});
});

describe("forInHelper", () => {
	it("should iterate over all properties including inherited ones", () => {
		const obj = { name: "test", status: "passed" };
		const mockOptions = {
			fn: (context: Record<string, unknown>) =>
				`${context["@key"]}:${context.this}`,
		};

		const result = forInHelper.fn(obj, mockOptions);
		expect(result).toContain("name:test");
		expect(result).toContain("status:passed");
	});

	it("should handle non-object inputs", () => {
		expect(forInHelper.fn(null as unknown, { fn: () => "" })).toBe("");
		expect(forInHelper.fn("string" as unknown, { fn: () => "" })).toBe("");
	});

	it("should handle missing options.fn", () => {
		expect(forInHelper.fn({ a: 1 }, {})).toBe("");
		expect(forInHelper.fn({ a: 1 }, { fn: null })).toBe("");
	});
});

describe("forOwnHelper", () => {
	it("should iterate over own properties only", () => {
		const obj = { name: "test", status: "passed" };
		const mockOptions = {
			fn: (context: Record<string, unknown>) =>
				`${context["@key"]}:${context.this}`,
		};

		const result = forOwnHelper.fn(obj, mockOptions);
		expect(result).toContain("name:test");
		expect(result).toContain("status:passed");
	});

	it("should handle non-object inputs", () => {
		expect(forOwnHelper.fn(null as unknown, { fn: () => "" })).toBe("");
		expect(forOwnHelper.fn("string" as unknown, { fn: () => "" })).toBe("");
	});

	it("should handle missing options.fn", () => {
		expect(forOwnHelper.fn({ a: 1 }, {})).toBe("");
		expect(forOwnHelper.fn({ a: 1 }, { fn: null })).toBe("");
	});
});

describe("toPathHelper", () => {
	it("should create dot-delineated property paths", () => {
		expect(toPathHelper.fn("test", "results", "status")).toBe(
			"test.results.status",
		);
		expect(toPathHelper.fn("suite", 0, "name")).toBe("suite.0.name");
	});

	it("should handle null and undefined values", () => {
		expect(toPathHelper.fn("test", null, "status")).toBe("test.null.status");
		expect(toPathHelper.fn("test", undefined, "status")).toBe(
			"test.undefined.status",
		);
	});

	it("should handle mixed types", () => {
		expect(toPathHelper.fn("test", 123, "name")).toBe("test.123.name");
		expect(toPathHelper.fn(true, "config", "enabled")).toBe(
			"true.config.enabled",
		);
	});
});

describe("getHelper", () => {
	it("should get nested values using dot notation", () => {
		const context = {
			test: {
				results: {
					status: "passed",
					duration: 1000,
				},
			},
		};

		expect(getHelper.fn("test.results.status", context)).toBe("passed");
		expect(getHelper.fn("test.results.duration", context)).toBe(1000);
	});

	it("should work as a block helper", () => {
		const context = { test: { metadata: { priority: "high" } } };
		const mockOptions = {
			fn: (value: unknown) =>
				`Priority: ${(value as Record<string, unknown>).priority}`,
		};

		const result = getHelper.fn("test.metadata", context, mockOptions);
		expect(result).toBe("Priority: high");
	});

	it("should return undefined for invalid paths", () => {
		const context = { test: { results: { status: "passed" } } };

		expect(getHelper.fn("test.results.nonexistent", context)).toBeUndefined();
		expect(getHelper.fn("nonexistent.path", context)).toBeUndefined();
	});

	it("should handle invalid inputs", () => {
		expect(getHelper.fn(null as unknown, {})).toBeUndefined();
		expect(getHelper.fn("path", null as unknown)).toBeUndefined();
		expect(getHelper.fn(123 as unknown, {})).toBeUndefined();
	});
});

describe("getObjectHelper", () => {
	it("should get nested objects", () => {
		const context = {
			test: {
				results: {
					status: "passed",
					duration: 1000,
				},
			},
		};

		const result = getObjectHelper.fn("test.results", context) as Record<
			string,
			unknown
		>;
		expect(result.status).toBe("passed");
		expect(result.duration).toBe(1000);
	});

	it("should return undefined for invalid paths", () => {
		const context = { test: { results: { status: "passed" } } };

		expect(
			getObjectHelper.fn("test.results.nonexistent", context),
		).toBeUndefined();
		expect(getObjectHelper.fn("nonexistent.path", context)).toBeUndefined();
	});

	it("should handle invalid inputs", () => {
		expect(getObjectHelper.fn(null as unknown, {})).toBeUndefined();
		expect(getObjectHelper.fn("path", null as unknown)).toBeUndefined();
		expect(getObjectHelper.fn(123 as unknown, {})).toBeUndefined();
	});
});

describe("hasOwnHelper", () => {
	it("should return true for own properties", () => {
		const obj = { name: "test", status: "passed" };

		expect(hasOwnHelper.fn(obj, "name")).toBe(true);
		expect(hasOwnHelper.fn(obj, "status")).toBe(true);
	});

	it("should return false for non-existent properties", () => {
		const obj = { name: "test" };

		expect(hasOwnHelper.fn(obj, "nonexistent")).toBe(false);
		expect(hasOwnHelper.fn(obj, "toString")).toBe(false); // inherited property
	});

	it("should handle invalid inputs", () => {
		expect(hasOwnHelper.fn(null as unknown, "key")).toBe(false);
		expect(hasOwnHelper.fn({}, null as unknown)).toBe(false);
		expect(hasOwnHelper.fn({}, 123 as unknown)).toBe(false);
	});
});

describe("isObjectHelper", () => {
	it("should return true for objects", () => {
		expect(isObjectHelper.fn({})).toBe(true);
		expect(isObjectHelper.fn({ name: "test" })).toBe(true);
		expect(isObjectHelper.fn([])).toBe(true);
		expect(isObjectHelper.fn(new Date())).toBe(true);
	});

	it("should return false for non-objects", () => {
		expect(isObjectHelper.fn("string")).toBe(false);
		expect(isObjectHelper.fn(123)).toBe(false);
		expect(isObjectHelper.fn(true)).toBe(false);
		expect(isObjectHelper.fn(null)).toBe(false);
		expect(isObjectHelper.fn(undefined)).toBe(false);
	});
});

describe("JSONparseHelper", () => {
	it("should parse valid JSON strings", () => {
		const jsonString = '{"status": "passed", "duration": 1000}';
		const result = JSONparseHelper.fn(jsonString) as Record<string, unknown>;

		expect(result.status).toBe("passed");
		expect(result.duration).toBe(1000);
	});

	it("should work as a block helper", () => {
		const jsonString = '{"priority": "high", "category": "smoke"}';
		const mockOptions = {
			fn: (value: unknown) =>
				`Priority: ${(value as Record<string, unknown>).priority}`,
		};

		const result = JSONparseHelper.fn(jsonString, mockOptions);
		expect(result).toBe("Priority: high");
	});

	it("should return undefined for invalid JSON", () => {
		expect(JSONparseHelper.fn('{"invalid": json}')).toBeUndefined();
		expect(JSONparseHelper.fn("not json")).toBeUndefined();
	});

	it("should handle invalid inputs", () => {
		expect(JSONparseHelper.fn(null as unknown)).toBeUndefined();
		expect(JSONparseHelper.fn(123 as unknown)).toBeUndefined();
		expect(JSONparseHelper.fn({} as unknown)).toBeUndefined();
	});
});

describe("JSONstringifyHelper", () => {
	it("should stringify objects", () => {
		const obj = { status: "passed", duration: 1000 };
		const result = JSONstringifyHelper.fn(obj);

		expect(result).toBe('{"status":"passed","duration":1000}');
	});

	it("should handle arrays", () => {
		const arr = ["test1", "test2", "test3"];
		const result = JSONstringifyHelper.fn(arr);

		expect(result).toBe('["test1","test2","test3"]');
	});

	it("should handle primitive values", () => {
		expect(JSONstringifyHelper.fn("string")).toBe('"string"');
		expect(JSONstringifyHelper.fn(123)).toBe("123");
		expect(JSONstringifyHelper.fn(true)).toBe("true");
	});

	it("should return empty string for non-serializable objects", () => {
		const circular: Record<string, unknown> = {};
		circular.self = circular;

		expect(JSONstringifyHelper.fn(circular)).toBe("");
	});
});

describe("mergeHelper", () => {
	it("should deeply merge objects", () => {
		const obj1 = {
			test: {
				name: "Login Test",
				config: { timeout: 5000 },
			},
		};
		const obj2 = {
			test: {
				status: "passed",
				config: { retries: 3 },
			},
		};

		const result = mergeHelper.fn(obj1, obj2) as Record<string, unknown>;
		const test = result.test as Record<string, unknown>;
		const config = test.config as Record<string, unknown>;

		expect(test.name).toBe("Login Test");
		expect(test.status).toBe("passed");
		expect(config.timeout).toBe(5000);
		expect(config.retries).toBe(3);
	});

	it("should handle non-object inputs", () => {
		expect(mergeHelper.fn(null as unknown, { a: 1 })).toEqual({});
		expect(mergeHelper.fn({ a: 1 }, null as unknown)).toEqual({ a: 1 });
		expect(mergeHelper.fn({ a: 1 }, "string" as unknown)).toEqual({ a: 1 });
	});

	it("should not mutate the original objects", () => {
		const obj1 = { a: 1 };
		const obj2 = { b: 2 };

		mergeHelper.fn(obj1, obj2);

		expect(obj1).toEqual({ a: 1 });
		expect(obj2).toEqual({ b: 2 });
	});
});

describe("pickHelper", () => {
	it("should pick specified properties", () => {
		const context = {
			name: "test",
			status: "passed",
			duration: 1000,
			metadata: { priority: "high" },
		};

		const result = pickHelper.fn("name status", context) as Record<
			string,
			unknown
		>;

		expect(result.name).toBe("test");
		expect(result.status).toBe("passed");
		expect(result.duration).toBeUndefined();
	});

	it("should work as a block helper", () => {
		const context = { name: "test", status: "passed", duration: 1000 };
		const mockOptions = {
			fn: (picked: Record<string, unknown>) =>
				`${picked.name} - ${picked.status}`,
		};

		const result = pickHelper.fn("name status", context, mockOptions);
		expect(result).toBe("test - passed");
	});

	it("should handle inverse block when no values found", () => {
		const context = { name: "test" };
		const mockOptions = {
			fn: () => "found",
			inverse: () => "not found",
		};

		const result = pickHelper.fn("nonexistent", context, mockOptions);
		expect(result).toBe("not found");
	});

	it("should handle invalid inputs", () => {
		expect(pickHelper.fn(null as unknown, {})).toEqual({});
		expect(pickHelper.fn("name", null as unknown)).toEqual({});
		expect(pickHelper.fn(123 as unknown, {})).toEqual({});
	});
});

describe("objectHelpers", () => {
	it("should export all object helpers", () => {
		expect(objectHelpers).toHaveLength(12);

		const helperNames = objectHelpers.map((helper) => helper.name);
		expect(helperNames).toContain("extend");
		expect(helperNames).toContain("forIn");
		expect(helperNames).toContain("forOwn");
		expect(helperNames).toContain("get");
		expect(helperNames).toContain("getObject");
		expect(helperNames).toContain("hasOwn");
		expect(helperNames).toContain("isObject");
		expect(helperNames).toContain("JSONparse");
		expect(helperNames).toContain("JSONstringify");
		expect(helperNames).toContain("merge");
		expect(helperNames).toContain("pick");
		expect(helperNames).toContain("toPath");
	});

	it("should have correct category for all helpers", () => {
		objectHelpers.forEach((helper) => {
			expect(helper.category).toBe("Object");
		});
	});

	it("should have function property for all helpers", () => {
		objectHelpers.forEach((helper) => {
			expect(typeof helper.fn).toBe("function");
		});
	});
});
