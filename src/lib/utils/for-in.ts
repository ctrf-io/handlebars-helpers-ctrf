/**
 * Iterate over an object's properties
 */
export function forIn<T extends Record<string, any>>(
  object: T,
  fn: (value: T[keyof T], key: keyof T) => void
): void {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      fn(object[key], key);
    }
  }
} 