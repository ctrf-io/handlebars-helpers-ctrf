/**
 * Convert markdown to HTML (basic implementation)
 */
export function markdown(str) {
    if (typeof str !== 'string')
        return '';
    // Basic markdown conversion - would use marked library in real implementation
    return str
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
}
/**
 * Strip markdown formatting
 */
export function stripMarkdown(str) {
    if (typeof str !== 'string')
        return '';
    return str
        .replace(/^#+\s*/gm, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/`(.*?)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}
/**
 * Create markdown link
 */
export function mdLink(text, url) {
    return `[${text}](${url})`;
}
/**
 * Create markdown image
 */
export function mdImage(alt, src) {
    return `![${alt}](${src})`;
}
//# sourceMappingURL=markdown.js.map