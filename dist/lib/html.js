// HTML helper functions
/**
 * Escape HTML entities
 */
export function escape(str) {
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
 * Create HTML tag
 */
export function tag(tagName, content, attributes) {
    if (typeof tagName !== 'string')
        return '';
    let attrs = '';
    if (attributes) {
        attrs = Object.entries(attributes)
            .map(([key, value]) => ` ${key}="${escape(value)}"`)
            .join('');
    }
    if (content === undefined) {
        return `<${tagName}${attrs}>`;
    }
    return `<${tagName}${attrs}>${content}</${tagName}>`;
}
/**
 * Create link tag
 */
export function link(href, text, attributes) {
    const linkText = text || href;
    const attrs = { href, ...attributes };
    return tag('a', linkText, attrs);
}
/**
 * Create image tag
 */
export function img(src, alt, attributes) {
    const attrs = { src, alt: alt || '', ...attributes };
    return tag('img', undefined, attrs);
}
//# sourceMappingURL=html.js.map