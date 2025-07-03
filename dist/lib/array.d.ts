import type { HandlebarsHelperOptions, ArrayHelperOptions } from '../types.js';
/**
 * Returns all of the items in an array after the specified index.
 * Opposite of [before](#before).
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{after array 1}}
 * <!-- results in: '["c"]' -->
 * ```
 */
export declare function after(array: any[], n: number): any[] | string;
/**
 * Cast the given `value` to an array.
 *
 * ```handlebars
 * {{arrayify "foo"}}
 * <!-- results in: [ "foo" ] -->
 * ```
 */
export declare function arrayify(value: any): any[];
/**
 * Return all of the items in the collection before the specified
 * count. Opposite of [after](#after).
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{before array 2}}
 * <!-- results in: '["a", "b"]' -->
 * ```
 */
export declare function before(array: any[], n: number): any[] | string;
/**
 * ```handlebars
 * <!-- array: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] -->
 * {{#eachIndex array}}
 *   {{item}} is {{index}}
 * {{/eachIndex}}
 * ```
 */
export declare function eachIndex(array: any[], options: HandlebarsHelperOptions): string;
/**
 * Block helper that filters the given array and renders the block for values that
 * evaluate to `true`, otherwise the inverse block is returned.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{#filter array "foo"}}AAA{{else}}BBB{{/filter}}
 * <!-- results in: 'BBB' -->
 * ```
 */
export declare function filter(this: any, array: any[], value: any, options: ArrayHelperOptions): string;
/**
 * Returns the first item, or first `n` items of an array.
 *
 * ```handlebars
 * {{first "['a', 'b', 'c', 'd', 'e']" 2}}
 * <!-- results in: '["a", "b"]' -->
 * ```
 */
export declare function first(array: any[], n?: number): any | any[] | string;
/**
 * Iterates over each item in an array and exposes the current item
 * in the array as context to the inner block. In addition to
 * the current array item, the helper exposes the following variables
 * to the inner block:
 *
 * - `index`
 * - `total`
 * - `isFirst`
 * - `isLast`
 *
 * Also, `@index` is exposed as a private variable, and additional
 * private variables may be defined as hash arguments.
 *
 * ```handlebars
 * <!-- accounts = [
 *   {'name': 'John', 'email': 'john@example.com'},
 *   {'name': 'Malcolm', 'email': 'malcolm@example.com'},
 *   {'name': 'David', 'email': 'david@example.com'}
 * ] -->
 *
 * {{#forEach accounts}}
 *   <a href="mailto:{{ email }}" title="Send an email to {{ name }}">
 *     {{ name }}
 *   </a>{{#unless isLast}}, {{/unless}}
 * {{/forEach}}
 * ```
 */
export declare function forEach(array: any[], options: HandlebarsHelperOptions): string;
/**
 * Use the items in the array _after_ the specified index as context inside a block.
 * Opposite of [withBefore](#withBefore).
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c', 'd', 'e'] -->
 * {{#withAfter array 3}}
 *   {{this}}
 * {{/withAfter}}
 * <!-- results in: 'de' -->
 * ```
 */
export declare function withAfter(array: any[], idx: number, options: HandlebarsHelperOptions): string;
/**
 * Use the items in the array _before_ the specified index as context inside a block.
 * Opposite of [withAfter](#withAfter).
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c', 'd', 'e'] -->
 * {{#withBefore array 3}}
 *   {{this}}
 * {{/withBefore}}
 * <!-- results in: 'abc' -->
 * ```
 */
export declare function withBefore(array: any[], idx: number, options: HandlebarsHelperOptions): string;
/**
 * Use the first item in a collection inside a handlebars block expression.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{#withFirst array}}
 *   {{this}}
 * {{/withFirst}}
 * <!-- results in: 'a' -->
 * ```
 */
export declare function withFirst(array: any[], options: HandlebarsHelperOptions): string;
/**
 * Use the last item or `n` items in an array as context inside a block.
 * Opposite of [withFirst](#withFirst).
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{#withLast array}}
 *   {{this}}
 * {{/withLast}}
 * <!-- results in: 'c' -->
 * ```
 */
export declare function withLast(array: any[], n: number, options: HandlebarsHelperOptions): string;
/**
 * Join all elements of array into a string, optionally using a given separator.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{join array}}
 * <!-- results in: 'a, b, c' -->
 *
 * {{join array ' | '}}
 * <!-- results in: 'a | b | c' -->
 * ```
 */
export declare function join(array: any[], separator?: string): string;
/**
 * Returns the last item, or last `n` items of an array.
 * Opposite of [first](#first).
 *
 * ```handlebars
 * {{last "['a', 'b', 'c', 'd', 'e']" 2}}
 * <!-- results in: '["d", "e"]' -->
 * ```
 */
export declare function last(array: any[], n?: number): any | any[] | string;
/**
 * Returns the length of the given array.
 *
 * ```handlebars
 * {{length "['a', 'b', 'c']"}}
 * <!-- results in: 3 -->
 * ```
 */
export declare function length(array: any[]): number;
/**
 * Map over the given object or array or length, creating a new array from the results of the iterator function.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{#map array}}{{this}}{{/map}}
 * <!-- results in: 'abc' -->
 * ```
 */
export declare function map(array: any[], options: HandlebarsHelperOptions): string;
/**
 * Returns a new array with the given value added to the end.
 *
 * ```handlebars
 * <!-- array: ['a', 'b'] -->
 * {{#each (append array 'c')}}{{this}}{{/each}}
 * <!-- results in: 'abc' -->
 * ```
 */
export declare function append(array: any[], value: any): any[];
/**
 * Returns a new array with the given value added to the beginning.
 *
 * ```handlebars
 * <!-- array: ['b', 'c'] -->
 * {{#each (prepend array 'a')}}{{this}}{{/each}}
 * <!-- results in: 'abc' -->
 * ```
 */
export declare function prepend(array: any[], value: any): any[];
/**
 * Reverse the order of items in an array.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{#each (reverse array)}}{{this}}{{/each}}
 * <!-- results in: 'cba' -->
 * ```
 */
export declare function reverse(array: any[]): any[];
/**
 * Sort the items in an array.
 *
 * ```handlebars
 * <!-- array: ['b', 'a', 'c'] -->
 * {{#each (sort array)}}{{this}}{{/each}}
 * <!-- results in: 'abc' -->
 * ```
 */
export declare function sort(array: any[], prop?: string): any[];
/**
 * Returns true if the given value is in the array.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{inArray array 'b'}}
 * <!-- results in: true -->
 * ```
 */
export declare function inArray(array: any[], value: any): boolean;
/**
 * Returns true if the given arrays have the same items.
 *
 * ```handlebars
 * <!-- array1: ['a', 'b', 'c'] -->
 * <!-- array2: ['a', 'b', 'c'] -->
 * {{isEqual array1 array2}}
 * <!-- results in: true -->
 * ```
 */
export declare function isEqual(array1: any[], array2: any[]): boolean;
/**
 * Returns true if the given array is empty.
 *
 * ```handlebars
 * <!-- array: [] -->
 * {{isEmpty array}}
 * <!-- results in: true -->
 * ```
 */
export declare function isEmpty(array: any[]): boolean;
/**
 * Returns the sum of all numbers in the given array.
 *
 * ```handlebars
 * <!-- array: [1, 2, 3] -->
 * {{sum array}}
 * <!-- results in: 6 -->
 * ```
 */
export declare function sum(array: any[]): number;
/**
 * Returns the average of all numbers in the given array.
 *
 * ```handlebars
 * <!-- array: [1, 2, 3] -->
 * {{avg array}}
 * <!-- results in: 2 -->
 * ```
 */
export declare function avg(array: any[]): number;
/**
 * Get a random item from the given array.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{random array}}
 * <!-- results in: 'b' (or 'a' or 'c') -->
 * ```
 */
export declare function random(array: any[]): any;
/**
 * Shuffle the given array.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{#each (shuffle array)}}{{this}}{{/each}}
 * <!-- results in: 'bac' (or some other permutation) -->
 * ```
 */
export declare function shuffle(array: any[]): any[];
/**
 * Get a slice of the given array.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c', 'd', 'e'] -->
 * {{#each (slice array 1 3)}}{{this}}{{/each}}
 * <!-- results in: 'bc' -->
 * ```
 */
export declare function slice(array: any[], start: number, end?: number): any[];
/**
 * Remove duplicates from the given array.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'a', 'c', 'b'] -->
 * {{#each (unique array)}}{{this}}{{/each}}
 * <!-- results in: 'abc' -->
 * ```
 */
export declare function unique(array: any[]): any[];
/**
 * Flatten the given array.
 *
 * ```handlebars
 * <!-- array: [['a', 'b'], ['c', 'd']] -->
 * {{#each (flatten array)}}{{this}}{{/each}}
 * <!-- results in: 'abcd' -->
 * ```
 */
export declare function flatten(array: any[]): any[];
/**
 * Compact the given array (remove falsy values).
 *
 * ```handlebars
 * <!-- array: ['a', '', 'b', null, 'c'] -->
 * {{#each (compact array)}}{{this}}{{/each}}
 * <!-- results in: 'abc' -->
 * ```
 */
export declare function compact(array: any[]): any[];
//# sourceMappingURL=array.d.ts.map