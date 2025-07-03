/**
 * Join path segments
 */
export declare function join(...segments: string[]): string;
/**
 * Get directory name
 */
export declare function dirname(path: string): string;
/**
 * Get base name
 */
export declare function basename(path: string, ext?: string): string;
/**
 * Get file extension
 */
export declare function extname(path: string): string;
/**
 * Resolve path
 */
export declare function resolve(...paths: string[]): string;
/**
 * Check if path is absolute
 */
export declare function isAbsolute(path: string): boolean;
/**
 * Get relative path
 */
export declare function relative(from: string, to: string): string;
/**
 * Normalize path
 */
export declare function normalize(path: string): string;
//# sourceMappingURL=path.d.ts.map