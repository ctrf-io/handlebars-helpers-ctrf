// Date helper functions
/**
 * Format a date using basic formatting
 */
export function formatDate(date, format) {
    const d = new Date(date);
    if (isNaN(d.getTime()))
        return '';
    // Basic date formatting - can be extended
    switch (format) {
        case 'short':
            return d.toLocaleDateString();
        case 'long':
            return d.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        case 'iso':
            return d.toISOString();
        default:
            return d.toString();
    }
}
/**
 * Get current date
 */
export function now() {
    return new Date();
}
/**
 * Get current timestamp
 */
export function timestamp() {
    return Date.now();
}
/**
 * Check if date is valid
 */
export function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime());
}
//# sourceMappingURL=date.js.map