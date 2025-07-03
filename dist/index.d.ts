/*!
 * handlebars-helpers <https://github.com/helpers/handlebars-helpers>
 *
 * Copyright (c) 2013-2017, Jon Schlinkert, Brian Woodward.
 * Released under the MIT License.
 */
import type { HelperRegistrationOptions, HandlebarsHelpers } from './types';
import * as lib from './lib/index';
/**
 * Expose helpers
 */
export default function helpers(groups?: string | string[] | HelperRegistrationOptions, options?: HelperRegistrationOptions): HandlebarsHelpers;
/**
 * Expose `utils`
 */
export { utils } from './lib/utils/index';
export declare const array: typeof lib.array;
export declare const code: typeof lib.code;
export declare const collection: typeof lib.collection;
export declare const comparison: typeof lib.comparison;
export declare const date: typeof lib.date;
export declare const fs: typeof lib.fs;
export declare const html: typeof lib.html;
export declare const i18n: typeof lib.i18n;
export declare const inflection: typeof lib.inflection;
export declare const logging: typeof lib.logging;
export declare const markdown: typeof lib.markdown;
export declare const match: typeof lib.match;
export declare const math: typeof lib.math;
export declare const misc: typeof lib.misc;
export declare const number: typeof lib.number;
export declare const object: typeof lib.object;
export declare const path: typeof lib.path;
export declare const regex: typeof lib.regex;
export declare const string: typeof lib.string;
export declare const url: typeof lib.url;
export * from './types';
//# sourceMappingURL=index.d.ts.map