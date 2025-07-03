// Logging helper functions

/**
 * Log a message
 */
export function log(message: string, level: 'debug' | 'info' | 'warn' | 'error' = 'info'): string {
  console.log(`[${level.toUpperCase()}] ${message}`);
  return '';
}

/**
 * Debug log
 */
export function debug(message: string): string {
  return log(message, 'debug');
}

/**
 * Info log
 */
export function info(message: string): string {
  return log(message, 'info');
}

/**
 * Warning log
 */
export function warn(message: string): string {
  return log(message, 'warn');
}

/**
 * Error log
 */
export function error(message: string): string {
  return log(message, 'error');
} 