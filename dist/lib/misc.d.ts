import type { HandlebarsHelperOptions } from '../types.js';
import { frame } from './utils/handlebars-helper-create-frame.js';
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
export declare function option(this: any, prop: string, locals?: any, options?: HandlebarsHelperOptions): any;
/**
 * Block helper that renders the block without taking any arguments.
 */
export declare function noop(this: any, options: HandlebarsHelperOptions): string;
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
export declare function typeOf(value: any): string;
/**
 * Block helper that builds the context for the block
 * from the options hash.
 */
export declare function withHash(this: any, options: HandlebarsHelperOptions): string;
//# sourceMappingURL=misc.d.ts.map