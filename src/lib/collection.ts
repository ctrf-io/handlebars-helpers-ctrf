import type { HandlebarsHelperOptions } from '../types.js';
import { isUndefined, get } from './utils/index.js';

/**
 * Get the length of a collection
 */
export function length(collection: any): number {
  if (isUndefined(collection)) return 0;
  if (Array.isArray(collection)) return collection.length;
  if (typeof collection === 'object' && collection !== null) {
    return Object.keys(collection).length;
  }
  return 0;
}

/**
 * Check if collection is empty
 */
export function isEmpty(collection: any): boolean {
  return length(collection) === 0;
}

/**
 * Get first item from collection
 */
export function first(collection: any): any {
  if (isUndefined(collection)) return undefined;
  if (Array.isArray(collection)) return collection[0];
  if (typeof collection === 'object' && collection !== null) {
    const keys = Object.keys(collection);
    return keys.length > 0 ? collection[keys[0]] : undefined;
  }
  return undefined;
}

/**
 * Get last item from collection
 */
export function last(collection: any): any {
  if (isUndefined(collection)) return undefined;
  if (Array.isArray(collection)) return collection[collection.length - 1];
  if (typeof collection === 'object' && collection !== null) {
    const keys = Object.keys(collection);
    return keys.length > 0 ? collection[keys[keys.length - 1]] : undefined;
  }
  return undefined;
}

/**
 * Block helper to iterate over collection
 */
export function each(this: any, collection: any, options: HandlebarsHelperOptions): string {
  if (isUndefined(collection)) return '';
  
  let result = '';
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      result += options.fn(collection[i]);
    }
  } else if (typeof collection === 'object' && collection !== null) {
    const keys = Object.keys(collection);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      result += options.fn(collection[key]);
    }
  }
  
  return result;
}

/**
 * Sort collection by property
 */
export function sortBy(collection: any, prop: string): any[] {
  if (isUndefined(collection)) return [];
  if (!Array.isArray(collection)) return [];
  
  return [...collection].sort((a, b) => {
    const aVal = get(a, prop);
    const bVal = get(b, prop);
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
  });
}

/**
 * Group collection by property
 */
export function groupBy(collection: any, prop: string): Record<string, any[]> {
  if (isUndefined(collection) || !Array.isArray(collection)) return {};
  
  return collection.reduce((groups, item) => {
    const key = get(item, prop);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, any[]>);
} 