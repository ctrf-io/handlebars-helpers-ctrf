// Path helper functions

/**
 * Join path segments
 */
export function join(...segments: string[]): string {
  return segments.filter(Boolean).join('/').replace(/\/+/g, '/');
}

/**
 * Get directory name
 */
export function dirname(path: string): string {
  if (typeof path !== 'string') return '';
  const parts = path.split('/');
  return parts.slice(0, -1).join('/') || '/';
}

/**
 * Get base name
 */
export function basename(path: string, ext?: string): string {
  if (typeof path !== 'string') return '';
  const base = path.split('/').pop() || '';
  if (ext && base.endsWith(ext)) {
    return base.slice(0, -ext.length);
  }
  return base;
}

/**
 * Get file extension
 */
export function extname(path: string): string {
  if (typeof path !== 'string') return '';
  const lastDot = path.lastIndexOf('.');
  const lastSlash = path.lastIndexOf('/');
  return lastDot > lastSlash ? path.slice(lastDot) : '';
}

/**
 * Resolve path
 */
export function resolve(...paths: string[]): string {
  let resolvedPath = '';
  let isAbsolute = false;
  
  for (let i = paths.length - 1; i >= 0 && !isAbsolute; i--) {
    const path = paths[i];
    if (path && typeof path === 'string') {
      resolvedPath = path + '/' + resolvedPath;
      isAbsolute = path.startsWith('/');
    }
  }
  
  return resolvedPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
}

/**
 * Check if path is absolute
 */
export function isAbsolute(path: string): boolean {
  return typeof path === 'string' && path.startsWith('/');
}

/**
 * Get relative path
 */
export function relative(from: string, to: string): string {
  if (typeof from !== 'string' || typeof to !== 'string') return '';
  
  const fromParts = from.split('/').filter(Boolean);
  const toParts = to.split('/').filter(Boolean);
  
  let i = 0;
  while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) {
    i++;
  }
  
  const upLevels = fromParts.length - i;
  const downParts = toParts.slice(i);
  
  return '../'.repeat(upLevels) + downParts.join('/');
}

/**
 * Normalize path
 */
export function normalize(path: string): string {
  if (typeof path !== 'string') return '';
  
  const parts = path.split('/');
  const normalized: string[] = [];
  
  for (const part of parts) {
    if (part === '..') {
      normalized.pop();
    } else if (part && part !== '.') {
      normalized.push(part);
    }
  }
  
  const result = normalized.join('/');
  return path.startsWith('/') ? '/' + result : result;
} 