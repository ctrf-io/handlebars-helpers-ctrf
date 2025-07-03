import type { HandlebarsHelperOptions } from '../../types.js';
/**
 * Get options object from helper arguments
 */
export declare function options(_context: any, locals?: any, options?: HandlebarsHelperOptions): HandlebarsHelperOptions;
/**
 * Check if value is a valid handlebars options object
 */
export declare function isOptions(value: any): value is HandlebarsHelperOptions;
/**
 * Check if helper is a block helper
 */
export declare function isBlock(options: HandlebarsHelperOptions): boolean;
/**
 * Get the last argument (typically the options object)
 */
export declare function getLastArg(args: any[]): any;
/**
 * Check if the last argument is an options object
 */
export declare function hasOptions(args: any[]): boolean;
/**
 * Get arguments excluding the options object
 */
export declare function getArgs(args: any[]): any[];
/**
 * Get the options object from arguments
 */
export declare function getOptions(args: any[]): HandlebarsHelperOptions;
/**
 * Export handlebars utilities
 */
/**
 * Type checking utilities
 */
export declare function isUndefined(value: any): value is undefined;
export declare function isString(value: any): value is string;
export declare function isNumber(value: any): value is number;
export declare function isArray(value: any): value is any[];
export declare function isObject(value: any): value is object;
export declare function isFunction(value: any): value is Function;
export declare const handlebarsUtils: {
    options: typeof options;
    isOptions: typeof isOptions;
    isBlock: typeof isBlock;
    getLastArg: typeof getLastArg;
    hasOptions: typeof hasOptions;
    getArgs: typeof getArgs;
    getOptions: typeof getOptions;
    isUndefined: typeof isUndefined;
    isString: typeof isString;
    isNumber: typeof isNumber;
    isArray: typeof isArray;
    isObject: typeof isObject;
    isFunction: typeof isFunction;
};
//# sourceMappingURL=handlebars-utils.d.ts.map