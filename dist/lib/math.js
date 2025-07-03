// Math helper functions
/**
 * Add two numbers
 */
export function add(a, b) {
    return (a || 0) + (b || 0);
}
/**
 * Subtract two numbers
 */
export function subtract(a, b) {
    return (a || 0) - (b || 0);
}
/**
 * Multiply two numbers
 */
export function multiply(a, b) {
    return (a || 0) * (b || 0);
}
/**
 * Divide two numbers
 */
export function divide(a, b) {
    if (b === 0)
        return 0;
    return (a || 0) / (b || 1);
}
/**
 * Get absolute value
 */
export function abs(num) {
    return Math.abs(num || 0);
}
/**
 * Round number
 */
export function round(num, precision) {
    const factor = Math.pow(10, precision || 0);
    return Math.round((num || 0) * factor) / factor;
}
/**
 * Ceiling of number
 */
export function ceil(num) {
    return Math.ceil(num || 0);
}
/**
 * Floor of number
 */
export function floor(num) {
    return Math.floor(num || 0);
}
/**
 * Get maximum of numbers
 */
export function max(...nums) {
    return Math.max(...nums.filter(n => typeof n === 'number'));
}
/**
 * Get minimum of numbers
 */
export function min(...nums) {
    return Math.min(...nums.filter(n => typeof n === 'number'));
}
/**
 * Get sum of numbers
 */
export function sum(...nums) {
    return nums.filter(n => typeof n === 'number').reduce((acc, n) => acc + n, 0);
}
/**
 * Get average of numbers
 */
export function avg(...nums) {
    const validNums = nums.filter(n => typeof n === 'number');
    if (validNums.length === 0)
        return 0;
    return sum(...validNums) / validNums.length;
}
/**
 * Get random number between min and max
 */
export function random(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
}
//# sourceMappingURL=math.js.map