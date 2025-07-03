/**
 * Basic translation function
 */
export function t(key) {
    // Basic implementation - would need actual i18n library
    return key;
}
/**
 * Get current locale
 */
export function locale() {
    return 'en';
}
/**
 * Format number for locale
 */
export function formatNumber(num, locale) {
    const l = locale || 'en';
    return new Intl.NumberFormat(l).format(num);
}
/**
 * Format currency for locale
 */
export function formatCurrency(amount, currency, locale) {
    const l = locale || 'en';
    return new Intl.NumberFormat(l, {
        style: 'currency',
        currency: currency || 'USD'
    }).format(amount);
}
//# sourceMappingURL=i18n.js.map