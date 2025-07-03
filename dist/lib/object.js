// Object helper functions
import { get } from './utils/index.js';
/**
 * Get object keys
 */
export function keys(obj) {
    if (typeof obj !== 'object' || obj === null)
        return [];
    return Object.keys(obj);
}
/**
 * Get object values
 */
export function values(obj) {
    if (typeof obj !== 'object' || obj === null)
        return [];
    return Object.values(obj);
}
/**
 * Get object entries
 */
export function entries(obj) {
    if (typeof obj !== 'object' || obj === null)
        return [];
    return Object.entries(obj);
}
/**
 * Get property from object
 */
export function property(obj, path) {
    return get(obj, path);
}
/**
 * Check if object has property
 */
export function hasProperty(obj, path) {
    return get(obj, path) !== undefined;
}
/**
 * Extend object with another object
 */
export function extend(target, source) {
    return { ...target, ...source };
}
/**
 * Pick properties from object
 */
export function pick(obj, ...props) {
    const result = {};
    for (const prop of props) {
        if (obj && Object.prototype.hasOwnProperty.call(obj, prop)) {
            result[prop] = obj[prop];
        }
    }
    return result;
}
/**
 * Omit properties from object
 */
export function omit(obj, ...props) {
    const result = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && !props.includes(key)) {
            result[key] = obj[key];
        }
    }
    return result;
}
/**
 * Get object length
 */
export function length(obj) {
    if (typeof obj !== 'object' || obj === null)
        return 0;
    return Object.keys(obj).length;
}
/**
 * Check if object is empty
 */
export function isEmpty(obj) {
    return length(obj) === 0;
}
//# sourceMappingURL=object.js.map