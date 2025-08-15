import {
	afterHelper,
	arrayifyHelper,
	beforeHelper,
	eachIndexHelper,
	equalsLengthHelper,
	filterHelper,
	firstHelper,
	forEachHelper,
	inArrayHelper,
	isArrayHelper,
	itemAtHelper,
	joinHelper,
	lastHelper,
	lengthEqualHelper,
	lengthHelper,
	mapHelper,
	pluckHelper,
	reverseHelper,
	sliceHelper,
	someHelper,
	sortByHelper,
	sortHelper,
	uniqueHelper,
	withAfterHelper,
	withBeforeHelper,
	withFirstHelper,
	withGroupHelper,
	withLastHelper,
	withSortHelper,
} from "../../src/helpers/array";

describe("afterHelper", () => {
	it("returns items after the specified index", () => {
		expect(afterHelper.fn(["a", "b", "c", "d"], 1)).toEqual(["b", "c", "d"]);
	});
	it("returns empty array for non-array input", () => {
		expect(afterHelper.fn(null, 1)).toEqual([]);
	});
});

describe("arrayifyHelper", () => {
	it("wraps non-array value in array", () => {
		expect(arrayifyHelper.fn("foo")).toEqual(["foo"]);
	});
	it("returns array as-is", () => {
		expect(arrayifyHelper.fn([1, 2])).toEqual([1, 2]);
	});
	it("returns empty array for null/undefined", () => {
		expect(arrayifyHelper.fn(null)).toEqual([]);
		expect(arrayifyHelper.fn(undefined)).toEqual([]);
	});
});

describe("beforeHelper", () => {
	it("returns items before the specified index", () => {
		expect(beforeHelper.fn(["a", "b", "c", "d"], 2)).toEqual(["a", "b"]);
	});
	it("returns empty array for non-array input", () => {
		expect(beforeHelper.fn(null, 2)).toEqual([]);
	});
});

describe("eachIndexHelper", () => {
	it("calls block with item and index", () => {
		const options = {
			fn: ({ item, index }: { item: unknown; index: number }) =>
				`${item}:${index};`,
		};
		expect(eachIndexHelper.fn(["a", "b"], options)).toBe("a:0;b:1;");
	});
	it("returns empty string for non-array input", () => {
		const options = { fn: () => "x" };
		expect(eachIndexHelper.fn(null, options)).toBe("");
	});
});

describe("filterHelper", () => {
	it("filters array by value and calls block", () => {
		const options = { fn: (x: unknown) => `X${x}` };
		expect(filterHelper.fn(["foo", "bar", "foo"], "foo", options)).toBe(
			"XfooXfoo",
		);
	});
	it("calls inverse if no match", () => {
		const options = { fn: () => "", inverse: () => "NO" };
		expect(filterHelper.fn(["a"], "z", options)).toBe("NO");
	});
});

describe("firstHelper", () => {
	it("returns first item if n not given", () => {
		expect(firstHelper.fn([1, 2, 3])).toBe(1);
	});
	it("returns first n items if n given", () => {
		expect(firstHelper.fn([1, 2, 3], 2)).toEqual([1, 2]);
	});
	it("returns undefined for non-array", () => {
		expect(firstHelper.fn(null)).toBeUndefined();
	});
});

describe("forEachHelper", () => {
	it("calls block for each item with context", () => {
		const options = {
			fn: (ctx: { index: number; isFirst: boolean; isLast: boolean }) =>
				`${ctx.index}:${ctx.isFirst ? "F" : ""}${ctx.isLast ? "L" : ""};`,
		};
		expect(forEachHelper.fn(["a", "b"], options)).toBe("0:F;1:L;");
	});
	it("returns empty string for non-array", () => {
		const options = { fn: () => "x" };
		expect(forEachHelper.fn(null, options)).toBe("");
	});
});

describe("inArrayHelper", () => {
	it("calls block if value is present", () => {
		const options = { fn: () => "Y", inverse: () => "N" };
		expect(inArrayHelper.fn([1, 2, 3], 2, options)).toBe("Y");
	});
	it("calls inverse if value not present", () => {
		const options = { fn: () => "Y", inverse: () => "N" };
		expect(inArrayHelper.fn([1, 2, 3], 9, options)).toBe("N");
	});
});

describe("isArrayHelper", () => {
	it("returns true for arrays", () => {
		expect(isArrayHelper.fn([1, 2])).toBe(true);
	});
	it("returns false for non-arrays", () => {
		expect(isArrayHelper.fn("foo")).toBe(false);
	});
});

describe("itemAtHelper", () => {
	it("returns item at index", () => {
		expect(itemAtHelper.fn(["a", "b", "c"], 1)).toBe("b");
	});
	it("returns undefined for out of bounds", () => {
		expect(itemAtHelper.fn(["a"], 9)).toBeUndefined();
	});
});

describe("joinHelper", () => {
	it("joins with comma by default", () => {
		expect(joinHelper.fn(["a", "b", "c"])).toBe("a,b,c");
	});
	it("joins with custom separator", () => {
		expect(joinHelper.fn(["a", "b"], "-")).toBe("a-b");
	});
});

describe("equalsLengthHelper", () => {
	it("returns true if length matches", () => {
		expect(equalsLengthHelper.fn([1, 2], 2)).toBe(true);
	});
	it("returns false if not match", () => {
		expect(equalsLengthHelper.fn([1, 2], 3)).toBe(false);
	});
});

describe("lastHelper", () => {
	it("returns last item if n not given", () => {
		expect(lastHelper.fn([1, 2, 3])).toBe(3);
	});
	it("returns last n items if n given", () => {
		expect(lastHelper.fn([1, 2, 3], 2)).toEqual([2, 3]);
	});
});

describe("lengthHelper", () => {
	it("returns array length", () => {
		expect(lengthHelper.fn([1, 2, 3])).toBe(3);
	});
	it("returns string length", () => {
		expect(lengthHelper.fn("abc")).toBe(3);
	});
	it("returns object key count", () => {
		expect(lengthHelper.fn({ a: 1, b: 2 })).toBe(2);
	});
});

describe("lengthEqualHelper", () => {
	it("is alias for equalsLengthHelper", () => {
		expect(lengthEqualHelper).toBe(equalsLengthHelper);
	});
});

describe("sliceHelper", () => {
	it("returns slice of array as regular helper", () => {
		const array = ["a", "b", "c", "d", "e"];
		expect(sliceHelper.fn(array, 1, 4)).toEqual(["b", "c", "d"]);
	});

	it("works as block helper with Handlebars context", () => {
		const array = ["item1", "item2", "item3", "item4"];
		const mockOptions = {
			fn: (item: string) => `<li>${item}</li>`,
		};
		const result = sliceHelper.fn(array, 1, 3, mockOptions);
		expect(result).toBe("<li>item2</li><li>item3</li>");
	});

	it("handles string indices", () => {
		const array = [1, 2, 3, 4, 5];
		expect(sliceHelper.fn(array, "1", "4")).toEqual([2, 3, 4]);
	});

	it("uses defaults for invalid indices", () => {
		const array = ["a", "b", "c"];
		expect(sliceHelper.fn(array, "invalid", "also_invalid")).toEqual(["a", "b", "c"]);
		expect(sliceHelper.fn(array, 0, "invalid")).toEqual(["a", "b", "c"]);
	});

	it("returns empty string for non-array input", () => {
		expect(sliceHelper.fn(null, 0, 2)).toBe("");
		expect(sliceHelper.fn("not an array", 0, 2)).toBe("");
	});

	it("handles edge cases with indices", () => {
		const array = ["a", "b", "c"];
		// Start index beyond array length
		expect(sliceHelper.fn(array, 5, 10)).toEqual([]);
		// Negative start index with positive end (should return empty like native slice)
		expect(sliceHelper.fn(array, -1, 2)).toEqual([]);
		// Negative start index without end (should return last item)
		expect(sliceHelper.fn(array, -1)).toEqual(["c"]);
		// Negative indices both (should work like native slice)
		expect(sliceHelper.fn(array, -2, -1)).toEqual(["b"]);
		// End index beyond array length
		expect(sliceHelper.fn(array, 0, 10)).toEqual(["a", "b", "c"]);
	});

	it("works for pagination scenarios", () => {
		const testResults = [
			{ name: "test1" }, { name: "test2" }, { name: "test3" },
			{ name: "test4" }, { name: "test5" }, { name: "test6" }
		];
		
		// Page 1: items 0-2
		expect(sliceHelper.fn(testResults, 0, 3)).toEqual([
			{ name: "test1" }, { name: "test2" }, { name: "test3" }
		]);
		
		// Page 2: items 3-5
		expect(sliceHelper.fn(testResults, 3, 6)).toEqual([
			{ name: "test4" }, { name: "test5" }, { name: "test6" }
		]);
	});

	it("should be categorized as Array helper", () => {
		expect(sliceHelper.category).toBe("Array");
		expect(sliceHelper.name).toBe("slice");
	});
});

describe("mapHelper", () => {
	it("maps array with function", () => {
		const double = (x: number) => x * 2;
		expect(mapHelper.fn([1, 2, 3], double)).toEqual([2, 4, 6]);
	});
	it("returns empty array for non-array", () => {
		expect(mapHelper.fn(null, (x: unknown) => x)).toEqual([]);
	});
});

describe("pluckHelper", () => {
	it("plucks property from objects", () => {
		expect(pluckHelper.fn([{ a: 1 }, { a: 2 }], "a")).toEqual([1, 2]);
	});
	it("supports dot notation", () => {
		expect(pluckHelper.fn([{ a: { b: 2 } }], "a.b")).toEqual([2]);
	});
});

describe("reverseHelper", () => {
	it("reverses array", () => {
		expect(reverseHelper.fn([1, 2, 3])).toEqual([3, 2, 1]);
	});
	it("reverses string", () => {
		expect(reverseHelper.fn("abc")).toBe("cba");
	});
});

describe("someHelper", () => {
	it("calls block if some item passes iteratee", () => {
		const iter = (x: unknown) => typeof x === "string";
		const options = { fn: () => "Y", inverse: () => "N" };
		expect(someHelper.fn([1, "a", 3], iter, options)).toBe("Y");
	});
	it("calls inverse if none pass", () => {
		const iter = (x: unknown) => typeof x === "boolean";
		const options = { fn: () => "Y", inverse: () => "N" };
		expect(someHelper.fn([1, 2, 3], iter, options)).toBe("N");
	});
});

describe("sortHelper", () => {
	it("sorts array of numbers", () => {
		expect(sortHelper.fn([3, 1, 2])).toEqual([1, 2, 3]);
	});
	it("sorts array of objects by key", () => {
		expect(sortHelper.fn([{ a: 2 }, { a: 1 }], "a")).toEqual([
			{ a: 1 },
			{ a: 2 },
		]);
	});
	it("sorts with custom comparator", () => {
		const desc = (a: number, b: number) => b - a;
		expect(sortHelper.fn([1, 2, 3], desc)).toEqual([3, 2, 1]);
	});
});

describe("sortByHelper", () => {
	it("sorts array of objects by property", () => {
		expect(sortByHelper.fn([{ a: 2 }, { a: 1 }], "a")).toEqual([
			{ a: 1 },
			{ a: 2 },
		]);
	});
});

describe("withAfterHelper", () => {
	it("calls block for items after index", () => {
		const options = { fn: (x: unknown) => `${x}` };
		expect(withAfterHelper.fn(["a", "b", "c", "d"], 1, options)).toBe("cd");
	});
});

describe("withBeforeHelper", () => {
	it("calls block for items before index", () => {
		const options = { fn: (x: unknown) => `${x}` };
		expect(withBeforeHelper.fn(["a", "b", "c", "d"], 2, options)).toBe("ab");
	});
});

describe("withFirstHelper", () => {
	it("calls block for first item", () => {
		const options = { fn: (x: unknown) => `${x}` };
		expect(withFirstHelper.fn(["a", "b"], options)).toBe("a");
	});
});

describe("withGroupHelper", () => {
	it("calls block for each group", () => {
		const options = { fn: (group: unknown[]) => `${group.join("")}|` };
		expect(withGroupHelper.fn(["a", "b", "c", "d"], 2, options)).toBe("ab|cd|");
	});
});

describe("withLastHelper", () => {
	it("calls block for last item", () => {
		const options = { fn: (x: unknown) => `${x}` };
		expect(withLastHelper.fn(["a", "b", "c"], options)).toBe("c");
	});
});

describe("withSortHelper", () => {
	it("calls block for sorted items", () => {
		const options = { fn: (x: { a: number }) => `${x.a}` };
		expect(withSortHelper.fn([{ a: 2 }, { a: 1 }], "a", options)).toBe("12");
	});
});

describe("uniqueHelper", () => {
	it("removes duplicates", () => {
		expect(uniqueHelper.fn(["a", "b", "a"])).toEqual(["a", "b"]);
	});
});
