// File system helper functions

/**
 * Get file extension
 */
export function extname(filepath: string): string {
  if (typeof filepath !== 'string') return '';
  const lastDot = filepath.lastIndexOf('.');
  return lastDot > 0 ? filepath.substring(lastDot) : '';
}

/**
 * Get basename of file
 */
export function basename(filepath: string): string {
  if (typeof filepath !== 'string') return '';
  return filepath.split(/[\\/]/).pop() || '';
}

/**
 * Get dirname of file
 */
export function dirname(filepath: string): string {
  if (typeof filepath !== 'string') return '';
  const parts = filepath.split(/[\\/]/);
  return parts.slice(0, -1).join('/');
}

/**
 * Check if path is absolute
 */
export function isAbsolute(filepath: string): boolean {
  if (typeof filepath !== 'string') return false;
  return filepath.startsWith('/') || /^[A-Za-z]:/.test(filepath);
} 