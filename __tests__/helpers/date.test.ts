import { yearHelper } from "../../src/helpers/date";

describe("year helper", () => {
	it("should work as a Handlebars helper", () => {
		expect(yearHelper.fn()).toBe(new Date().getFullYear());
	});
});
