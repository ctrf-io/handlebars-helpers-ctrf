import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { filesHelper, readHelper } from "../../src/helpers/fs";

describe("readHelper", () => {
	const testFile = join(__dirname, "../../test-data/test-read.txt");

	beforeAll(() => {
		mkdirSync(join(__dirname, "../../test-data"), { recursive: true });
		writeFileSync(testFile, "CTRf test file contents");
	});

	afterAll(() => {
		if (existsSync(testFile)) rmSync(testFile);
	});

	it("should return empty string for missing file", () => {
		expect(readHelper.fn("src/test-data/does-not-exist.txt")).toBe("");
	});

	it("should return empty string for non-string input", () => {
		expect(readHelper.fn(null as unknown)).toBe("");
		expect(readHelper.fn(undefined as unknown)).toBe("");
	});
});
