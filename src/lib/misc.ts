import type { HandlebarsHelperOptions } from '../types.js';
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
export function option(
  this: any,
  prop: string,
  locals?: any,
  options?: HandlebarsHelperOptions
): any {
  return get(handlebarsUtils.options(this, locals, options), prop);
}

/**
 * Block helper that renders the block without taking any arguments.
 */
export function noop(this: any, options: HandlebarsHelperOptions): string {
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
export function typeOf(value: any): string {
  return kindOf(value);
}

/**
 * Block helper that builds the context for the block
 * from the options hash.
 */
export function withHash(this: any, options: HandlebarsHelperOptions): string {
  if (options.hash && Object.keys(options.hash).length) {
    return options.fn(options.hash);
  } else {
    return options.inverse(this);
  }
} 