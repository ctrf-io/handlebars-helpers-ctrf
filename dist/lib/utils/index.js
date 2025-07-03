/**
 * Returns true if the given value contains the given
 * `object`, optionally passing a starting index.
 */
export function contains(val, obj, start) {
    if (val == null || obj == null || !isNumber(val.length)) {
        return false;
    }
    return val.indexOf(obj, start) !== -1;
}
/**
 * Remove leading and trailing whitespace and non-word
 * characters from the given string.
 */
export function chop(str) {
    if (!isString(str))
        return '';
    const re = /^[-_.\W\s]+|[-_.\W\s]+$/g;
    return str.trim().replace(re, '');
}
/**
 * Change casing on the given `string`, optionally
 * passing a delimiter to use between words in the
 * returned string.
 */
export function changecase(str, fn) {
    if (!isString(str))
        return '';
    if (str.length === 1) {
        return str.toLowerCase();
    }
    str = chop(str).toLowerCase();
    if (typeof fn !== 'function') {
        fn = identity;
    }
    const re = /[-_.\W\s]+(\w|$)/g;
    return str.replace(re, (_, ch) => {
        return fn(ch);
    });
}
/**
 * Generate a random number
 */
export function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
/**
 * Identity function
 */
export function identity(value) {
    return value;
}
/**
 * Type checking utilities
 */
export function isUndefined(value) {
    return value === undefined;
}
export function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}
export function isString(value) {
    return typeof value === 'string';
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
/**
 * Get a value from an object by path
 */
export function get(object, path) {
    if (!object || !path)
        return undefined;
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
export function createFrame(options, hash) {
    const frame = Object.create(options.data || {});
    if (hash) {
        Object.assign(frame, hash);
    }
    return frame;
}
/**
 * Export all utilities
 */
export const utils = {
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
//# sourceMappingURL=index.js.map