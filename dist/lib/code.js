/**
 * Escape code for HTML output
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
 * Create a code block with optional language
 */
export function codeBlock(str, language) {
    if (typeof str !== 'string')
        return '';
    const lang = language ? ` class="language-${language}"` : '';
    return `<pre><code${lang}>${escape(str)}</code></pre>`;
}
/**
 * Create an inline code span
 */
export function code(str) {
    if (typeof str !== 'string')
        return '';
    return `<code>${escape(str)}</code>`;
}
/**
 * Block helper for creating code blocks
 */
export function codeblock(str, language, options) {
    if (typeof options === 'undefined') {
        options = language;
        language = '';
    }
    const lang = language ? ` class="language-${language}"` : '';
    return `<pre><code${lang}>${escape(str)}</code></pre>`;
}
//# sourceMappingURL=code.js.map