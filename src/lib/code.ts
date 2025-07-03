import type { CodeHelperOptions } from '../types.js';

/**
 * Escape code for HTML output
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
 * Create a code block with optional language
 */
export function codeBlock(str: string, language?: string): string {
  if (typeof str !== 'string') return '';
  const lang = language ? ` class="language-${language}"` : '';
  return `<pre><code${lang}>${escape(str)}</code></pre>`;
}

/**
 * Create an inline code span
 */
export function code(str: string): string {
  if (typeof str !== 'string') return '';
  return `<code>${escape(str)}</code>`;
}

/**
 * Block helper for creating code blocks
 */
export function codeblock(this: any, str: string, language: string, options: CodeHelperOptions): string {
  if (typeof options === 'undefined') {
    options = language as any;
    language = '';
  }
  
  const lang = language ? ` class="language-${language}"` : '';
  return `<pre><code${lang}>${escape(str)}</code></pre>`;
} 