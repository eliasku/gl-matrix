/**
 * Common utilities
 * @module glMatrix
 */

// Configuration Constants
export const EPSILON = 0.000001;
type ArrayType = Float32ArrayConstructor | ArrayConstructor;
export let ARRAY_TYPE: ArrayType = typeof Float32Array !== "undefined" ? Float32Array : Array;
export let RANDOM = Math.random;
export let ANGLE_ORDER = "zyx";

/**
 * Symmetric round
 * see https://www.npmjs.com/package/round-half-up-symmetric#user-content-detailed-background
 *
 * @param {Number} a value to round
 */
export const round = (a: number): number => {
  if (a >= 0) {
    return Math.round(a);
  }
  return a % 0.5 === 0 ? Math.floor(a) : Math.round(a);
};

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
 */
export const setMatrixArrayType = (type: ArrayType) => {
  ARRAY_TYPE = type;
};

const degree = Math.PI / 180;

const radian = 180 / Math.PI;

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
export const toRadian = (a: number): number => a * degree;

/**
 * Convert Radian To Degree
 *
 * @param {Number} a Angle in Radians
 */
export const toDegree = (a: number): number => a * radian;

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a          The first number to test.
 * @param {Number} b          The second number to test.
 * @param {Number} tolerance  Absolute or relative tolerance (default glMatrix.EPSILON)
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
export const equals = (a: number, b: number, tolerance: number = EPSILON): boolean =>
  Math.abs(a - b) <= tolerance * Math.max(1, Math.abs(a), Math.abs(b));
