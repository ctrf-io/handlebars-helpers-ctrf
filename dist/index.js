/*!
 * handlebars-helpers <https://github.com/helpers/handlebars-helpers>
 *
 * Copyright (c) 2013-2017, Jon Schlinkert, Brian Woodward.
 * Released under the MIT License.
 */
import { forIn } from './lib/utils/for-in';
import { defineProperty } from './lib/utils/define-property';
import * as lib from './lib/index';
/**
 * Expose helpers
 */
export default function helpers(groups, options) {
    let actualGroups = null;
    let actualOptions = {};
    if (typeof groups === 'string') {
        actualGroups = [groups];
        actualOptions = options || {};
    }
    else if (Array.isArray(groups)) {
        actualGroups = groups;
        actualOptions = options || {};
    }
    else {
        actualOptions = groups || {};
        actualGroups = null;
    }
    // Use require for synchronous import - will be transpiled correctly
    const handlebars = require('handlebars');
    const hbs = actualOptions.handlebars || actualOptions.hbs || handlebars;
    defineProperty(helpers, 'handlebars', hbs);
    if (actualGroups) {
        actualGroups.forEach((key) => {
            const group = lib[key];
            if (group) {
                hbs.registerHelper(group);
            }
        });
    }
    else {
        forIn(lib, (group) => {
            hbs.registerHelper(group);
        });
    }
    return hbs.helpers;
}
/**
 * Expose helper groups
 */
forIn(lib, (group, key) => {
    defineProperty(helpers, key, (options) => {
        const actualOptions = options || {};
        const handlebars = require('handlebars');
        const hbs = actualOptions.handlebars || actualOptions.hbs || handlebars;
        defineProperty(helpers, 'handlebars', hbs);
        hbs.registerHelper(group);
        return hbs.helpers;
    });
});
/**
 * Expose `utils`
 */
export { utils } from './lib/utils/index';
// Named exports for individual helper groups
export const array = lib.array;
export const code = lib.code;
export const collection = lib.collection;
export const comparison = lib.comparison;
export const date = lib.date;
export const fs = lib.fs;
export const html = lib.html;
export const i18n = lib.i18n;
export const inflection = lib.inflection;
export const logging = lib.logging;
export const markdown = lib.markdown;
export const match = lib.match;
export const math = lib.math;
export const misc = lib.misc;
export const number = lib.number;
export const object = lib.object;
export const path = lib.path;
export const regex = lib.regex;
export const string = lib.string;
export const url = lib.url;
// Export all types
export * from './types';
//# sourceMappingURL=index.js.map