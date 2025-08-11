import { yearHelper, dateHelpers } from "../../src/helpers/date";

describe("year helper", () => {
	it("should work as a Handlebars helper", () => {
		expect(yearHelper.fn()).toBe(new Date().getFullYear());
	});
});

describe("dateHelpers export", () => {
	it("should contain all date helpers", () => {
		expect(dateHelpers).toHaveLength(1);
		expect(dateHelpers.map((h: any) => h.name)).toEqual([
			"year"
		]);
	});

	it("should have proper helper structure", () => {
		dateHelpers.forEach((helper: any) => {
			expect(helper).toHaveProperty("name");
			expect(helper).toHaveProperty("category");
			expect(helper).toHaveProperty("fn");
			expect(typeof helper.fn).toBe("function");
		});
	});
});
