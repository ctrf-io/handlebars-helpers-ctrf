import type { NumberHelperOptions } from '../types.js';
/**
 * Format number with locale
 */
export declare function formatNumber(num: number, options?: NumberHelperOptions): string;
/**
 * Convert number to percentage
 */
export declare function toPercent(num: number, precision?: number): string;
/**
 * Convert bytes to human readable format
 */
export declare function bytes(num: number, precision?: number): string;
/**
 * Format as currency
 */
export declare function currency(amount: number, currency?: string, locale?: string): string;
/**
 * Convert to ordinal (1st, 2nd, 3rd, etc.)
 */
export declare function ordinal(num: number): string;
/**
 * Add thousands separator
 */
export declare function addCommas(num: number): string;
/**
 * Abbreviate large numbers (1K, 1M, etc.)
 */
export declare function abbreviate(num: number, precision?: number): string;
//# sourceMappingURL=number.d.ts.map