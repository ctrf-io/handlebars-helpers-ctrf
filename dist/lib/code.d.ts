import type { CodeHelperOptions } from '../types.js';
/**
 * Escape code for HTML output
 */
export declare function escape(str: string): string;
/**
 * Create a code block with optional language
 */
export declare function codeBlock(str: string, language?: string): string;
/**
 * Create an inline code span
 */
export declare function code(str: string): string;
/**
 * Block helper for creating code blocks
 */
export declare function codeblock(this: any, str: string, language: string, options: CodeHelperOptions): string;
//# sourceMappingURL=code.d.ts.map