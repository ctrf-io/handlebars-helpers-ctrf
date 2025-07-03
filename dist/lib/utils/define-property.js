/**
 * Define a property on an object
 */
export function defineProperty(object, key, value) {
    Object.defineProperty(object, key, {
        value,
        writable: true,
        enumerable: false,
        configurable: true
    });
}
//# sourceMappingURL=define-property.js.map