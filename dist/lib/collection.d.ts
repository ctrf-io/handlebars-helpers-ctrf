import type { HandlebarsHelperOptions } from '../types.js';
/**
 * Get the length of a collection
 */
export declare function length(collection: any): number;
/**
 * Check if collection is empty
 */
export declare function isEmpty(collection: any): boolean;
/**
 * Get first item from collection
 */
export declare function first(collection: any): any;
/**
 * Get last item from collection
 */
export declare function last(collection: any): any;
/**
 * Block helper to iterate over collection
 */
export declare function each(this: any, collection: any, options: HandlebarsHelperOptions): string;
/**
 * Sort collection by property
 */
export declare function sortBy(collection: any, prop: string): any[];
/**
 * Group collection by property
 */
export declare function groupBy(collection: any, prop: string): Record<string, any[]>;
//# sourceMappingURL=collection.d.ts.map