import {
	absHelper,
	addHelper,
	avgHelper,
	ceilHelper,
	divideHelper,
	floorHelper,
	minusHelper,
	moduloHelper,
	multiplyHelper,
	plusHelper,
	randomHelper,
	remainderHelper,
	roundHelper,
	subtractHelper,
	sumHelper,
	timesHelper,
} from "../../src/helpers/math";

describe("Math Helpers", () => {
	describe("absHelper", () => {
		it("returns absolute value", () => {
			expect(absHelper.fn(-42)).toBe(42);
			expect(absHelper.fn(42)).toBe(42);
			expect(absHelper.fn("-7")).toBe(7);
			expect(absHelper.fn("foo")).toBe(0);
		});
	});
	describe("addHelper", () => {
		it("adds two numbers", () => {
			expect(addHelper.fn(1, 2)).toBe(3);
			expect(addHelper.fn("3", "4")).toBe(7);
			expect(addHelper.fn(1, "foo")).toBe(1);
		});
	});
	describe("avgHelper", () => {
		it("returns average of array", () => {
			expect(avgHelper.fn([1, 2, 3, 4, 5])).toBe(3);
			expect(avgHelper.fn("[2,4,6,8]" as unknown)).toBe(5);
			expect(avgHelper.fn([])).toBe(0);
			expect(avgHelper.fn("[]")).toBe(0);
			expect(avgHelper.fn("foo")).toBe(0);
		});
	});
	describe("ceilHelper", () => {
		it("returns ceiled value", () => {
			expect(ceilHelper.fn(1.2)).toBe(2);
			expect(ceilHelper.fn("2.8")).toBe(3);
			expect(ceilHelper.fn("foo")).toBe(0);
		});
	});
	describe("divideHelper", () => {
		it("divides a by b", () => {
			expect(divideHelper.fn(10, 2)).toBe(5);
			expect(divideHelper.fn("9", "3")).toBe(3);
			expect(divideHelper.fn(10, 0)).toBe(0);
			expect(divideHelper.fn("foo", 2)).toBe(0);
		});
	});
	describe("floorHelper", () => {
		it("returns floored value", () => {
			expect(floorHelper.fn(1.8)).toBe(1);
			expect(floorHelper.fn("2.9")).toBe(2);
			expect(floorHelper.fn("foo")).toBe(0);
		});
	});
	describe("minusHelper", () => {
		it("subtracts b from a", () => {
			expect(minusHelper.fn(10, 3)).toBe(7);
			expect(minusHelper.fn("5", "2")).toBe(3);
			expect(minusHelper.fn(1, "foo")).toBe(1);
		});
	});
	describe("moduloHelper", () => {
		it("returns a % b", () => {
			expect(moduloHelper.fn(7, 3)).toBe(1);
			expect(moduloHelper.fn("10", "4")).toBe(2);
			expect(moduloHelper.fn(10, 0)).toBe(0);
		});
	});
	describe("multiplyHelper", () => {
		it("multiplies a by b", () => {
			expect(multiplyHelper.fn(2, 3)).toBe(6);
			expect(multiplyHelper.fn("4", "5")).toBe(20);
			expect(multiplyHelper.fn(2, "foo")).toBe(0);
		});
	});
	describe("plusHelper", () => {
		it("adds a and b (alias)", () => {
			expect(plusHelper.fn(1, 2)).toBe(3);
			expect(plusHelper.fn("3", "4")).toBe(7);
		});
	});
	describe("randomHelper", () => {
		it("returns random integer in range", () => {
			const val = randomHelper.fn(1, 10);
			expect(val).toBeGreaterThanOrEqual(1);
			expect(val).toBeLessThanOrEqual(10);
		});
		it("returns 0 for invalid input", () => {
			expect(randomHelper.fn("foo", 10)).toBe(0);
			expect(randomHelper.fn(1, "bar")).toBe(0);
		});
	});
	describe("remainderHelper", () => {
		it("returns a % b (alias)", () => {
			expect(remainderHelper.fn(10, 4)).toBe(2);
			expect(remainderHelper.fn("9", "5")).toBe(4);
			expect(remainderHelper.fn(10, 0)).toBe(0);
		});
	});
	describe("roundHelper", () => {
		it("rounds to nearest integer", () => {
			expect(roundHelper.fn(1.7)).toBe(2);
			expect(roundHelper.fn("2.2")).toBe(2);
			expect(roundHelper.fn("foo")).toBe(0);
		});
	});
	describe("subtractHelper", () => {
		it("subtracts b from a (alias)", () => {
			expect(subtractHelper.fn(10, 3)).toBe(7);
			expect(subtractHelper.fn("5", "2")).toBe(3);
		});
	});
	describe("sumHelper", () => {
		it("returns sum of array", () => {
			expect(sumHelper.fn([1, 2, 3, 4, 5])).toBe(15);
			expect(sumHelper.fn("[2,4,6,8]" as unknown)).toBe(20);
			expect(sumHelper.fn([])).toBe(0);
			expect(sumHelper.fn("[]")).toBe(0);
			expect(sumHelper.fn("foo")).toBe(0);
		});
	});
	describe("timesHelper", () => {
		it("multiplies a by b (alias)", () => {
			expect(timesHelper.fn(2, 3)).toBe(6);
			expect(timesHelper.fn("4", "5")).toBe(20);
		});
	});
});
