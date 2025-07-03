import type { HandlebarsHelperOptions, MatchHelperOptions } from '../types.js';

/**
 * Test if string matches pattern
 */
export function match(str: string, pattern: string | RegExp, options?: MatchHelperOptions): boolean {
  if (typeof str !== 'string') return false;
  
  if (typeof pattern === 'string') {
    const flags = options?.ignoreCase ? 'i' : '';
    const regex = new RegExp(pattern, flags);
    return regex.test(str);
  }
  
  return pattern.test(str);
}

/**
 * Test if string contains substring
 */
export function contains(str: string, substring: string, options?: MatchHelperOptions): boolean {
  if (typeof str !== 'string' || typeof substring !== 'string') return false;
  
  if (options?.ignoreCase) {
    return str.toLowerCase().includes(substring.toLowerCase());
  }
  
  return str.includes(substring);
}

/**
 * Test if string starts with prefix
 */
export function startsWith(str: string, prefix: string, options?: MatchHelperOptions): boolean {
  if (typeof str !== 'string' || typeof prefix !== 'string') return false;
  
  if (options?.ignoreCase) {
    return str.toLowerCase().startsWith(prefix.toLowerCase());
  }
  
  return str.startsWith(prefix);
}

/**
 * Test if string ends with suffix
 */
export function endsWith(str: string, suffix: string, options?: MatchHelperOptions): boolean {
  if (typeof str !== 'string' || typeof suffix !== 'string') return false;
  
  if (options?.ignoreCase) {
    return str.toLowerCase().endsWith(suffix.toLowerCase());
  }
  
  return str.endsWith(suffix);
}

/**
 * Block helper for conditional matching
 */
export function ifMatch(this: any, str: string, pattern: string | RegExp, options: HandlebarsHelperOptions): string {
  if (match(str, pattern)) {
    return options.fn(this);
  }
  return options.inverse(this);
} 