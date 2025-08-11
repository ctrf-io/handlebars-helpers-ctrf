import Handlebars from "handlebars";
import { HelperRegistry } from "./helper-registry";
import { arrayHelpers } from "./helpers/array";
import { collectionsHelpers } from "./helpers/collections";
import { comparisonHelpers } from "./helpers/comparison";
import { ctrfHelpers } from "./helpers/ctrf";
import { dateHelpers } from "./helpers/date";
import { fsHelpers } from "./helpers/fs";
import { githubHelpers } from "./helpers/github";
import { inflectionHelpers } from "./helpers/inflection";
import { matchHelpers } from "./helpers/match";
import { mathHelpers } from "./helpers/math";
import { miscHelpers } from "./helpers/misc";
import { numberHelpers } from "./helpers/number";
import { objectHelpers } from "./helpers/object";
import { pathHelpers } from "./helpers/path";
import { regexHelpers } from "./helpers/regex";
import { stringHelpers } from "./helpers/string";
import { timestampHelpers } from "./helpers/timestamp";
import { urlHelpers } from "./helpers/url";

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

export * from "./helpers/array";
/**
 * Exports all helpers.
 */
export * from "./helpers/collections";
export * from "./helpers/collections";
export * from "./helpers/comparison";
export * from "./helpers/ctrf";
export * from "./helpers/date";
export * from "./helpers/fs";
export * from "./helpers/fs";
export * from "./helpers/github";
export * from "./helpers/inflection";
export * from "./helpers/inflection";
export * from "./helpers/match";
export * from "./helpers/match";
export * from "./helpers/math";
export * from "./helpers/misc";
export * from "./helpers/number";
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
} from "./helpers/string";
export * from "./helpers/timestamp";
export * from "./helpers/url";
