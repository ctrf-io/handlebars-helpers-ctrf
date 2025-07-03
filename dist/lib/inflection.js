// Inflection helper functions
/**
 * Simple pluralization
 */
export function pluralize(word, count = 2) {
    if (typeof word !== 'string')
        return '';
    if (count === 1)
        return word;
    // Simple English pluralization rules
    if (word.endsWith('y')) {
        return word.slice(0, -1) + 'ies';
    }
    if (word.endsWith('s') || word.endsWith('sh') || word.endsWith('ch') || word.endsWith('x') || word.endsWith('z')) {
        return word + 'es';
    }
    return word + 's';
}
/**
 * Simple singularization
 */
export function singularize(word) {
    if (typeof word !== 'string')
        return '';
    // Simple English singularization rules
    if (word.endsWith('ies')) {
        return word.slice(0, -3) + 'y';
    }
    if (word.endsWith('es')) {
        return word.slice(0, -2);
    }
    if (word.endsWith('s') && word.length > 1) {
        return word.slice(0, -1);
    }
    return word;
}
/**
 * Convert to camelCase
 */
export function camelCase(str) {
    if (typeof str !== 'string')
        return '';
    return str.replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '');
}
/**
 * Convert to PascalCase
 */
export function pascalCase(str) {
    const camel = camelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
}
/**
 * Convert to snake_case
 */
export function snakeCase(str) {
    if (typeof str !== 'string')
        return '';
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).replace(/[-\s]+/g, '_');
}
/**
 * Convert to kebab-case
 */
export function kebabCase(str) {
    if (typeof str !== 'string')
        return '';
    return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/[_\s]+/g, '-');
}
//# sourceMappingURL=inflection.js.map