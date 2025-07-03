import type { HandlebarsHelperOptions, FrameData, UtilsInterface } from '../../types.js';

/**
 * Returns true if the given value contains the given
 * `object`, optionally passing a starting index.
 */
export function contains(val: any, obj: any, start?: number): boolean {
  if (val == null || obj == null || !isNumber(val.length)) {
    return false;
  }
  return val.indexOf(obj, start) !== -1;
}

/**
 * Remove leading and trailing whitespace and non-word
 * characters from the given string.
 */
export function chop(str: string): string {
  if (!isString(str)) return '';
  const re = /^[-_.\W\s]+|[-_.\W\s]+$/g;
  return str.trim().replace(re, '');
}

/**
 * Change casing on the given `string`, optionally
 * passing a delimiter to use between words in the
 * returned string.
 */
export function changecase(str: string, fn?: (ch: string) => string): string {
  if (!isString(str)) return '';
  if (str.length === 1) {
    return str.toLowerCase();
  }

  str = chop(str).toLowerCase();
  if (typeof fn !== 'function') {
    fn = identity;
  }

  const re = /[-_.\W\s]+(\w|$)/g;
  return str.replace(re, (_, ch) => {
    return fn!(ch);
  });
}

/**
 * Generate a random number
 */
export function random(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * Identity function
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * Type checking utilities
 */
export function isUndefined(value: any): value is undefined {
  return value === undefined;
}

export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isString(value: any): value is string {
  return typeof value === 'string';
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

/**
 * Get a value from an object by path
 */
export function get(object: any, path: string): any {
  if (!object || !path) return undefined;
  
  const keys = path.split('.');
  let result = object;
  
  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return undefined;
    }
    result = result[key];
  }
  
  return result;
}

/**
 * Create a frame for handlebars context
 */
export function createFrame(options: HandlebarsHelperOptions, hash?: Record<string, any>): FrameData {
  const frame: FrameData = Object.create(options.data || {});
  
  if (hash) {
    Object.assign(frame, hash);
  }
  
  return frame;
}

/**
 * Export all utilities
 */
export const utils: UtilsInterface = {
  isUndefined,
  isNumber,
  isString,
  isArray,
  isObject,
  isFunction,
  get,
  createFrame,
  contains,
  chop,
  changecase,
  random,
  identity
}; 