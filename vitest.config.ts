import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		reporters: ["default", "@d2t/vitest-ctrf-json-reporter"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			include: ["src/**/*.ts"],
			exclude: [
				"node_modules/",
				"dist/",
				"coverage/",
				"**/*.d.ts",
				"**/*.test.ts",
				"**/*.spec.ts",
				"scripts/**",
				"ctrf/",
			],
		},
		environment: "node",
		globals: true,
		include: ["__tests__/**/*.{test,spec}.{js,ts}"],
		exclude: ["node_modules/", "dist/", "coverage/"],
	},
});
