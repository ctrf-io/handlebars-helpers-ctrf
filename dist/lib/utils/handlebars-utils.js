/**
 * Get options object from helper arguments
 */
export function options(_context, locals, options) {
    if (arguments.length === 2 && isObject(locals)) {
        options = locals;
        locals = undefined;
    }
    options = options || {};
    if (locals && options.hash) {
        options.hash = { ...options.hash, ...locals };
    }
    return options;
}
/**
 * Check if value is a valid handlebars options object
 */
export function isOptions(value) {
    return isObject(value) &&
        typeof value.fn === 'function' &&
        typeof value.inverse === 'function';
}
/**
 * Check if helper is a block helper
 */
export function isBlock(options) {
    return typeof options.fn === 'function';
}
/**
 * Get the last argument (typically the options object)
 */
export function getLastArg(args) {
    return args[args.length - 1];
}
/**
 * Check if the last argument is an options object
 */
export function hasOptions(args) {
    const last = getLastArg(args);
    return isOptions(last);
}
/**
 * Get arguments excluding the options object
 */
export function getArgs(args) {
    const result = Array.from(args);
    if (hasOptions(args)) {
        result.pop();
    }
    return result;
}
/**
 * Get the options object from arguments
 */
export function getOptions(args) {
    const last = getLastArg(args);
    return isOptions(last) ? last : {};
}
/**
 * Export handlebars utilities
 */
/**
 * Type checking utilities
 */
export function isUndefined(value) {
    return value === undefined;
}
export function isString(value) {
    return typeof value === 'string';
}
export function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}
export function isArray(value) {
    return Array.isArray(value);
}
export function isObject(value) {
    return value !== null && typeof value === 'object';
}
export function isFunction(value) {
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
//# sourceMappingURL=handlebars-utils.js.map