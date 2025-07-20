import {
	absoluteHelper,
	basenameHelper,
	dirnameHelper,
	extnameHelper,
	pathHelpers,
	relativeHelper,
	resolveHelper,
	segmentsHelper,
	stemHelper,
} from "../../src/helpers/path";

const isWindows = process.platform === "win32";
const sep = isWindows ? "\\" : "/";

describe("dirnameHelper", () => {
	it("should return directory name", () => {
		expect(dirnameHelper.fn(`docs${sep}toc.md`)).toBe("docs");
		expect(dirnameHelper.fn(`a${sep}b${sep}c.txt`)).toBe(`a${sep}b`);
	});
	it("should return empty string for root file", () => {
		expect(dirnameHelper.fn("toc.md")).toBe("");
	});
	it("should return empty string for non-string input", () => {
		expect(dirnameHelper.fn(null as unknown)).toBe("");
		expect(dirnameHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("relativeHelper", () => {
	it("should return relative path", () => {
		expect(relativeHelper.fn("docs", `docs${sep}toc.md`)).toBe("toc.md");
		expect(relativeHelper.fn("a", `a${sep}b${sep}c.txt`)).toBe(`b${sep}c.txt`);
	});
	it("should return empty string for non-string input", () => {
		expect(relativeHelper.fn(null as unknown, "b")).toBe("");
		expect(relativeHelper.fn("a", null as unknown)).toBe("");
	});
});

describe("extnameHelper", () => {
	it("should return file extension", () => {
		expect(extnameHelper.fn(`docs${sep}toc.md`)).toBe(".md");
		expect(extnameHelper.fn(`a${sep}b${sep}c.txt`)).toBe(".txt");
		expect(extnameHelper.fn(`file${sep}noext`)).toBe("");
	});
	it("should return empty string for non-string input", () => {
		expect(extnameHelper.fn(null as unknown)).toBe("");
		expect(extnameHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("stemHelper", () => {
	it("should return filename without extension", () => {
		expect(stemHelper.fn(`docs${sep}toc.md`)).toBe("toc");
		expect(stemHelper.fn(`a${sep}b${sep}c.txt`)).toBe("c");
		expect(stemHelper.fn("file.noext")).toBe("file");
		expect(stemHelper.fn("file")).toBe("file");
	});
	it("should return empty string for non-string input", () => {
		expect(stemHelper.fn(null as unknown)).toBe("");
		expect(stemHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("basenameHelper", () => {
	it("should return file name", () => {
		expect(basenameHelper.fn(`docs${sep}toc.md`)).toBe("toc.md");
		expect(basenameHelper.fn(`a${sep}b${sep}c.txt`)).toBe("c.txt");
		expect(basenameHelper.fn("file")).toBe("file");
	});
	it("should return empty string for non-string input", () => {
		expect(basenameHelper.fn(null as unknown)).toBe("");
		expect(basenameHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("resolveHelper", () => {
	it("should resolve absolute path", () => {
		const abs = resolveHelper.fn("docs/toc.md") as string;
		expect(typeof abs).toBe("string");
		expect(abs.endsWith(`docs${sep}toc.md`)).toBe(true);
	});
	it("should return empty string for non-string input", () => {
		expect(resolveHelper.fn(null as unknown)).toBe("");
		expect(resolveHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("segmentsHelper", () => {
	it("should return joined segments for valid indices", () => {
		expect(segmentsHelper.fn(`a${sep}b${sep}c${sep}d`, "2", "3")).toBe(
			`c${sep}d`,
		);
		expect(segmentsHelper.fn(`a${sep}b${sep}c${sep}d`, 1, 3)).toBe(
			`b${sep}c${sep}d`,
		);
		expect(segmentsHelper.fn(`a${sep}b${sep}c${sep}d`, 1, 2)).toBe(`b${sep}c`);
	});
	it("should return empty string for invalid indices", () => {
		expect(segmentsHelper.fn(`a${sep}b${sep}c${sep}d`, "x", "2")).toBe("");
		expect(segmentsHelper.fn(`a${sep}b${sep}c${sep}d`, 2, 1)).toBe("");
		expect(segmentsHelper.fn(`a${sep}b${sep}c${sep}d`, -1, 2)).toBe("");
	});
	it("should return empty string for non-string input", () => {
		expect(segmentsHelper.fn(null as unknown, 1, 2)).toBe("");
		expect(segmentsHelper.fn(undefined as unknown, 1, 2)).toBe("");
	});
});

describe("absoluteHelper (alias for dirname)", () => {
	it("should return directory name (alias)", () => {
		expect(absoluteHelper.fn(`docs${sep}toc.md`)).toBe("docs");
		expect(absoluteHelper.fn(`a${sep}b${sep}c.txt`)).toBe(`a${sep}b`);
	});
	it("should return empty string for root file", () => {
		expect(absoluteHelper.fn("toc.md")).toBe("");
	});
	it("should return empty string for non-string input", () => {
		expect(absoluteHelper.fn(null as unknown)).toBe("");
		expect(absoluteHelper.fn(undefined as unknown)).toBe("");
	});
});

describe("pathHelpers export", () => {
	it("should contain all path helpers", () => {
		expect(pathHelpers.map((h) => h.name)).toEqual([
			"dirname",
			"relative",
			"extname",
			"stem",
			"basename",
			"resolve",
			"segments",
			"absolute",
		]);
	});
	it("should have proper helper structure", () => {
		pathHelpers.forEach((helper) => {
			expect(helper).toHaveProperty("name");
			expect(helper).toHaveProperty("category", "Path");
			expect(helper).toHaveProperty("fn");
			expect(typeof helper.fn).toBe("function");
		});
	});
});
