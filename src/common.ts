// Configuration Constants
export const EPSILON = 0.000001;
export const RANDOM = Math.random;

export const createArray = (len: number) => new Float32Array(len);

export const TO_RADIAN = Math.PI / 180;
export const TO_DEGREE = 180 / Math.PI;

/**
 * Convert Degree To Radian
 *
 * @param a Angle in Degrees
 */
export const toRadian = (a: number): number => a * TO_RADIAN;

/**
 * Convert Radian To Degree
 *
 * @param a Angle in Radians
 */
export const toDegree = (a: number): number => a * TO_DEGREE;

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
