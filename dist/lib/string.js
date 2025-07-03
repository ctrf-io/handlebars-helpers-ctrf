// String helper functions
/**
 * Convert string to uppercase
 */
export function upper(str) {
    return typeof str === 'string' ? str.toUpperCase() : '';
}
/**
 * Convert string to lowercase
 */
export function lower(str) {
    return typeof str === 'string' ? str.toLowerCase() : '';
}
/**
 * Capitalize first letter
 */
export function capitalize(str) {
    if (typeof str !== 'string' || str.length === 0)
        return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
/**
 * Capitalize each word
 */
export function capitalizeWords(str) {
    if (typeof str !== 'string')
        return '';
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
/**
 * Truncate string
 */
export function truncate(str, length, suffix = '...') {
    if (typeof str !== 'string')
        return '';
    if (str.length <= length)
        return str;
    return str.substring(0, length) + suffix;
}
/**
 * Pad string to the left
 */
export function padLeft(str, length, char = ' ') {
    if (typeof str !== 'string')
        return '';
    return str.padStart(length, char);
}
/**
 * Pad string to the right
 */
export function padRight(str, length, char = ' ') {
    if (typeof str !== 'string')
        return '';
    return str.padEnd(length, char);
}
/**
 * Trim whitespace
 */
export function trim(str) {
    return typeof str === 'string' ? str.trim() : '';
}
/**
 * Trim left whitespace
 */
export function trimLeft(str) {
    return typeof str === 'string' ? str.trimStart() : '';
}
/**
 * Trim right whitespace
 */
export function trimRight(str) {
    return typeof str === 'string' ? str.trimEnd() : '';
}
/**
 * Replace substring
 */
export function replace(str, search, replacement) {
    if (typeof str !== 'string')
        return '';
    return str.replace(new RegExp(search, 'g'), replacement);
}
/**
 * Split string
 */
export function split(str, separator) {
    if (typeof str !== 'string')
        return [];
    return str.split(separator);
}
/**
 * Join array of strings
 */
export function join(arr, separator = '') {
    if (!Array.isArray(arr))
        return '';
    return arr.join(separator);
}
/**
 * Check if string starts with prefix
 */
export function startsWith(str, prefix) {
    if (typeof str !== 'string' || typeof prefix !== 'string')
        return false;
    return str.startsWith(prefix);
}
/**
 * Check if string ends with suffix
 */
export function endsWith(str, suffix) {
    if (typeof str !== 'string' || typeof suffix !== 'string')
        return false;
    return str.endsWith(suffix);
}
/**
 * Check if string contains substring
 */
export function contains(str, substring) {
    if (typeof str !== 'string' || typeof substring !== 'string')
        return false;
    return str.includes(substring);
}
/**
 * Get string length
 */
export function length(str) {
    return typeof str === 'string' ? str.length : 0;
}
/**
 * Repeat string
 */
export function repeat(str, count) {
    if (typeof str !== 'string')
        return '';
    return str.repeat(Math.max(0, count));
}
/**
 * Reverse string
 */
export function reverse(str) {
    if (typeof str !== 'string')
        return '';
    return str.split('').reverse().join('');
}
/**
 * Get substring
 */
export function substr(str, start, length) {
    if (typeof str !== 'string')
        return '';
    return str.substring(start, length !== undefined ? start + length : undefined);
}
/**
 * Convert to slug (URL-friendly string)
 */
export function slugify(str) {
    if (typeof str !== 'string')
        return '';
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
/**
 * Strip HTML tags
 */
export function stripTags(str) {
    if (typeof str !== 'string')
        return '';
    return str.replace(/<[^>]*>/g, '');
}
/**
 * Escape HTML entities
 */
export function escapeHtml(str) {
    if (typeof str !== 'string')
        return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
/**
 * Remove diacritics/accents
 */
export function removeDiacritics(str) {
    if (typeof str !== 'string')
        return '';
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
//# sourceMappingURL=string.js.map