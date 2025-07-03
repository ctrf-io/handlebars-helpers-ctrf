/**
 * Define a property on an object
 */
export function defineProperty<T extends Record<string, any>>(
  object: T,
  key: string,
  value: any
): void {
  Object.defineProperty(object, key, {
    value,
    writable: true,
    enumerable: false,
    configurable: true
  });
} 