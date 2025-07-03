// Math helper functions

/**
 * Add two numbers
 */
export function add(a: number, b: number): number {
  return (a || 0) + (b || 0);
}

/**
 * Subtract two numbers
 */
export function subtract(a: number, b: number): number {
  return (a || 0) - (b || 0);
}

/**
 * Multiply two numbers
 */
export function multiply(a: number, b: number): number {
  return (a || 0) * (b || 0);
}

/**
 * Divide two numbers
 */
export function divide(a: number, b: number): number {
  if (b === 0) return 0;
  return (a || 0) / (b || 1);
}

/**
 * Get absolute value
 */
export function abs(num: number): number {
  return Math.abs(num || 0);
}

/**
 * Round number
 */
export function round(num: number, precision?: number): number {
  const factor = Math.pow(10, precision || 0);
  return Math.round((num || 0) * factor) / factor;
}

/**
 * Ceiling of number
 */
export function ceil(num: number): number {
  return Math.ceil(num || 0);
}

/**
 * Floor of number
 */
export function floor(num: number): number {
  return Math.floor(num || 0);
}

/**
 * Get maximum of numbers
 */
export function max(...nums: number[]): number {
  return Math.max(...nums.filter(n => typeof n === 'number'));
}

/**
 * Get minimum of numbers
 */
export function min(...nums: number[]): number {
  return Math.min(...nums.filter(n => typeof n === 'number'));
}

/**
 * Get sum of numbers
 */
export function sum(...nums: number[]): number {
  return nums.filter(n => typeof n === 'number').reduce((acc, n) => acc + n, 0);
}

/**
 * Get average of numbers
 */
export function avg(...nums: number[]): number {
  const validNums = nums.filter(n => typeof n === 'number');
  if (validNums.length === 0) return 0;
  return sum(...validNums) / validNums.length;
}

/**
 * Get random number between min and max
 */
export function random(min: number = 0, max: number = 1): number {
  return Math.random() * (max - min) + min;
} 