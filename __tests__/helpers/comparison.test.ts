import {
	andHelper,
	compareHelper,
	containsHelper,
	defaultHelper,
	eqHelper,
	gteHelper,
	gtHelper,
	hasHelper,
	ifEvenHelper,
	ifNthHelper,
	ifOddHelper,
	isFalseyHelper,
	isHelper,
	isntHelper,
	isTruthyHelper,
	lteHelper,
	ltHelper,
	neitherHelper,
	notHelper,
	orHelper,
	unlessEqHelper,
	unlessGteqHelper,
	unlessGtHelper,
	unlessLteqHelper,
	unlessLtHelper,
} from "../../src/helpers/comparison";

describe("Comparison Helpers", () => {
	describe("andHelper", () => {
		it("returns true if both are truthy", () => {
			expect(andHelper.fn(true, 1)).toBe(true);
		});
		it("returns false if either is falsy", () => {
			expect(andHelper.fn(true, 0)).toBe(false);
			expect(andHelper.fn(false, 1)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(andHelper.fn(true, 1, options)).toBe("Y");
			expect(andHelper.fn(true, 0, options)).toBe("N");
		});
	});

	describe("compareHelper", () => {
		it("handles ==, ===, !=, !==, >, >=, <, <=", () => {
			expect(compareHelper.fn(2, "==", "2")).toBe(true);
			expect(compareHelper.fn(2, "===", 2)).toBe(true);
			expect(compareHelper.fn(2, "!=", 3)).toBe(true);
			expect(compareHelper.fn(2, "!==", "2")).toBe(true);
			expect(compareHelper.fn(3, ">", 2)).toBe(true);
			expect(compareHelper.fn(2, ">=", 2)).toBe(true);
			expect(compareHelper.fn(1, "<", 2)).toBe(true);
			expect(compareHelper.fn(2, "<=", 2)).toBe(true);
		});
		it("throws on unknown operator", () => {
			expect(() => compareHelper.fn(1, "???", 2)).toThrow();
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(compareHelper.fn(2, "==", 2, options)).toBe("Y");
			expect(compareHelper.fn(2, "==", 3, options)).toBe("N");
		});
	});

	describe("containsHelper", () => {
		it("returns true if array contains value", () => {
			expect(containsHelper.fn([1, 2, 3], 2)).toBe(true);
		});
		it("returns false if not present", () => {
			expect(containsHelper.fn([1, 2, 3], 9)).toBe(false);
		});
		it("works with string", () => {
			expect(containsHelper.fn("abc", "b")).toBe(true);
			expect(containsHelper.fn("abc", "z")).toBe(false);
		});
		it("works with object values", () => {
			expect(containsHelper.fn({ a: 1, b: 2 }, 2)).toBe(true);
			expect(containsHelper.fn({ a: 1, b: 2 }, 9)).toBe(false);
		});
		it("respects startIndex", () => {
			expect(containsHelper.fn([1, 2, 3, 2], 2, 2)).toBe(true);
			expect(containsHelper.fn([1, 2, 3, 2], 2, 3)).toBe(true);
			expect(containsHelper.fn([1, 2, 3, 2], 2, 4)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(containsHelper.fn([1, 2, 3], 2, options)).toBe("Y");
			expect(containsHelper.fn([1, 2, 3], 9, options)).toBe("N");
		});
	});

	describe("defaultHelper", () => {
		it("returns value if defined", () => {
			expect(defaultHelper.fn("foo", "bar")).toBe("foo");
		});
		it("returns default if undefined", () => {
			expect(defaultHelper.fn(undefined, "bar")).toBe("bar");
		});
	});

	describe("eqHelper", () => {
		it("returns true if strictly equal", () => {
			expect(eqHelper.fn(2, 2)).toBe(true);
			expect(eqHelper.fn(2, "2")).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(eqHelper.fn(2, 2, options)).toBe("Y");
			expect(eqHelper.fn(2, 3, options)).toBe("N");
		});
	});

	describe("gtHelper", () => {
		it("returns true if a > b", () => {
			expect(gtHelper.fn(3, 2)).toBe(true);
			expect(gtHelper.fn(2, 3)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(gtHelper.fn(3, 2, options)).toBe("Y");
			expect(gtHelper.fn(2, 3, options)).toBe("N");
		});
	});

	describe("gteHelper", () => {
		it("returns true if a >= b", () => {
			expect(gteHelper.fn(3, 2)).toBe(true);
			expect(gteHelper.fn(2, 2)).toBe(true);
			expect(gteHelper.fn(1, 2)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(gteHelper.fn(3, 2, options)).toBe("Y");
			expect(gteHelper.fn(1, 2, options)).toBe("N");
		});
	});

	describe("hasHelper", () => {
		it("returns true if string contains pattern", () => {
			expect(hasHelper.fn("abc", "b")).toBe(true);
			expect(hasHelper.fn("abc", "z")).toBe(false);
		});
		it("returns true if array contains pattern", () => {
			expect(hasHelper.fn([1, 2, 3], 2)).toBe(true);
			expect(hasHelper.fn([1, 2, 3], 9)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(hasHelper.fn([1, 2, 3], 2, options)).toBe("Y");
			expect(hasHelper.fn([1, 2, 3], 9, options)).toBe("N");
		});
	});

	describe("isFalseyHelper", () => {
		it("returns true for falsey values", () => {
			expect(isFalseyHelper.fn(false)).toBe(true);
			expect(isFalseyHelper.fn(0)).toBe(true);
			expect(isFalseyHelper.fn(null)).toBe(true);
			expect(isFalseyHelper.fn(undefined)).toBe(true);
			expect(isFalseyHelper.fn("")).toBe(true);
		});
		it("returns false for truthy values", () => {
			expect(isFalseyHelper.fn(1)).toBe(false);
			expect(isFalseyHelper.fn("a")).toBe(false);
			expect(isFalseyHelper.fn([])).toBe(false);
		});
	});

	describe("isTruthyHelper", () => {
		it("returns true for truthy values", () => {
			expect(isTruthyHelper.fn(1)).toBe(true);
			expect(isTruthyHelper.fn("a")).toBe(true);
			expect(isTruthyHelper.fn([])).toBe(true);
		});
		it("returns false for falsey values", () => {
			expect(isTruthyHelper.fn(false)).toBe(false);
			expect(isTruthyHelper.fn(0)).toBe(false);
			expect(isTruthyHelper.fn(null)).toBe(false);
			expect(isTruthyHelper.fn(undefined)).toBe(false);
			expect(isTruthyHelper.fn("")).toBe(false);
		});
	});

	describe("ifEvenHelper", () => {
		it("returns true for even numbers", () => {
			expect(ifEvenHelper.fn(2)).toBe(true);
			expect(ifEvenHelper.fn(0)).toBe(true);
		});
		it("returns false for odd numbers", () => {
			expect(ifEvenHelper.fn(1)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(ifEvenHelper.fn(2, options)).toBe("Y");
			expect(ifEvenHelper.fn(1, options)).toBe("N");
		});
	});

	describe("ifNthHelper", () => {
		it("returns true if a % b === 0", () => {
			expect(ifNthHelper.fn(6, 3)).toBe(true);
			expect(ifNthHelper.fn(7, 3)).toBe(false);
		});
		it("returns false for non-numbers or b=0", () => {
			expect(ifNthHelper.fn("a", 3)).toBe(false);
			expect(ifNthHelper.fn(6, 0)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(ifNthHelper.fn(6, 3, options)).toBe("Y");
			expect(ifNthHelper.fn(7, 3, options)).toBe("N");
		});
	});

	describe("ifOddHelper", () => {
		it("returns true for odd numbers", () => {
			expect(ifOddHelper.fn(1)).toBe(true);
			expect(ifOddHelper.fn(3)).toBe(true);
		});
		it("returns false for even numbers", () => {
			expect(ifOddHelper.fn(2)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(ifOddHelper.fn(1, options)).toBe("Y");
			expect(ifOddHelper.fn(2, options)).toBe("N");
		});
	});

	describe("isHelper", () => {
		it("returns true for loose equality", () => {
			expect(isHelper.fn(2, "2")).toBe(true);
			expect(isHelper.fn(2, 2)).toBe(true);
		});
		it("returns false if not equal", () => {
			expect(isHelper.fn(2, 3)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(isHelper.fn(2, "2", options)).toBe("Y");
			expect(isHelper.fn(2, 3, options)).toBe("N");
		});
	});

	describe("isntHelper", () => {
		it("returns true for loose inequality", () => {
			expect(isntHelper.fn(2, 3)).toBe(true);
			expect(isntHelper.fn(2, "3")).toBe(true);
		});
		it("returns false if equal", () => {
			expect(isntHelper.fn(2, 2)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(isntHelper.fn(2, 3, options)).toBe("Y");
			expect(isntHelper.fn(2, 2, options)).toBe("N");
		});
	});

	describe("ltHelper", () => {
		it("returns true if a < b", () => {
			expect(ltHelper.fn(1, 2)).toBe(true);
			expect(ltHelper.fn(2, 1)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(ltHelper.fn(1, 2, options)).toBe("Y");
			expect(ltHelper.fn(2, 1, options)).toBe("N");
		});
	});

	describe("lteHelper", () => {
		it("returns true if a <= b", () => {
			expect(lteHelper.fn(1, 2)).toBe(true);
			expect(lteHelper.fn(2, 2)).toBe(true);
			expect(lteHelper.fn(3, 2)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(lteHelper.fn(1, 2, options)).toBe("Y");
			expect(lteHelper.fn(3, 2, options)).toBe("N");
		});
	});

	describe("neitherHelper", () => {
		it("returns true if both are falsey", () => {
			expect(neitherHelper.fn(0, null)).toBe(true);
			expect(neitherHelper.fn(false, undefined)).toBe(true);
		});
		it("returns false if either is truthy", () => {
			expect(neitherHelper.fn(1, 0)).toBe(false);
			expect(neitherHelper.fn(0, 1)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(neitherHelper.fn(0, null, options)).toBe("Y");
			expect(neitherHelper.fn(1, 0, options)).toBe("N");
		});
	});

	describe("notHelper", () => {
		it("returns true for falsey", () => {
			expect(notHelper.fn(0)).toBe(true);
			expect(notHelper.fn(null)).toBe(true);
		});
		it("returns false for truthy", () => {
			expect(notHelper.fn(1)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(notHelper.fn(0, options)).toBe("Y");
			expect(notHelper.fn(1, options)).toBe("N");
		});
	});

	describe("orHelper", () => {
		it("returns true if any value is truthy", () => {
			expect(orHelper.fn(0, 1)).toBe(true);
			expect(orHelper.fn(false, true)).toBe(true);
			expect(orHelper.fn(0, 0)).toBe(false);
		});
		it("renders block/inverse", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(orHelper.fn(0, 1, options)).toBe("Y");
			expect(orHelper.fn(0, 0, options)).toBe("N");
		});
	});

	describe("unlessEqHelper", () => {
		it("returns true if not strictly equal", () => {
			expect(unlessEqHelper.fn(2, 3)).toBe(true);
			expect(unlessEqHelper.fn(2, 2)).toBe(false);
		});
		it("renders inverse/block", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(unlessEqHelper.fn(2, 2, options)).toBe("N");
			expect(unlessEqHelper.fn(2, 3, options)).toBe("Y");
		});
	});

	describe("unlessGtHelper", () => {
		it("returns true if not greater than", () => {
			expect(unlessGtHelper.fn(2, 3)).toBe(true);
			expect(unlessGtHelper.fn(3, 2)).toBe(false);
		});
		it("renders inverse/block", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(unlessGtHelper.fn(3, 2, options)).toBe("N");
			expect(unlessGtHelper.fn(2, 3, options)).toBe("Y");
		});
	});

	describe("unlessLtHelper", () => {
		it("returns true if not less than", () => {
			expect(unlessLtHelper.fn(3, 2)).toBe(true);
			expect(unlessLtHelper.fn(2, 3)).toBe(false);
		});
		it("renders inverse/block", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(unlessLtHelper.fn(2, 3, options)).toBe("N");
			expect(unlessLtHelper.fn(3, 2, options)).toBe("Y");
		});
	});

	describe("unlessGteqHelper", () => {
		it("returns true if not >=", () => {
			expect(unlessGteqHelper.fn(1, 2)).toBe(true);
			expect(unlessGteqHelper.fn(2, 2)).toBe(false);
			expect(unlessGteqHelper.fn(3, 2)).toBe(false);
		});
		it("renders inverse/block", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(unlessGteqHelper.fn(2, 2, options)).toBe("N");
			expect(unlessGteqHelper.fn(1, 2, options)).toBe("Y");
		});
	});

	describe("unlessLteqHelper", () => {
		it("returns true if not <=", () => {
			expect(unlessLteqHelper.fn(3, 2)).toBe(true);
			expect(unlessLteqHelper.fn(2, 2)).toBe(false);
			expect(unlessLteqHelper.fn(1, 2)).toBe(false);
		});
		it("renders inverse/block", () => {
			const options = { fn: () => "Y", inverse: () => "N" };
			expect(unlessLteqHelper.fn(2, 2, options)).toBe("N");
			expect(unlessLteqHelper.fn(3, 2, options)).toBe("Y");
		});
	});
});
