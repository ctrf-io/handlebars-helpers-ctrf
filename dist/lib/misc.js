import { handlebarsUtils } from './utils/handlebars-utils.js';
import { get } from './utils/index.js';
import { frame } from './utils/handlebars-helper-create-frame.js';
import { kindOf } from './utils/kind-of.js';
/**
 * Block helper for exposing private `@` variables on the context
 */
export { frame };
/**
 * Return the given value of `prop` from `this.options`.
 *
 * ```handlebars
 * <!-- context = {options: {a: {b: {c: 'ddd'}}}} -->
 * {{option "a.b.c"}}
 * <!-- results => `ddd` -->
 * ```
 */
export function option(prop, locals, options) {
    return get(handlebarsUtils.options(this, locals, options), prop);
}
/**
 * Block helper that renders the block without taking any arguments.
 */
export function noop(options) {
    return options.fn(this);
}
/**
 * Get the native type of the given `value`
 *
 * ```handlebars
 * {{typeOf 1}}
 * //=> 'number'
 * {{typeOf "1"}}
 * //=> 'string'
 * {{typeOf "foo"}}
 * //=> 'string'
 * ```
 */
export function typeOf(value) {
    return kindOf(value);
}
/**
 * Block helper that builds the context for the block
 * from the options hash.
 */
export function withHash(options) {
    if (options.hash && Object.keys(options.hash).length) {
        return options.fn(options.hash);
    }
    else {
        return options.inverse(this);
    }
}
//# sourceMappingURL=misc.js.map