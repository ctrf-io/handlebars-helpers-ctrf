/**
 * Test if string matches regex
 */
export declare function test(str: string, pattern: string | RegExp, flags?: string): boolean;
/**
 * Replace using regex
 */
export declare function replace(str: string, pattern: string | RegExp, replacement: string, flags?: string): string;
/**
 * Match string against regex
 */
export declare function regexMatch(str: string, pattern: string | RegExp, flags?: string): string[] | null;
/**
 * Extract matches from string
 */
export declare function extract(str: string, pattern: string | RegExp, flags?: string): string[];
/**
 * Split string by regex
 */
export declare function split(str: string, pattern: string | RegExp, flags?: string): string[];
/**
 * Find all matches in string
 */
export declare function findAll(str: string, pattern: string | RegExp, flags?: string): string[];
/**
 * Escape special regex characters
 */
export declare function escape(str: string): string;
//# sourceMappingURL=regex.d.ts.map