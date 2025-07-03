// HTML helper functions

/**
 * Escape HTML entities
 */
export function escape(str: string): string {
  if (typeof str !== 'string') return '';
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
export function tag(tagName: string, content?: string, attributes?: Record<string, string>): string {
  if (typeof tagName !== 'string') return '';
  
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
export function link(href: string, text?: string, attributes?: Record<string, string>): string {
  const linkText = text || href;
  const attrs = { href, ...attributes };
  return tag('a', linkText, attrs);
}

/**
 * Create image tag
 */
export function img(src: string, alt?: string, attributes?: Record<string, string>): string {
  const attrs = { src, alt: alt || '', ...attributes };
  return tag('img', undefined, attrs);
} 