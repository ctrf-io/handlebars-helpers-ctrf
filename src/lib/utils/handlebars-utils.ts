import type { HandlebarsHelperOptions } from '../../types.js';

/**
 * Get options object from helper arguments
 */
export function options(
  _context: any,
  locals?: any,
  options?: HandlebarsHelperOptions
): HandlebarsHelperOptions {
  if (arguments.length === 2 && isObject(locals)) {
    options = locals as HandlebarsHelperOptions;
    locals = undefined;
  }
  
  options = options || ({} as HandlebarsHelperOptions);
  if (locals && options.hash) {
    options.hash = { ...options.hash, ...locals };
  }
  
  return options;
}

/**
 * Check if value is a valid handlebars options object
 */
export function isOptions(value: any): value is HandlebarsHelperOptions {
  return isObject(value) && 
         typeof (value as any).fn === 'function' && 
         typeof (value as any).inverse === 'function';
}

/**
 * Check if helper is a block helper
 */
export function isBlock(options: HandlebarsHelperOptions): boolean {
  return typeof options.fn === 'function';
}

/**
 * Get the last argument (typically the options object)
 */
export function getLastArg(args: any[]): any {
  return args[args.length - 1];
}

/**
 * Check if the last argument is an options object
 */
export function hasOptions(args: any[]): boolean {
  const last = getLastArg(args);
  return isOptions(last);
}

/**
 * Get arguments excluding the options object
 */
export function getArgs(args: any[]): any[] {
  const result = Array.from(args);
  if (hasOptions(args)) {
    result.pop();
  }
  return result;
}

/**
 * Get the options object from arguments
 */
export function getOptions(args: any[]): HandlebarsHelperOptions {
  const last = getLastArg(args);
  return isOptions(last) ? last : ({} as HandlebarsHelperOptions);
}

/**
 * Export handlebars utilities
 */
/**
 * Type checking utilities
 */
export function isUndefined(value: any): value is undefined {
  return value === undefined;
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

export function isObject(value: any): value is object {
  return value !== null && typeof value === 'object';
}

export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export const handlebarsUtils = {
  options,
  isOptions,
  isBlock,
  getLastArg,
  hasOptions,
  getArgs,
  getOptions,
  isUndefined,
  isString,
  isNumber,
  isArray,
  isObject,
  isFunction
}; 