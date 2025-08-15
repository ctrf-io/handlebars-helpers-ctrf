import Handlebars from "handlebars";
import { HelperRegistry } from "./helper-registry.js";
import { arrayHelpers } from "./helpers/array.js";
import { collectionsHelpers } from "./helpers/collections.js";
import { comparisonHelpers } from "./helpers/comparison.js";
import { ctrfHelpers } from "./helpers/ctrf.js";
import { dateHelpers } from "./helpers/date.js";
import { fsHelpers } from "./helpers/fs.js";
import { githubHelpers } from "./helpers/github.js";
import { inflectionHelpers } from "./helpers/inflection.js";
import { matchHelpers } from "./helpers/match.js";
import { mathHelpers } from "./helpers/math.js";
import { miscHelpers } from "./helpers/misc.js";
import { numberHelpers } from "./helpers/number.js";
import { objectHelpers } from "./helpers/object.js";
import { pathHelpers } from "./helpers/path.js";
import { regexHelpers } from "./helpers/regex.js";
import { stringHelpers } from "./helpers/string.js";
import { timestampHelpers } from "./helpers/timestamp.js";
import { urlHelpers } from "./helpers/url.js";

/**
 * The default helper registry.
 */
const registry = new HelperRegistry();

registry.registerHelpers([
	...ctrfHelpers,
	...arrayHelpers,
	...collectionsHelpers,
	...comparisonHelpers,
	...dateHelpers,
	...fsHelpers,
	...githubHelpers,
	...inflectionHelpers,
	...matchHelpers,
	...mathHelpers,
	...miscHelpers,
	...numberHelpers,
	...objectHelpers,
	...pathHelpers,
	...regexHelpers,
	...stringHelpers,
	...timestampHelpers,
	...urlHelpers,
]);

registry.loadHandlebars(Handlebars);

/**
 * load helpers into Handlebars instance.
 * @param handlebarsInstance - The Handlebars instance to load helpers into
 */
export function loadHelpers(handlebarsInstance: {
	registerHelper: (name: string, fn: (...args: unknown[]) => unknown) => void;
}) {
	registry.loadHandlebars(handlebarsInstance);
}

/**
 * Exports the default helper registry and the HelperRegistry class.
 */
export { registry, HelperRegistry };

export * from "./helpers/array.js";
/**
 * Exports all helpers.
 */
export * from "./helpers/collections.js";
export * from "./helpers/collections.js";
export * from "./helpers/comparison.js";
export * from "./helpers/ctrf.js";
export * from "./helpers/date.js";
export * from "./helpers/fs.js";
export * from "./helpers/fs.js";
export * from "./helpers/github.js";
export * from "./helpers/inflection.js";
export * from "./helpers/inflection.js";
export * from "./helpers/match.js";
export * from "./helpers/match.js";
export * from "./helpers/math.js";
export * from "./helpers/misc.js";
export * from "./helpers/number.js";
export {
	ansiToHtmlHelper,
	appendHelper,
	camelCaseHelper,
	capitalizeAllHelper,
	capitalizeHelper,
	centerHelper,
	chopHelper,
	dashCaseHelper,
	dotCaseHelper,
	downCaseHelper,
	ellipsisHelper,
	escapeMarkdownHelper,
	hyphenateHelper,
	isStringHelper,
	lowerCaseHelper,
	occurrencesHelper,
	pascalCaseHelper,
	pathCaseHelper,
	plusifyHelper,
	prependHelper,
	rawHelper,
	removeFirstHelper,
	removeHelper,
	replaceFirstHelper,
	replaceHelper,
	sentenceHelper,
	sliceStringHelper,
	snakeCaseHelper,
	splitHelper,
	splitLinesHelper,
	startsWithHelper,
	stringHelpers,
	stripAnsiHelper,
	titleizeHelper,
	trimHelper,
	trimLeftHelper,
	trimRightHelper,
	truncateHelper,
	truncateWordsHelper,
	upcaseHelper,
	uppercaseHelper,
} from "./helpers/string.js";
export * from "./helpers/timestamp.js";
export * from "./helpers/url.js";
