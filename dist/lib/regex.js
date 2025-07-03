/**
 * Test if string matches regex
 */
export function test(str, pattern, flags) {
    if (typeof str !== 'string')
        return false;
    const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern;
    return regex.test(str);
}
/**
 * Replace using regex
 */
export function replace(str, pattern, replacement, flags) {
    if (typeof str !== 'string')
        return '';
    const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern;
    return str.replace(regex, replacement);
}
/**
 * Match string against regex
 */
export function regexMatch(str, pattern, flags) {
    if (typeof str !== 'string')
        return null;
    const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern;
    return str.match(regex);
}
/**
 * Extract matches from string
 */
export function extract(str, pattern, flags) {
    if (typeof str !== 'string')
        return [];
    const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern;
    const matches = str.match(regex);
    return matches ? Array.from(matches) : [];
}
/**
 * Split string by regex
 */
export function split(str, pattern, flags) {
    if (typeof str !== 'string')
        return [];
    const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern;
    return str.split(regex);
}
/**
 * Find all matches in string
 */
export function findAll(str, pattern, flags) {
    if (typeof str !== 'string')
        return [];
    const regex = typeof pattern === 'string' ? new RegExp(pattern, flags || 'g') : pattern;
    const matches = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
        matches.push(match[0]);
        if (!regex.global)
            break;
    }
    return matches;
}
/**
 * Escape special regex characters
 */
export function escape(str) {
    if (typeof str !== 'string')
        return '';
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
//# sourceMappingURL=regex.js.map