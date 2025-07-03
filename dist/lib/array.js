import { get, isUndefined, isNumber, createFrame } from './utils/index.js';
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
export function after(array, n) {
    if (isUndefined(array))
        return '';
    return array.slice(n);
}
/**
 * Cast the given `value` to an array.
 *
 * ```handlebars
 * {{arrayify "foo"}}
 * <!-- results in: [ "foo" ] -->
 * ```
 */
export function arrayify(value) {
    return value ? (Array.isArray(value) ? value : [value]) : [];
}
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
export function before(array, n) {
    if (isUndefined(array))
        return '';
    return array.slice(0, -n);
}
/**
 * ```handlebars
 * <!-- array: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] -->
 * {{#eachIndex array}}
 *   {{item}} is {{index}}
 * {{/eachIndex}}
 * ```
 */
export function eachIndex(array, options) {
    let result = '';
    for (let i = 0; i < array.length; i++) {
        result += options.fn({ item: array[i], index: i });
    }
    return result;
}
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
export function filter(array, value, options) {
    let content = '';
    let results = [];
    // filter on a specific property
    const prop = options.hash && (options.hash.property || options.hash.prop);
    if (prop) {
        results = array.filter((val) => {
            return value === get(val, prop);
        });
    }
    else {
        // filter on a string value
        results = array.filter((v) => {
            return value === v;
        });
    }
    if (results && results.length > 0) {
        for (let i = 0; i < results.length; i++) {
            content += options.fn(results[i]);
        }
        return content;
    }
    return options.inverse(this);
}
/**
 * Returns the first item, or first `n` items of an array.
 *
 * ```handlebars
 * {{first "['a', 'b', 'c', 'd', 'e']" 2}}
 * <!-- results in: '["a", "b"]' -->
 * ```
 */
export function first(array, n) {
    if (isUndefined(array))
        return '';
    if (!isNumber(n)) {
        return array[0];
    }
    return array.slice(0, n);
}
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
export function forEach(array, options) {
    const data = createFrame(options, options.hash);
    const len = array.length;
    let buffer = '';
    let i = -1;
    while (++i < len) {
        const item = array[i];
        data.index = i;
        item.index = i + 1;
        item.total = len;
        item.isFirst = i === 0;
        item.isLast = i === (len - 1);
        buffer += options.fn(item);
    }
    return buffer;
}
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
export function withAfter(array, idx, options) {
    if (isUndefined(array))
        return '';
    const result = array.slice(idx);
    return options.fn(result);
}
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
export function withBefore(array, idx, options) {
    if (isUndefined(array))
        return '';
    const result = array.slice(0, idx);
    return options.fn(result);
}
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
export function withFirst(array, options) {
    if (isUndefined(array) || array.length === 0)
        return '';
    return options.fn(array[0]);
}
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
export function withLast(array, n, options) {
    if (isUndefined(array))
        return '';
    if (arguments.length === 2) {
        options = n;
        n = 1;
    }
    const result = array.slice(-n);
    return options.fn(result.length === 1 ? result[0] : result);
}
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
export function join(array, separator) {
    if (isUndefined(array))
        return '';
    return array.join(separator || ', ');
}
/**
 * Returns the last item, or last `n` items of an array.
 * Opposite of [first](#first).
 *
 * ```handlebars
 * {{last "['a', 'b', 'c', 'd', 'e']" 2}}
 * <!-- results in: '["d", "e"]' -->
 * ```
 */
export function last(array, n) {
    if (isUndefined(array))
        return '';
    if (!isNumber(n)) {
        return array[array.length - 1];
    }
    return array.slice(-n);
}
/**
 * Returns the length of the given array.
 *
 * ```handlebars
 * {{length "['a', 'b', 'c']"}}
 * <!-- results in: 3 -->
 * ```
 */
export function length(array) {
    if (isUndefined(array))
        return 0;
    return array.length;
}
/**
 * Map over the given object or array or length, creating a new array from the results of the iterator function.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{#map array}}{{this}}{{/map}}
 * <!-- results in: 'abc' -->
 * ```
 */
export function map(array, options) {
    if (isUndefined(array))
        return '';
    let result = '';
    for (let i = 0; i < array.length; i++) {
        result += options.fn(array[i]);
    }
    return result;
}
/**
 * Returns a new array with the given value added to the end.
 *
 * ```handlebars
 * <!-- array: ['a', 'b'] -->
 * {{#each (append array 'c')}}{{this}}{{/each}}
 * <!-- results in: 'abc' -->
 * ```
 */
export function append(array, value) {
    if (isUndefined(array))
        return [value];
    return [...array, value];
}
/**
 * Returns a new array with the given value added to the beginning.
 *
 * ```handlebars
 * <!-- array: ['b', 'c'] -->
 * {{#each (prepend array 'a')}}{{this}}{{/each}}
 * <!-- results in: 'abc' -->
 * ```
 */
export function prepend(array, value) {
    if (isUndefined(array))
        return [value];
    return [value, ...array];
}
/**
 * Reverse the order of items in an array.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{#each (reverse array)}}{{this}}{{/each}}
 * <!-- results in: 'cba' -->
 * ```
 */
export function reverse(array) {
    if (isUndefined(array))
        return [];
    return [...array].reverse();
}
/**
 * Sort the items in an array.
 *
 * ```handlebars
 * <!-- array: ['b', 'a', 'c'] -->
 * {{#each (sort array)}}{{this}}{{/each}}
 * <!-- results in: 'abc' -->
 * ```
 */
export function sort(array, prop) {
    if (isUndefined(array))
        return [];
    if (prop) {
        return [...array].sort((a, b) => {
            const aVal = get(a, prop);
            const bVal = get(b, prop);
            if (aVal < bVal)
                return -1;
            if (aVal > bVal)
                return 1;
            return 0;
        });
    }
    return [...array].sort();
}
/**
 * Returns true if the given value is in the array.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{inArray array 'b'}}
 * <!-- results in: true -->
 * ```
 */
export function inArray(array, value) {
    if (isUndefined(array))
        return false;
    return array.includes(value);
}
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
export function isEqual(array1, array2) {
    if (isUndefined(array1) || isUndefined(array2))
        return false;
    if (array1.length !== array2.length)
        return false;
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i])
            return false;
    }
    return true;
}
/**
 * Returns true if the given array is empty.
 *
 * ```handlebars
 * <!-- array: [] -->
 * {{isEmpty array}}
 * <!-- results in: true -->
 * ```
 */
export function isEmpty(array) {
    return isUndefined(array) || array.length === 0;
}
/**
 * Returns the sum of all numbers in the given array.
 *
 * ```handlebars
 * <!-- array: [1, 2, 3] -->
 * {{sum array}}
 * <!-- results in: 6 -->
 * ```
 */
export function sum(array) {
    if (isUndefined(array))
        return 0;
    return array.reduce((acc, val) => acc + (isNumber(val) ? val : 0), 0);
}
/**
 * Returns the average of all numbers in the given array.
 *
 * ```handlebars
 * <!-- array: [1, 2, 3] -->
 * {{avg array}}
 * <!-- results in: 2 -->
 * ```
 */
export function avg(array) {
    if (isUndefined(array) || array.length === 0)
        return 0;
    return sum(array) / array.length;
}
/**
 * Get a random item from the given array.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{random array}}
 * <!-- results in: 'b' (or 'a' or 'c') -->
 * ```
 */
export function random(array) {
    if (isUndefined(array) || array.length === 0)
        return '';
    return array[Math.floor(Math.random() * array.length)];
}
/**
 * Shuffle the given array.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{#each (shuffle array)}}{{this}}{{/each}}
 * <!-- results in: 'bac' (or some other permutation) -->
 * ```
 */
export function shuffle(array) {
    if (isUndefined(array))
        return [];
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}
/**
 * Get a slice of the given array.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c', 'd', 'e'] -->
 * {{#each (slice array 1 3)}}{{this}}{{/each}}
 * <!-- results in: 'bc' -->
 * ```
 */
export function slice(array, start, end) {
    if (isUndefined(array))
        return [];
    return array.slice(start, end);
}
/**
 * Remove duplicates from the given array.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'a', 'c', 'b'] -->
 * {{#each (unique array)}}{{this}}{{/each}}
 * <!-- results in: 'abc' -->
 * ```
 */
export function unique(array) {
    if (isUndefined(array))
        return [];
    return [...new Set(array)];
}
/**
 * Flatten the given array.
 *
 * ```handlebars
 * <!-- array: [['a', 'b'], ['c', 'd']] -->
 * {{#each (flatten array)}}{{this}}{{/each}}
 * <!-- results in: 'abcd' -->
 * ```
 */
export function flatten(array) {
    if (isUndefined(array))
        return [];
    return array.flat();
}
/**
 * Compact the given array (remove falsy values).
 *
 * ```handlebars
 * <!-- array: ['a', '', 'b', null, 'c'] -->
 * {{#each (compact array)}}{{this}}{{/each}}
 * <!-- results in: 'abc' -->
 * ```
 */
export function compact(array) {
    if (isUndefined(array))
        return [];
    return array.filter(Boolean);
}
//# sourceMappingURL=array.js.map