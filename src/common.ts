import { ABS, MAX, ROUND, FLOOR, SQRT, EPSILON } from "./builtin";

/**
 * Creates zero-filled array with `len` float32 elements
 *
 * Used as base underlying type for all low-level matrix, vector, quaternion types
 *
 * @param len elements number
 * @returns new array
 *
 * @__NO_SIDE_EFFECTS__
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
 *
 * @__NO_SIDE_EFFECTS__
 */
export const equals = (a: number, b: number, tolerance = EPSILON): boolean =>
  ABS(a - b) <= tolerance * MAX(1, ABS(a), ABS(b));

/**
 * Symmetric round
 * see https://www.npmjs.com/package/round-half-up-symmetric#user-content-detailed-background
 *
 * @param a value to round
 *
 * @__NO_SIDE_EFFECTS__
 */
export const symround = (a: number): number => (a >= 0 || a % 0.5 !== 0 ? ROUND(a) : FLOOR(a));

/* @__NO_SIDE_EFFECTS__ */
export const invSqrt = (x: number): number => 1 / SQRT(x);
