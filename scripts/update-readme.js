#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, "..");
const readmePath = path.join(rootDir, "README.md");

async function extractHelperDocs() {
	const helpers = [];
	const helpersDir = path.join(rootDir, "src/helpers");

	const helperFiles = fs.readdirSync(helpersDir)
		.filter(file => file.endsWith('.ts') && !file.startsWith('__'))
		.map(file => path.join(helpersDir, file));

	for (const helperFile of helperFiles) {
		const content = fs.readFileSync(helperFile, "utf-8");
		const category = path.basename(helperFile, '.ts').replace(/^./, str => str.toUpperCase());
		helpers.push(...extractHelpersFromFile(content, category));
	}

	return helpers;
}

function extractHelpersFromFile(content, category) {
	const helpers = [];
	const helperRegex =
		/\/\*\*\s*\n([\s\S]*?)\*\/\s*\n(?:export\s+const\s+(\w+):\s*Helper\s*=\s*{[^}]*name:\s*['"`]([^'"`]+)['"`]|export\s+function\s+(\w+))/g;

	let match;
	while ((match = helperRegex.exec(content)) !== null) {
		const [, docComment, constName, helperName, functionName] = match;
		const name = helperName || functionName || constName;

		if (docComment && name) {
			const cleanedDoc = docComment
				.split("\n")
				.map((line) => line.replace(/^\s*\*\s?/, "").trim())
				.filter((line) => line.length > 0)
				.join("\n");

			const lines = cleanedDoc.split("\n");
			const description = [];
			let inExample = false;

			for (const line of lines) {
				if (
					line.startsWith("@") ||
					line.includes("```") ||
					line.includes("@example")
				) {
					break;
				}
				if (line.trim()) {
					description.push(line);
				}
			}

			const exampleMatch = cleanedDoc.match(
				/@example\s*\n([\s\S]*?)(?=\n@|\n\*\/|$)/,
			);
			const example = exampleMatch ? exampleMatch[1].trim() : null;

			const paramMatches = [
				...cleanedDoc.matchAll(
					/@param\s+{([^}]+)}\s+(?:`([^`]+)`|\[([^\]]+)\]|(\S+))\s*-?\s*(.*)/g,
				),
			];
			const params = paramMatches.map((match) => ({
				type: match[1],
				name: match[2] || match[3] || match[4],
				description: match[5],
			}));

			const returnMatch = cleanedDoc.match(/@returns?\s+{([^}]+)}\s*(.*)/);
			const returnInfo = returnMatch
				? {
						type: returnMatch[1],
						description: returnMatch[2],
					}
				: null;

			helpers.push({
				name: name.replace(/Helper$/, ""),
				category,
				description: description.join(" "),
				example,
				params,
				returnInfo,
			});
		}
	}

	return helpers;
}

function generateHelperDocs(helpers) {
	const groupedHelpers = helpers.reduce((acc, helper) => {
		if (!acc[helper.category]) {
			acc[helper.category] = [];
		}
		acc[helper.category].push(helper);
		return acc;
	}, {});

	let docs = "";

	const sortedCategories = Object.keys(groupedHelpers).sort((a, b) => {
		if (a === 'Ctrf') return -1;
		if (b === 'Ctrf') return 1;
		return a.localeCompare(b);
	});

	for (const category of sortedCategories) {
		const categoryHelpers = groupedHelpers[category];
		docs += `### ${category} Helpers\n\n`;

		for (const helper of categoryHelpers) {
			docs += `#### \`${helper.name}\`\n\n`;
			docs += `${helper.description}\n\n`;

			if (helper.params && helper.params.length > 0) {
				docs += "**Parameters:**\n\n";
				for (const param of helper.params) {
					docs += `- \`${param.name}\` (\`${param.type}\`) - ${param.description}\n`;
				}
				docs += "\n";
			}

			if (helper.returnInfo) {
				docs += `**Returns:** \`${helper.returnInfo.type}\` - ${helper.returnInfo.description}\n\n`;
			}

			if (helper.example) {
				docs += "**Example:**\n\n";
				docs += "```handlebars\n";
				docs += helper.example;
				docs += "\n```\n\n";
			}

			docs += "---\n\n";
		}
	}

	return docs;
}

async function updateReadme() {
	try {
		const helpers = await extractHelperDocs();
		const helperDocs = generateHelperDocs(helpers);

		const readmeContent = fs.readFileSync(readmePath, "utf-8");

		const startMarker = "<!-- DOCS_START -->";
		const endMarker = "<!-- DOCS_END -->";

		const startIndex = readmeContent.indexOf(startMarker);
		const endIndex = readmeContent.indexOf(endMarker);

		if (startIndex === -1 || endIndex === -1) {
			console.error("Documentation markers not found in README.md");
			process.exit(1);
		}

		const before = readmeContent.substring(0, startIndex + startMarker.length);
		const after = readmeContent.substring(endIndex);

		const newContent = `${before}\n\n${helperDocs}${after}`;

		fs.writeFileSync(readmePath, newContent);

		console.log("✅ README.md updated with helper documentation");
		console.log(`📝 Documented ${helpers.length} helpers`);

		const tempDocsPath = path.join(rootDir, "temp-docs");
		if (fs.existsSync(tempDocsPath)) {
			fs.rmSync(tempDocsPath, { recursive: true, force: true });
		}
	} catch (error) {
		console.error("❌ Error updating README:", error.message);
		process.exit(1);
	}
}

updateReadme();
