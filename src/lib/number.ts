import type { NumberHelperOptions } from '../types.js';

/**
 * Format number with locale
 */
export function formatNumber(num: number, options?: NumberHelperOptions): string {
  const locale = options?.locale || 'en';
  const precision = options?.precision;
  
  const formatOptions: Intl.NumberFormatOptions = {};
  if (precision !== undefined) {
    formatOptions.minimumFractionDigits = precision;
    formatOptions.maximumFractionDigits = precision;
  }
  
  return new Intl.NumberFormat(locale, formatOptions).format(num || 0);
}

/**
 * Convert number to percentage
 */
export function toPercent(num: number, precision: number = 2): string {
  return ((num || 0) * 100).toFixed(precision) + '%';
}

/**
 * Convert bytes to human readable format
 */
export function bytes(num: number, precision: number = 2): string {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (num === 0) return '0 B';
  
  const i = Math.floor(Math.log(num) / Math.log(1024));
  const size = num / Math.pow(1024, i);
  
  return `${size.toFixed(precision)} ${sizes[i]}`;
}

/**
 * Format as currency
 */
export function currency(amount: number, currency: string = 'USD', locale: string = 'en'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount || 0);
}

/**
 * Convert to ordinal (1st, 2nd, 3rd, etc.)
 */
export function ordinal(num: number): string {
  const n = num || 0;
  const suffix = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
}

/**
 * Add thousands separator
 */
export function addCommas(num: number): string {
  return (num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Abbreviate large numbers (1K, 1M, etc.)
 */
export function abbreviate(num: number, precision: number = 1): string {
  const n = num || 0;
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const tier = Math.log10(Math.abs(n)) / 3 | 0;
  
  if (tier === 0) return n.toString();
  
  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = n / scale;
  
  return scaled.toFixed(precision) + suffix;
} 