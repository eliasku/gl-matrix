// Configuration Constants
export const EPSILON = 0.000001;
export const RANDOM = Math.random;

/**
 * Creates zero-filled array with `len` float32 elements
 *
 * Used as base underlying type for all low-level matrix, vector, quaternion types
 *
 * @param len elements number
 * @returns new array
 */
export const createArray = (len: number) => new Float32Array(len);

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param a          The first number to test.
 * @param b          The second number to test.
 * @param tolerance  Absolute or relative tolerance (default EPSILON)
 * @returns True if the numbers are approximately equal, false otherwise.
 */
export const equals = (a: number, b: number, tolerance: number = EPSILON): boolean =>
  Math.abs(a - b) <= tolerance * Math.max(1, Math.abs(a), Math.abs(b));

/**
 * Symmetric round
 * see https://www.npmjs.com/package/round-half-up-symmetric#user-content-detailed-background
 *
 * @param a value to round
 */
export const symround = (a: number): number => (a >= 0 || a % 0.5 !== 0 ? Math.round(a) : Math.floor(a));

export const invSqrt = (x: number): number => 1 / Math.sqrt(x);
