import { EPSILON, MIN, MAX, SQRT, RANDOM, ABS, CEIL, FLOOR } from "./builtin";
import { createArray, invSqrt, symround } from "./common";
import type { Mat4, Quat, Vec4 } from "./types";

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns a new 4D vector
 */
export const create = (): Vec4 => createArray(4);

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param a vector to clone
 * @returns a new 4D vector
 */
export const clone = (a: Readonly<Vec4>): Vec4 => {
  const out = createArray(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
};

/**
 * Creates a new vec4 initialized with given values
 *
 * @param x X component
 * @param y Y component
 * @param z Z component
 * @param w W component
 * @returns a new 4D vector
 */
export const fromValues = (x: number, y: number, z: number, w: number): Vec4 => {
  const out = createArray(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
};

/**
 * Copy values from one vec4 to another
 *
 * @param out receiving vector
 * @param a source vector
 * @returns out
 */
export const copy = (out: Vec4, a: Readonly<Vec4>): Vec4 => {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
};

/**
 * Set components of a vec4 to given values
 *
 * @param out receiving vector
 * @param x X component
 * @param y Y component
 * @param z Z component
 * @param w W component
 * @returns out
 */
export const set = (out: Vec4, x: number, y: number, z: number, w: number): Vec4 => {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
};

/**
 * Adds two vec4's
 *
 * @param out receiving vector
 * @param a first operand
 * @param b second operand
 * @returns out
 */
export const add = (out: Vec4, a: Readonly<Vec4>, b: Readonly<Vec4>): Vec4 => {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param out receiving vector
 * @param a first operand
 * @param b second operand
 * @returns out
 */
export const subtract = (out: Vec4, a: Readonly<Vec4>, b: Readonly<Vec4>): Vec4 => {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
};

/**
 * Multiplies two vec4's
 *
 * @param out receiving vector
 * @param a first operand
 * @param b second operand
 * @returns out
 */
export const multiply = (out: Vec4, a: Readonly<Vec4>, b: Readonly<Vec4>): Vec4 => {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
};

/**
 * Divides two vec4's
 *
 * @param out receiving vector
 * @param a first operand
 * @param b second operand
 * @returns out
 */
export const divide = (out: Vec4, a: Readonly<Vec4>, b: Readonly<Vec4>): Vec4 => {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
};

/**
 * `ceil` components of a vec4
 *
 * @param out receiving vector
 * @param a vector to ceil
 * @returns out
 */
export const ceil = (out: Vec4, a: Readonly<Vec4>): Vec4 => {
  out[0] = CEIL(a[0]);
  out[1] = CEIL(a[1]);
  out[2] = CEIL(a[2]);
  out[3] = CEIL(a[3]);
  return out;
};

/**
 * `floor` components of a vec4
 *
 * @param out receiving vector
 * @param a vector to floor
 * @returns out
 */
export const floor = (out: Vec4, a: Readonly<Vec4>): Vec4 => {
  out[0] = FLOOR(a[0]);
  out[1] = FLOOR(a[1]);
  out[2] = FLOOR(a[2]);
  out[3] = FLOOR(a[3]);
  return out;
};

/**
 * Returns minimum of two vec4's
 *
 * @param out receiving vector
 * @param a first operand
 * @param b second operand
 * @returns out
 */
export const min = (out: Vec4, a: Readonly<Vec4>, b: Readonly<Vec4>): Vec4 => {
  out[0] = MIN(a[0], b[0]);
  out[1] = MIN(a[1], b[1]);
  out[2] = MIN(a[2], b[2]);
  out[3] = MIN(a[3], b[3]);
  return out;
};

/**
 * Returns maximum of two vec4's
 *
 * @param out receiving vector
 * @param a first operand
 * @param b second operand
 * @returns out
 */
export const max = (out: Vec4, a: Readonly<Vec4>, b: Readonly<Vec4>): Vec4 => {
  out[0] = MAX(a[0], b[0]);
  out[1] = MAX(a[1], b[1]);
  out[2] = MAX(a[2], b[2]);
  out[3] = MAX(a[3], b[3]);
  return out;
};

/**
 * symmetric round components of a vec4
 *
 * @param out receiving vector
 * @param a vector to round
 * @returns out
 */
export const round = (out: Vec4, a: Readonly<Vec4>): Vec4 => {
  out[0] = symround(a[0]);
  out[1] = symround(a[1]);
  out[2] = symround(a[2]);
  out[3] = symround(a[3]);
  return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param out receiving vector
 * @param a vector to scale
 * @param b amount to scale vector by
 * @returns out
 */
export const scale = (out: Vec4, a: Readonly<Vec4>, b: number): Vec4 => {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
};

/**
 * Adds two vec4's after scaling second operand by a scalar value
 *
 * @param out receiving vector
 * @param a first operand
 * @param b second operand
 * @param scale amount to scale b by before adding
 * @returns out
 */
export const scaleAndAdd = (out: Vec4, a: Readonly<Vec4>, b: Readonly<Vec4>, scale: number): Vec4 => {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
};

/**
 * Calculates euclidian distance between two vec4's
 *
 * @param a first operand
 * @param b second operand
 * @returns distance between a and b
 */
export const distance = (a: Readonly<Vec4>, b: Readonly<Vec4>): number => {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  const z = b[2] - a[2];
  const w = b[3] - a[3];
  return SQRT(x * x + y * y + z * z + w * w);
};

/**
 * Calculates squared euclidian distance between two vec4's
 *
 * @param a first operand
 * @param b second operand
 * @returns squared distance between a and b
 */
export const squaredDistance = (a: Readonly<Vec4>, b: Readonly<Vec4>): number => {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  const z = b[2] - a[2];
  const w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
};

/**
 * Calculates length of a vec4
 *
 * @param a vector to calculate length of
 * @returns length of a
 */
export const length = (a: Readonly<Vec4>): number => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  const w = a[3];
  return SQRT(x * x + y * y + z * z + w * w);
};

/**
 * Calculates squared length of a vec4
 *
 * @param a vector to calculate squared length of
 * @returns squared length of a
 */
export const squaredLength = (a: Readonly<Vec4>): number => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  const w = a[3];
  return x * x + y * y + z * z + w * w;
};

/**
 * Negates components of a vec4
 *
 * @param out receiving vector
 * @param a vector to negate
 * @returns out
 */
export const negate = (out: Vec4, a: Readonly<Vec4>): Vec4 => {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
};

/**
 * Returns inverse of components of a vec4
 *
 * @param out receiving vector
 * @param a vector to invert
 * @returns out
 */
export const inverse = (out: Vec4, a: Readonly<Vec4>): Vec4 => {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
};

/**
 * Normalize a vec4
 *
 * @param out receiving vector
 * @param a vector to normalize
 * @returns out
 */
export const normalize = (out: Vec4, a: Readonly<Vec4>): Vec4 => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  const w = a[3];
  let len = x * x + y * y + z * z + w * w;
  if (len > 0) {
    len = invSqrt(len);
  }
  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
};

/**
 * Calculates dot product of two vec4's
 *
 * @param a first operand
 * @param b second operand
 * @returns dot product of a and b
 */
export const dot = (a: Readonly<Vec4>, b: Readonly<Vec4>): number =>
  a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];

/**
 * Returns cross-product of three vectors in a 4-dimensional space
 *
 * @param out receiving vector
 * @param u first vector
 * @param v second vector
 * @param w third vector
 * @returns result
 */
export const cross = (out: Vec4, u: Readonly<Vec4>, v: Readonly<Vec4>, w: Readonly<Vec4>): Vec4 => {
  const A = v[0] * w[1] - v[1] * w[0];
  const B = v[0] * w[2] - v[2] * w[0];
  const C = v[0] * w[3] - v[3] * w[0];
  const D = v[1] * w[2] - v[2] * w[1];
  const E = v[1] * w[3] - v[3] * w[1];
  const F = v[2] * w[3] - v[3] * w[2];
  const G = u[0];
  const H = u[1];
  const I = u[2];
  const J = u[3];

  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;

  return out;
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param out receiving vector
 * @param a first operand
 * @param b second operand
 * @param t interpolation amount, in range [0-1], between two inputs
 * @returns out
 */
export const lerp = (out: Vec4, a: Readonly<Vec4>, b: Readonly<Vec4>, t: number): Vec4 => {
  const ax = a[0];
  const ay = a[1];
  const az = a[2];
  const aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
};

/**
 * Generates a random vector with given scale
 *
 * @param out receiving vector
 * @param scale Length of resulting vector. If omitted, a unit vector will be returned
 * @returns out
 */
export const random = (out: Vec4, scale = 1): Vec4 => {
  // Marsaglia, George. Choosing a Point from a Surface of a
  // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
  // http://projecteuclid.org/euclid.aos/1177692644;

  let rand = RANDOM();
  const v1 = rand * 2 - 1;
  const v2 = (4 * RANDOM() - 2) * SQRT(rand * -rand + rand);
  const s1 = v1 * v1 + v2 * v2;

  rand = RANDOM();
  const v3 = rand * 2 - 1;
  const v4 = (4 * RANDOM() - 2) * SQRT(rand * -rand + rand);
  const s2 = v3 * v3 + v4 * v4;

  const d = SQRT((1 - s1) / s2);
  out[0] = scale * v1;
  out[1] = scale * v2;
  out[2] = scale * v3 * d;
  out[3] = scale * v4 * d;
  return out;
};

/**
 * Transforms vec4 with a mat4.
 *
 * @param out receiving vector
 * @param a vector to transform
 * @param m matrix to transform with
 * @returns out
 */
export const transformMat4 = (out: Vec4, a: Readonly<Vec4>, m: Readonly<Mat4>): Vec4 => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  const w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
};

/**
 * Transforms vec4 with a quat
 *
 * @param out receiving vector
 * @param a vector to transform
 * @param q normalized quaternion to transform with
 * @returns out
 */
export const transformQuat = (out: Vec4, a: Readonly<Vec4>, q: Readonly<Quat>): Vec4 => {
  // Fast Vector Rotation using Quaternions by Robert Eisele
  // https://raw.org/proof/vector-rotation-using-quaternions/

  const qx = q[0];
  const qy = q[1];
  const qz = q[2];
  const qw = q[3];

  const vx = a[0];
  const vy = a[1];
  const vz = a[2];

  // t = q x v
  let tx = qy * vz - qz * vy;
  let ty = qz * vx - qx * vz;
  let tz = qx * vy - qy * vx;

  // t = 2t
  tx = tx + tx;
  ty = ty + ty;
  tz = tz + tz;

  // v + w t + q x t
  out[0] = vx + qw * tx + qy * tz - qz * ty;
  out[1] = vy + qw * ty + qz * tx - qx * tz;
  out[2] = vz + qw * tz + qx * ty - qy * tx;
  out[3] = a[3];
  return out;
};

/**
 * Set components of a vec4 to zero
 *
 * @param out receiving vector
 * @returns out
 */
export const zero = (out: Vec4): Vec4 => {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  return out;
};

/**
 * Returns a string representation of a vector
 *
 * @param a vector to represent as a string
 * @returns string representation of vector
 */
export const str = (a: Readonly<Vec4>): string => "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";

/**
 * Returns whether or not vectors have exactly same elements in same position (when compared with ===)
 *
 * @param a The first vector.
 * @param b The second vector.
 * @returns True if vectors are equal, false otherwise.
 */
export const exactEquals = (a: Readonly<Vec4>, b: Readonly<Vec4>): boolean =>
  a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];

/**
 * Returns whether or not vectors have approximately same elements in same position.
 *
 * @param a The first vector.
 * @param b The second vector.
 * @returns True if vectors are equal, false otherwise.
 */
export const equals = (a: Readonly<Vec4>, b: Readonly<Vec4>): boolean => {
  const a0 = a[0];
  const a1 = a[1];
  const a2 = a[2];
  const a3 = a[3];
  const b0 = b[0];
  const b1 = b[1];
  const b2 = b[2];
  const b3 = b[3];
  return (
    ABS(a0 - b0) <= EPSILON * MAX(1.0, ABS(a0), ABS(b0)) &&
    ABS(a1 - b1) <= EPSILON * MAX(1.0, ABS(a1), ABS(b1)) &&
    ABS(a2 - b2) <= EPSILON * MAX(1.0, ABS(a2), ABS(b2)) &&
    ABS(a3 - b3) <= EPSILON * MAX(1.0, ABS(a3), ABS(b3))
  );
};

/**
 * Alias for {@link vec4.subtract}
 */
export const sub = subtract;

/**
 * Alias for {@link vec4.multiply}
 */
export const mul = multiply;

/**
 * Alias for {@link vec4.divide}
 */
export const div = divide;

/**
 * Alias for {@link vec4.distance}
 */
export const dist = distance;

/**
 * Alias for {@link vec4.squaredDistance}
 */
export const sqrDist = squaredDistance;

/**
 * Alias for {@link vec4.length}
 */
export const len = length;

/**
 * Alias for {@link vec4.squaredLength}
 */
export const sqrLen = squaredLength;

const tmp = create();

/**
 * Perform some operation over an array of vec4s.
 *
 * @param a array of vectors to iterate over
 * @param stride Number of elements between start of each vec4. If 0 assumes tightly packed
 * @param offset Number of elements to skip at beginning of array
 * @param count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param fn Function to call for each vector in array
 * @param arg additional argument to pass to fn
 * @returns a
 */
export const forEach = <T>(
  a: number[],
  stride: number | 0,
  offset: number,
  count: number | 0,
  fn: (out: Vec4, vec: Readonly<Vec4>, arg: T) => void,
  arg: T,
): number[] => {
  if (!stride) {
    stride = 4;
  }

  if (!offset) {
    offset = 0;
  }

  const end = count ? MIN(count * stride + offset, a.length) : a.length;

  for (let i = offset; i < end; i += stride) {
    tmp[0] = a[i];
    tmp[1] = a[i + 1];
    tmp[2] = a[i + 2];
    tmp[3] = a[i + 3];
    fn(tmp, tmp, arg);
    a[i] = tmp[0];
    a[i + 1] = tmp[1];
    a[i + 2] = tmp[2];
    a[i + 3] = tmp[3];
  }

  return a;
};
