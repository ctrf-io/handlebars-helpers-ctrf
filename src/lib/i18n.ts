/**
 * Basic translation function
 */
export function t(key: string): string {
  // Basic implementation - would need actual i18n library
  return key;
}

/**
 * Get current locale
 */
export function locale(): string {
  return 'en';
}

/**
 * Format number for locale
 */
export function formatNumber(num: number, locale?: string): string {
  const l = locale || 'en';
  return new Intl.NumberFormat(l).format(num);
}

/**
 * Format currency for locale
 */
export function formatCurrency(amount: number, currency: string, locale?: string): string {
  const l = locale || 'en';
  return new Intl.NumberFormat(l, {
    style: 'currency',
    currency: currency || 'USD'
  }).format(amount);
} 