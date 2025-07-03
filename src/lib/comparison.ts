import type { HandlebarsHelperOptions } from '../types.js';

/**
 * Block helper that renders a block if `a` is equal to `b`.
 */
export function eq(this: any, a: any, b: any, options: HandlebarsHelperOptions): string {
  if (arguments.length === 2) {
    options = b as any;
    b = options.hash?.compare;
  }
  
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
}

/**
 * Block helper that renders a block if `a` is not equal to `b`.
 */
export function ne(this: any, a: any, b: any, options: HandlebarsHelperOptions): string {
  if (arguments.length === 2) {
    options = b as any;
    b = options.hash?.compare;
  }
  
  if (a !== b) {
    return options.fn(this);
  }
  return options.inverse(this);
}

/**
 * Block helper that renders a block if `a` is less than `b`.
 */
export function lt(this: any, a: any, b: any, options: HandlebarsHelperOptions): string {
  if (arguments.length === 2) {
    options = b as any;
    b = options.hash?.compare;
  }
  
  if (a < b) {
    return options.fn(this);
  }
  return options.inverse(this);
}

/**
 * Block helper that renders a block if `a` is greater than `b`.
 */
export function gt(this: any, a: any, b: any, options: HandlebarsHelperOptions): string {
  if (arguments.length === 2) {
    options = b as any;
    b = options.hash?.compare;
  }
  
  if (a > b) {
    return options.fn(this);
  }
  return options.inverse(this);
}

/**
 * Block helper that renders a block if `a` is less than or equal to `b`.
 */
export function lte(this: any, a: any, b: any, options: HandlebarsHelperOptions): string {
  if (arguments.length === 2) {
    options = b as any;
    b = options.hash?.compare;
  }
  
  if (a <= b) {
    return options.fn(this);
  }
  return options.inverse(this);
}

/**
 * Block helper that renders a block if `a` is greater than or equal to `b`.
 */
export function gte(this: any, a: any, b: any, options: HandlebarsHelperOptions): string {
  if (arguments.length === 2) {
    options = b as any;
    b = options.hash?.compare;
  }
  
  if (a >= b) {
    return options.fn(this);
  }
  return options.inverse(this);
}

/**
 * Block helper that renders a block if `value` is falsy.
 */
export function ifFalsy(this: any, value: any, options: HandlebarsHelperOptions): string {
  if (!value) {
    return options.fn(this);
  }
  return options.inverse(this);
}

/**
 * Block helper that renders a block if `value` is truthy.
 */
export function ifTruthy(this: any, value: any, options: HandlebarsHelperOptions): string {
  if (value) {
    return options.fn(this);
  }
  return options.inverse(this);
}

/**
 * Block helper that renders a block if `value` is defined.
 */
export function ifDefined(this: any, value: any, options: HandlebarsHelperOptions): string {
  if (value !== undefined) {
    return options.fn(this);
  }
  return options.inverse(this);
}

/**
 * Block helper that renders a block if `value` is undefined.
 */
export function ifUndefined(this: any, value: any, options: HandlebarsHelperOptions): string {
  if (value === undefined) {
    return options.fn(this);
  }
  return options.inverse(this);
}

/**
 * Block helper that renders a block if any of the given values are truthy.
 */
export function or(this: any, ...args: any[]): string {
  const options = args[args.length - 1] as HandlebarsHelperOptions;
  const values = args.slice(0, -1);
  
  if (values.some(Boolean)) {
    return options.fn(this);
  }
  return options.inverse(this);
}

/**
 * Block helper that renders a block if all of the given values are truthy.
 */
export function and(this: any, ...args: any[]): string {
  const options = args[args.length - 1] as HandlebarsHelperOptions;
  const values = args.slice(0, -1);
  
  if (values.every(Boolean)) {
    return options.fn(this);
  }
  return options.inverse(this);
} 