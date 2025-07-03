/**
 * Parse URL components
 */
export declare function parseUrl(url: string): {
    protocol?: string;
    hostname?: string;
    port?: string;
    pathname?: string;
    search?: string;
    hash?: string;
};
/**
 * Get domain from URL
 */
export declare function domain(url: string): string;
/**
 * Get protocol from URL
 */
export declare function protocol(url: string): string;
/**
 * Get path from URL
 */
export declare function pathname(url: string): string;
/**
 * Get query string from URL
 */
export declare function query(url: string): string;
/**
 * Get hash from URL
 */
export declare function hash(url: string): string;
/**
 * Encode URL component
 */
export declare function encode(str: string): string;
/**
 * Decode URL component
 */
export declare function decode(str: string): string;
/**
 * Join URL segments
 */
export declare function join(...segments: string[]): string;
/**
 * Strip WWW from URL
 */
export declare function stripWWW(url: string): string;
/**
 * Add protocol to URL if missing
 */
export declare function addProtocol(url: string, protocol?: string): string;
/**
 * Check if URL is absolute
 */
export declare function isAbsolute(url: string): boolean;
/**
 * Get base URL (protocol + hostname + port)
 */
export declare function base(url: string): string;
//# sourceMappingURL=url.d.ts.map