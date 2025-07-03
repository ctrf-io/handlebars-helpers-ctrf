// Logging helper functions
/**
 * Log a message
 */
export function log(message, level = 'info') {
    console.log(`[${level.toUpperCase()}] ${message}`);
    return '';
}
/**
 * Debug log
 */
export function debug(message) {
    return log(message, 'debug');
}
/**
 * Info log
 */
export function info(message) {
    return log(message, 'info');
}
/**
 * Warning log
 */
export function warn(message) {
    return log(message, 'warn');
}
/**
 * Error log
 */
export function error(message) {
    return log(message, 'error');
}
//# sourceMappingURL=logging.js.map