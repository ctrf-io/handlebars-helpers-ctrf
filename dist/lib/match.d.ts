import type { HandlebarsHelperOptions, MatchHelperOptions } from '../types.js';
/**
 * Test if string matches pattern
 */
export declare function match(str: string, pattern: string | RegExp, options?: MatchHelperOptions): boolean;
/**
 * Test if string contains substring
 */
export declare function contains(str: string, substring: string, options?: MatchHelperOptions): boolean;
/**
 * Test if string starts with prefix
 */
export declare function startsWith(str: string, prefix: string, options?: MatchHelperOptions): boolean;
/**
 * Test if string ends with suffix
 */
export declare function endsWith(str: string, suffix: string, options?: MatchHelperOptions): boolean;
/**
 * Block helper for conditional matching
 */
export declare function ifMatch(this: any, str: string, pattern: string | RegExp, options: HandlebarsHelperOptions): string;
//# sourceMappingURL=match.d.ts.map