/**
 * Iterate over an object's properties
 */
export function forIn(object, fn) {
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            fn(object[key], key);
        }
    }
}
//# sourceMappingURL=for-in.js.map