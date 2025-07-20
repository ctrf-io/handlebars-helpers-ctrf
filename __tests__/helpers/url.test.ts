import Handlebars from "handlebars";
import {
	decodeURIComponentHelper,
	encodeURIComponentHelper,
	escapeUrlHelper,
	resolveUrlHelper,
	stripProtocolHelper,
	stripQueryStringHelper,
	urlHelpers,
} from "../../src/helpers/url";

describe("URL Helpers", () => {
	beforeAll(() => {
		Handlebars.registerHelper(
			"encodeURIComponent",
			encodeURIComponentHelper.fn,
		);
		Handlebars.registerHelper("escapeUrl", escapeUrlHelper.fn);
		Handlebars.registerHelper(
			"decodeURIComponent",
			decodeURIComponentHelper.fn,
		);
		Handlebars.registerHelper("resolveUrl", resolveUrlHelper.fn);
		Handlebars.registerHelper("stripQueryString", stripQueryStringHelper.fn);
		Handlebars.registerHelper("stripProtocol", stripProtocolHelper.fn);
	});

	describe("encodeURIComponentHelper", () => {
		it("should encode URI components", () => {
			expect(encodeURIComponentHelper.fn("User Login Test")).toBe(
				"User%20Login%20Test",
			);
			expect(encodeURIComponentHelper.fn("/path/to/file?query=1")).toBe(
				"%2Fpath%2Fto%2Ffile%3Fquery%3D1",
			);
		});
		it("should handle non-string input", () => {
			expect(encodeURIComponentHelper.fn(null as unknown)).toBe("");
			expect(encodeURIComponentHelper.fn(undefined as unknown)).toBe("");
			expect(encodeURIComponentHelper.fn(123 as unknown)).toBe("");
		});
		it("should work in a CTRF test report context", () => {
			const tpl = Handlebars.compile(
				"/tests/{{encodeURIComponent test.name}}.html",
			);
			expect(tpl({ test: { name: "User Login Test" } })).toBe(
				"/tests/User%20Login%20Test.html",
			);
		});
	});

	describe("escapeUrlHelper", () => {
		it("should escape URL characters", () => {
			// encodeURI does not escape '/' and '?', so adjust expected output
			expect(escapeUrlHelper.fn("User/Login?Test")).toBe("User/Login?Test");
			expect(escapeUrlHelper.fn("foo bar")).toBe("foo%20bar");
		});
		it("should handle non-string input", () => {
			expect(escapeUrlHelper.fn(null as unknown)).toBe("");
			expect(escapeUrlHelper.fn(undefined as unknown)).toBe("");
			expect(escapeUrlHelper.fn(123 as unknown)).toBe("");
		});
		it("should work in a CTRF test report context", () => {
			const tpl = Handlebars.compile("/assets/{{escapeUrl test.name}}.log");
			expect(tpl({ test: { name: "User/Login?Test" } })).toBe(
				"/assets/User/Login?Test.log",
			);
		});
	});

	describe("decodeURIComponentHelper", () => {
		it("should decode URI components", () => {
			expect(decodeURIComponentHelper.fn("User%20Login%20Test")).toBe(
				"User Login Test",
			);
			expect(
				decodeURIComponentHelper.fn("%2Fpath%2Fto%2Ffile%3Fquery%3D1"),
			).toBe("/path/to/file?query=1");
		});
		it("should handle non-string input", () => {
			expect(decodeURIComponentHelper.fn(null as unknown)).toBe("");
			expect(decodeURIComponentHelper.fn(undefined as unknown)).toBe("");
			expect(decodeURIComponentHelper.fn(123 as unknown)).toBe("");
		});
		it("should handle invalid URI sequences gracefully", () => {
			expect(decodeURIComponentHelper.fn("%E0%A4%A")).toBe("%E0%A4%A");
		});
		it("should work in a CTRF test report context", () => {
			const tpl = Handlebars.compile("{{decodeURIComponent test.encodedName}}");
			expect(tpl({ test: { encodedName: "User%20Login%20Test" } })).toBe(
				"User Login Test",
			);
		});
	});

	describe("resolveUrlHelper", () => {
		it("should resolve relative URLs against a base", () => {
			expect(
				resolveUrlHelper.fn("https://example.com/tests/", "../report.html"),
			).toBe("https://example.com/report.html");
			expect(resolveUrlHelper.fn("https://example.com/", "test.html")).toBe(
				"https://example.com/test.html",
			);
		});
		it("should handle non-string input", () => {
			expect(resolveUrlHelper.fn(null as unknown, "test.html")).toBe("");
			expect(resolveUrlHelper.fn("https://example.com/", null as unknown)).toBe(
				"",
			);
		});
		it("should handle invalid URLs gracefully", () => {
			expect(resolveUrlHelper.fn("not a url", "test.html")).toBe("test.html");
		});
		it("should work in a CTRF test report context", () => {
			const tpl = Handlebars.compile("{{resolveUrl base href}}");
			expect(
				tpl({ base: "https://example.com/tests/", href: "../report.html" }),
			).toBe("https://example.com/report.html");
		});
	});

	describe("stripQueryStringHelper", () => {
		it("should strip query string from URL", () => {
			expect(
				stripQueryStringHelper.fn("https://example.com/test?run=123"),
			).toBe("https://example.com/test");
			expect(stripQueryStringHelper.fn("/foo/bar?x=1&y=2")).toBe("/foo/bar");
			expect(stripQueryStringHelper.fn("/foo/bar")).toBe("/foo/bar");
		});
		it("should handle non-string input", () => {
			expect(stripQueryStringHelper.fn(null as unknown)).toBe("");
			expect(stripQueryStringHelper.fn(undefined as unknown)).toBe("");
			expect(stripQueryStringHelper.fn(123 as unknown)).toBe("");
		});
		it("should work in a CTRF test report context", () => {
			const tpl = Handlebars.compile("{{stripQueryString test.url}}");
			expect(tpl({ test: { url: "https://example.com/test?run=123" } })).toBe(
				"https://example.com/test",
			);
		});
	});

	describe("stripProtocolHelper", () => {
		it("should strip http/https protocol from URL", () => {
			expect(stripProtocolHelper.fn("http://foo.bar")).toBe("//foo.bar");
			expect(stripProtocolHelper.fn("https://foo.bar")).toBe("//foo.bar");
			expect(stripProtocolHelper.fn("//foo.bar")).toBe("//foo.bar");
			expect(stripProtocolHelper.fn("ftp://foo.bar")).toBe("ftp://foo.bar");
		});
		it("should handle non-string input", () => {
			expect(stripProtocolHelper.fn(null as unknown)).toBe("");
			expect(stripProtocolHelper.fn(undefined as unknown)).toBe("");
			expect(stripProtocolHelper.fn(123 as unknown)).toBe("");
		});
		it("should work in a CTRF test report context", () => {
			const tpl = Handlebars.compile("{{stripProtocol test.url}}");
			expect(tpl({ test: { url: "https://foo.bar" } })).toBe("//foo.bar");
		});
	});

	describe("urlHelpers export", () => {
		it("should contain all url helpers", () => {
			expect(urlHelpers).toHaveLength(6);
			expect(urlHelpers.map((h) => h.name)).toEqual([
				"encodeURIComponent",
				"escapeUrl",
				"decodeURIComponent",
				"resolveUrl",
				"stripQueryString",
				"stripProtocol",
			]);
		});
		it("should have proper helper structure", () => {
			urlHelpers.forEach((helper) => {
				expect(helper).toHaveProperty("name");
				expect(helper).toHaveProperty("category", "URL");
				expect(helper).toHaveProperty("fn");
				expect(typeof helper.fn).toBe("function");
			});
		});
	});
});
