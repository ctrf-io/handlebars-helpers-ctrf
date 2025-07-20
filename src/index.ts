import Handlebars from "handlebars";
import { HelperRegistry } from "./helper-registry";
import { arrayHelpers } from "./helpers/array";
import { collectionsHelpers } from "./helpers/collections";
import { comparisonHelpers } from "./helpers/comparison";
// import { ctrfHelpers } from "./helpers/ctrf";
import { dateHelpers } from "./helpers/date";
import { fsHelpers } from "./helpers/fs";
import { inflectionHelpers } from "./helpers/inflection";
import { matchHelpers } from "./helpers/match";
import { mathHelpers } from "./helpers/math";
import { miscHelpers } from "./helpers/misc";
import { numberHelpers } from "./helpers/number";
import { objectHelpers } from "./helpers/object";
import { pathHelpers } from "./helpers/path";
import { regexHelpers } from "./helpers/regex";
import { stringHelpers } from "./helpers/string";
import { urlHelpers } from "./helpers/url";

/**
 * The default helper registry.
 */
const registry = new HelperRegistry();

registry.registerHelpers([
	// ...ctrfHelpers,
	...arrayHelpers,
	...collectionsHelpers,
	...comparisonHelpers,
	...dateHelpers,
	...fsHelpers,
	...inflectionHelpers,
	...matchHelpers,
	...mathHelpers,
	...miscHelpers,
	...numberHelpers,
	...objectHelpers,
	...pathHelpers,
	...regexHelpers,
	...stringHelpers,
	...urlHelpers,
]);

registry.loadHandlebars(Handlebars);

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
export * from "./helpers/date";
// export * from "./helpers/ctrf";
export * from "./helpers/fs";
export * from "./helpers/fs";
export * from "./helpers/inflection";
export * from "./helpers/inflection";
export * from "./helpers/match";
export * from "./helpers/match";
export * from "./helpers/math";
export * from "./helpers/misc";
export * from "./helpers/number";
export * from "./helpers/url";
