// URL helper functions

/**
 * Parse URL components
 */
export function parseUrl(url: string): {
  protocol?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
} {
  if (typeof url !== 'string') return {};
  
  try {
    const parsed = new URL(url);
    return {
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: parsed.pathname,
      search: parsed.search,
      hash: parsed.hash
    };
  } catch {
    return {};
  }
}

/**
 * Get domain from URL
 */
export function domain(url: string): string {
  if (typeof url !== 'string') return '';
  
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return '';
  }
}

/**
 * Get protocol from URL
 */
export function protocol(url: string): string {
  if (typeof url !== 'string') return '';
  
  try {
    const parsed = new URL(url);
    return parsed.protocol;
  } catch {
    return '';
  }
}

/**
 * Get path from URL
 */
export function pathname(url: string): string {
  if (typeof url !== 'string') return '';
  
  try {
    const parsed = new URL(url);
    return parsed.pathname;
  } catch {
    return '';
  }
}

/**
 * Get query string from URL
 */
export function query(url: string): string {
  if (typeof url !== 'string') return '';
  
  try {
    const parsed = new URL(url);
    return parsed.search;
  } catch {
    return '';
  }
}

/**
 * Get hash from URL
 */
export function hash(url: string): string {
  if (typeof url !== 'string') return '';
  
  try {
    const parsed = new URL(url);
    return parsed.hash;
  } catch {
    return '';
  }
}

/**
 * Encode URL component
 */
export function encode(str: string): string {
  if (typeof str !== 'string') return '';
  return encodeURIComponent(str);
}

/**
 * Decode URL component
 */
export function decode(str: string): string {
  if (typeof str !== 'string') return '';
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}

/**
 * Join URL segments
 */
export function join(...segments: string[]): string {
  return segments
    .filter(Boolean)
    .map(segment => segment.replace(/^\/+|\/+$/g, ''))
    .join('/');
}

/**
 * Strip WWW from URL
 */
export function stripWWW(url: string): string {
  if (typeof url !== 'string') return '';
  return url.replace(/^(https?:\/\/)www\./, '$1');
}

/**
 * Add protocol to URL if missing
 */
export function addProtocol(url: string, protocol: string = 'https'): string {
  if (typeof url !== 'string') return '';
  if (url.match(/^https?:\/\//)) return url;
  return `${protocol}://${url}`;
}

/**
 * Check if URL is absolute
 */
export function isAbsolute(url: string): boolean {
  if (typeof url !== 'string') return false;
  return /^https?:\/\//.test(url);
}

/**
 * Get base URL (protocol + hostname + port)
 */
export function base(url: string): string {
  if (typeof url !== 'string') return '';
  
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return '';
  }
} 