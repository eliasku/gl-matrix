import { EPSILON, COS, PI, SIN, RANDOM, ABS, MAX, MIN, SQRT, ATAN2, CEIL, FLOOR } from "./builtin";
import { createArray, invSqrt, symround } from "./common";
import type { Mat2, Mat2d, Mat3, Mat4, Vec2, Vec3 } from "./types";

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns a new 2D vector
 * @__NO_SIDE_EFFECTS__
 */
export const create = (): Vec2 => createArray(2);

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param a vector to clone
 * @returns a new 2D vector
 * @__NO_SIDE_EFFECTS__
 */
export const clone = (a: Readonly<Vec2>): Vec2 => {
  const out = createArray(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
};

/**
 * Creates a new vec2 initialized with given values
 *
 * @param x X component
 * @param y Y component
 * @returns a new 2D vector
 * @__NO_SIDE_EFFECTS__
 */
export const fromValues = (x: number, y: number): Vec2 => {
  const out = createArray(2);
  out[0] = x;
  out[1] = y;
  return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param out the receiving vector
 * @param a the source vector
 * @returns out
 */
export const copy = (out: Vec2, a: Readonly<Vec2>): Vec2 => {
  out[0] = a[0];
  out[1] = a[1];
  return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param out the receiving vector
 * @param x X component
 * @param y Y component
 * @returns out
 */
export const set = (out: Vec2, x: number, y: number): Vec2 => {
  out[0] = x;
  out[1] = y;
  return out;
};

/**
 * Adds two vec2's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const add = (out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>): Vec2 => {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const subtract = (out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>): Vec2 => {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
};

/**
 * Multiplies two vec2's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const multiply = (out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>): Vec2 => {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
};

/**
 * Divides two vec2's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const divide = (out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>): Vec2 => {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
};

/**
 * `ceil` the components of a vec2
 *
 * @param out the receiving vector
 * @param a vector to ceil
 * @returns out
 */
export const ceil = (out: Vec2, a: Readonly<Vec2>): Vec2 => {
  out[0] = CEIL(a[0]);
  out[1] = CEIL(a[1]);
  return out;
};

/**
 * `floor` the components of a vec2
 *
 * @param out the receiving vector
 * @param a vector to floor
 * @returns out
 */
export const floor = (out: Vec2, a: Readonly<Vec2>): Vec2 => {
  out[0] = FLOOR(a[0]);
  out[1] = FLOOR(a[1]);
  return out;
};

/**
 * Returns the minimum of two vec2's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const min = (out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>): Vec2 => {
  out[0] = MIN(a[0], b[0]);
  out[1] = MIN(a[1], b[1]);
  return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const max = (out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>): Vec2 => {
  out[0] = MAX(a[0], b[0]);
  out[1] = MAX(a[1], b[1]);
  return out;
};

/**
 * symmetric round the components of a vec2
 *
 * @param out the receiving vector
 * @param a vector to round
 * @returns out
 */
export const round = (out: Vec2, a: Readonly<Vec2>): Vec2 => {
  out[0] = symround(a[0]);
  out[1] = symround(a[1]);
  return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param out the receiving vector
 * @param a the vector to scale
 * @param b amount to scale the vector by
 * @returns out
 */
export const scale = (out: Vec2, a: Readonly<Vec2>, b: number): Vec2 => {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @param scale the amount to scale b by before adding
 * @returns out
 */
export const scaleAndAdd = (out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>, scale: number): Vec2 => {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param a the first operand
 * @param b the second operand
 * @returns distance between a and b
 * @__NO_SIDE_EFFECTS__
 */
export const distance = (a: Readonly<Vec2>, b: Readonly<Vec2>): number => {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  return SQRT(x * x + y * y);
};

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param a the first operand
 * @param b the second operand
 * @returns squared distance between a and b
 * @__NO_SIDE_EFFECTS__
 */
export const squaredDistance = (a: Readonly<Vec2>, b: Readonly<Vec2>): number => {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  return x * x + y * y;
};

/**
 * Calculates the length of a vec2
 *
 * @param a vector to calculate length of
 * @returns length of a
 * @__NO_SIDE_EFFECTS__
 */
export const length = (a: Readonly<Vec2>): number => {
  const x = a[0];
  const y = a[1];
  return SQRT(x * x + y * y);
};

/**
 * Calculates the squared length of a vec2
 *
 * @param a vector to calculate squared length of
 * @returns squared length of a
 * @__NO_SIDE_EFFECTS__
 */
export const squaredLength = (a: Readonly<Vec2>): number => {
  const x = a[0];
  const y = a[1];
  return x * x + y * y;
};

/**
 * Negates the components of a vec2
 *
 * @param out the receiving vector
 * @param a vector to negate
 * @returns out
 */
export const negate = (out: Vec2, a: Readonly<Vec2>): Vec2 => {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param out the receiving vector
 * @param a vector to invert
 * @returns out
 */
export const inverse = (out: Vec2, a: Readonly<Vec2>): Vec2 => {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param out the receiving vector
 * @param a vector to normalize
 * @returns out
 */
export const normalize = (out: Vec2, a: Readonly<Vec2>): Vec2 => {
  const x = a[0];
  const y = a[1];
  let len = x * x + y * y;
  if (len > 0) {
    len = invSqrt(len);
  }
  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param a the first operand
 * @param b the second operand
 * @returns dot product of a and b
 * @__NO_SIDE_EFFECTS__
 */
export const dot = (a: Readonly<Vec2>, b: Readonly<Vec2>): number => a[0] * b[0] + a[1] * b[1];

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const cross = (out: Vec3, a: Readonly<Vec2>, b: Readonly<Vec2>): Vec3 => {
  const z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns out
 */
export const lerp = (out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>, t: number): Vec2 => {
  const ax = a[0];
  const ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param out the receiving vector
 * @param scale Length of the resulting vector. If omitted, a unit vector will be returned
 * @returns out
 */
export const random = (out: Vec2, scale = 1): Vec2 => {
  const r = RANDOM() * 2.0 * PI;
  out[0] = COS(r) * scale;
  out[1] = SIN(r) * scale;
  return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param out the receiving vector
 * @param a the vector to transform
 * @param m matrix to transform with
 * @returns out
 */
export const transformMat2 = (out: Vec2, a: Readonly<Vec2>, m: Readonly<Mat2>): Vec2 => {
  const x = a[0];
  const y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param out the receiving vector
 * @param a the vector to transform
 * @param m matrix to transform with
 * @returns out
 */
export const transformMat2d = (out: Vec2, a: Readonly<Vec2>, m: Readonly<Mat2d>): Vec2 => {
  const x = a[0];
  const y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param out the receiving vector
 * @param a the vector to transform
 * @param m matrix to transform with
 * @returns out
 */
export const transformMat3 = (out: Vec2, a: Readonly<Vec2>, m: Readonly<Mat3>): Vec2 => {
  const x = a[0];
  const y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param out the receiving vector
 * @param a the vector to transform
 * @param m matrix to transform with
 * @returns out
 */
export const transformMat4 = (out: Vec2, a: Readonly<Vec2>, m: Readonly<Mat4>): Vec2 => {
  const x = a[0];
  const y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
};

/**
 * Rotate a 2D vector
 * @param out The receiving vec2
 * @param a The vec2 point to rotate
 * @param b The origin of the rotation
 * @param rad The angle of rotation in radians
 * @returns out
 */
export const rotate = (out: Vec2, a: Readonly<Vec2>, b: Readonly<Vec2>, rad: number): Vec2 => {
  //Translate point to the origin
  const p0 = a[0] - b[0];
  const p1 = a[1] - b[1];
  const sinC = SIN(rad);
  const cosC = COS(rad);

  //perform rotation and translate to correct position
  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];

  return out;
};

/**
 * Get the smallest angle between two 2D vectors
 * @param a The first operand
 * @param b The second operand
 * @returns The angle in radians
 */
export const angle = (a: Readonly<Vec2>, b: Readonly<Vec2>): number => {
  const ax = a[0];
  const ay = a[1];
  const bx = b[0];
  const by = b[1];
  return ABS(ATAN2(ay * bx - ax * by, ax * bx + ay * by));
};

/**
 * Get the signed angle in the interval [-pi,pi] between two 2D vectors (positive if `a` is to the right of `b`)
 *
 * @param a The first vector
 * @param b The second vector
 * @returns The signed angle in radians
 */
export const signedAngle = (a: Readonly<Vec2>, b: Readonly<Vec2>): number => {
  const ax = a[0];
  const ay = a[1];
  const bx = b[0];
  const by = b[1];
  return ATAN2(ax * by - ay * bx, ax * bx + ay * by);
};

/**
 * Set the components of a vec2 to zero
 *
 * @param out the receiving vector
 * @returns out
 */
export const zero = (out: Vec2): Vec2 => {
  out[0] = 0.0;
  out[1] = 0.0;
  return out;
};

/**
 * Returns a string representation of a vector
 *
 * @param a vector to represent as a string
 * @returns string representation of the vector
 * @__NO_SIDE_EFFECTS__
 */
export const str = (a: Readonly<Vec2>): string => "vec2(" + a[0] + ", " + a[1] + ")";

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param a The first vector.
 * @param b The second vector.
 * @returns True if the vectors are equal, false otherwise.
 * @__NO_SIDE_EFFECTS__
 */
export const exactEquals = (a: Readonly<Vec2>, b: Readonly<Vec2>): boolean => a[0] === b[0] && a[1] === b[1];

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param a The first vector.
 * @param b The second vector.
 * @returns True if the vectors are equal, false otherwise.
 * @__NO_SIDE_EFFECTS__
 */
export const equals = (a: Readonly<Vec2>, b: Readonly<Vec2>): boolean => {
  const a0 = a[0];
  const a1 = a[1];
  const b0 = b[0];
  const b1 = b[1];
  return ABS(a0 - b0) <= EPSILON * MAX(1.0, ABS(a0), ABS(b0)) && ABS(a1 - b1) <= EPSILON * MAX(1.0, ABS(a1), ABS(b1));
};

/**
 * Alias for {@link vec2.length}
 */
export const len = length;

/**
 * Alias for {@link vec2.subtract}
 */
export const sub = subtract;

/**
 * Alias for {@link vec2.multiply}
 */
export const mul = multiply;

/**
 * Alias for {@link vec2.divide}
 */
export const div = divide;

/**
 * Alias for {@link vec2.distance}
 */
export const dist = distance;

/**
 * Alias for {@link vec2.squaredDistance}
 */
export const sqrDist = squaredDistance;

/**
 * Alias for {@link vec2.squaredLength}
 */
export const sqrLen = squaredLength;

const tmp = create();

/**
 * Perform some operation over an array of vec2s.
 *
 * @param a plain array of vectors to iterate over
 * @param stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param offset Number of elements to skip at the beginning of the array
 * @param count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param fn Function to call for each vector in the array
 * @param arg additional argument to pass to fn
 */
export const forEach = <T>(
  a: number[],
  stride: number | 0,
  offset: number,
  count: number | 0,
  fn: (out: Vec2, vec: Vec2, arg: T) => void,
  arg: T,
): number[] => {
  if (!stride) {
    stride = 2;
  }

  if (!offset) {
    offset = 0;
  }

  const end = count ? MIN(count * stride + offset, a.length) : a.length;
  for (let i = offset; i < end; i += stride) {
    tmp[0] = a[i];
    tmp[1] = a[i + 1];
    fn(tmp, tmp, arg);
    a[i] = tmp[0];
    a[i + 1] = tmp[1];
  }

  return a;
};
