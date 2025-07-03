import type { HandlebarsHelperOptions, FrameData, UtilsInterface } from '../../types.js';
/**
 * Returns true if the given value contains the given
 * `object`, optionally passing a starting index.
 */
export declare function contains(val: any, obj: any, start?: number): boolean;
/**
 * Remove leading and trailing whitespace and non-word
 * characters from the given string.
 */
export declare function chop(str: string): string;
/**
 * Change casing on the given `string`, optionally
 * passing a delimiter to use between words in the
 * returned string.
 */
export declare function changecase(str: string, fn?: (ch: string) => string): string;
/**
 * Generate a random number
 */
export declare function random(min: number, max: number): number;
/**
 * Identity function
 */
export declare function identity<T>(value: T): T;
/**
 * Type checking utilities
 */
export declare function isUndefined(value: any): value is undefined;
export declare function isNumber(value: any): value is number;
export declare function isString(value: any): value is string;
export declare function isArray(value: any): value is any[];
export declare function isObject(value: any): value is object;
export declare function isFunction(value: any): value is Function;
/**
 * Get a value from an object by path
 */
export declare function get(object: any, path: string): any;
/**
 * Create a frame for handlebars context
 */
export declare function createFrame(options: HandlebarsHelperOptions, hash?: Record<string, any>): FrameData;
/**
 * Export all utilities
 */
export declare const utils: UtilsInterface;
//# sourceMappingURL=index.d.ts.map