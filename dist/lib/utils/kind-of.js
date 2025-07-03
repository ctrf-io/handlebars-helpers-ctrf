/**
 * Get the native type of the given value
 */
export const kindOf = (value) => {
    if (value === null)
        return 'null';
    if (value === undefined)
        return 'undefined';
    const type = typeof value;
    if (type === 'object') {
        if (Array.isArray(value))
            return 'array';
        if (value instanceof Date)
            return 'date';
        if (value instanceof RegExp)
            return 'regexp';
        if (value instanceof Error)
            return 'error';
        if (value instanceof Map)
            return 'map';
        if (value instanceof Set)
            return 'set';
        return 'object';
    }
    return type;
};
export default kindOf;
//# sourceMappingURL=kind-of.js.map