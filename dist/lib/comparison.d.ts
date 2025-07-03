import type { HandlebarsHelperOptions } from '../types.js';
/**
 * Block helper that renders a block if `a` is equal to `b`.
 */
export declare function eq(this: any, a: any, b: any, options: HandlebarsHelperOptions): string;
/**
 * Block helper that renders a block if `a` is not equal to `b`.
 */
export declare function ne(this: any, a: any, b: any, options: HandlebarsHelperOptions): string;
/**
 * Block helper that renders a block if `a` is less than `b`.
 */
export declare function lt(this: any, a: any, b: any, options: HandlebarsHelperOptions): string;
/**
 * Block helper that renders a block if `a` is greater than `b`.
 */
export declare function gt(this: any, a: any, b: any, options: HandlebarsHelperOptions): string;
/**
 * Block helper that renders a block if `a` is less than or equal to `b`.
 */
export declare function lte(this: any, a: any, b: any, options: HandlebarsHelperOptions): string;
/**
 * Block helper that renders a block if `a` is greater than or equal to `b`.
 */
export declare function gte(this: any, a: any, b: any, options: HandlebarsHelperOptions): string;
/**
 * Block helper that renders a block if `value` is falsy.
 */
export declare function ifFalsy(this: any, value: any, options: HandlebarsHelperOptions): string;
/**
 * Block helper that renders a block if `value` is truthy.
 */
export declare function ifTruthy(this: any, value: any, options: HandlebarsHelperOptions): string;
/**
 * Block helper that renders a block if `value` is defined.
 */
export declare function ifDefined(this: any, value: any, options: HandlebarsHelperOptions): string;
/**
 * Block helper that renders a block if `value` is undefined.
 */
export declare function ifUndefined(this: any, value: any, options: HandlebarsHelperOptions): string;
/**
 * Block helper that renders a block if any of the given values are truthy.
 */
export declare function or(this: any, ...args: any[]): string;
/**
 * Block helper that renders a block if all of the given values are truthy.
 */
export declare function and(this: any, ...args: any[]): string;
//# sourceMappingURL=comparison.d.ts.map