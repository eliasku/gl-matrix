import { createArray, EPSILON, invSqrt, RANDOM, symround } from "./common";
import type { Mat3, Mat4, Quat, Vec3 } from "./types";

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns a new 3D vector
 */
export const create = (): Vec3 => createArray(3);

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param a vector to clone
 * @returns a new 3D vector
 */
export const clone = (a: Readonly<Vec3>): Vec3 => {
  const out = createArray(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
};

/**
 * Calculates the length of a vec3
 *
 * @param a vector to calculate length of
 * @returns length of a
 */
export const length = (a: Readonly<Vec3>): number => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
};

/**
 * Creates a new vec3 initialized with given values
 *
 * @param x X component
 * @param y Y component
 * @param z Z component
 * @returns a new 3D vector
 */
export const fromValues = (x: number, y: number, z: number): Vec3 => {
  const out = createArray(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param out the receiving vector
 * @param a the source vector
 * @returns out
 */
export const copy = (out: Vec3, a: Readonly<Vec3>): Vec3 => {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param out the receiving vector
 * @param x X component
 * @param y Y component
 * @param z Z component
 * @returns out
 */
export const set = (out: Vec3, x: number, y: number, z: number): Vec3 => {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
};

/**
 * Adds two vec3's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const add = (out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>): Vec3 => {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
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
export const subtract = (out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>): Vec3 => {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
};

/**
 * Multiplies two vec3's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const multiply = (out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>): Vec3 => {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
};

/**
 * Divides two vec3's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const divide = (out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>): Vec3 => {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
};

/**
 * Math.ceil the components of a vec3
 *
 * @param out the receiving vector
 * @param a vector to ceil
 * @returns out
 */
export const ceil = (out: Vec3, a: Readonly<Vec3>): Vec3 => {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
};

/**
 * Math.floor the components of a vec3
 *
 * @param out the receiving vector
 * @param a vector to floor
 * @returns out
 */
export const floor = (out: Vec3, a: Readonly<Vec3>): Vec3 => {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
};

/**
 * Returns the minimum of two vec3's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const min = (out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>): Vec3 => {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const max = (out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>): Vec3 => {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
};

/**
 * symmetric round the components of a vec3
 *
 * @param out the receiving vector
 * @param a vector to round
 * @returns out
 */
export const round = (out: Vec3, a: Readonly<Vec3>): Vec3 => {
  out[0] = symround(a[0]);
  out[1] = symround(a[1]);
  out[2] = symround(a[2]);
  return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param out the receiving vector
 * @param a the vector to scale
 * @param b amount to scale the vector by
 * @returns out
 */
export const scale = (out: Vec3, a: Readonly<Vec3>, b: number): Vec3 => {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @param scale the amount to scale b by before adding
 * @returns out
 */
export const scaleAndAdd = (out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>, scale: number): Vec3 => {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param a the first operand
 * @param b the second operand
 * @returns distance between a and b
 */
export const distance = (a: Readonly<Vec3>, b: Readonly<Vec3>): number => {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  const z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
};

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param a the first operand
 * @param b the second operand
 * @returns squared distance between a and b
 */
export const squaredDistance = (a: Readonly<Vec3>, b: Readonly<Vec3>): number => {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  const z = b[2] - a[2];
  return x * x + y * y + z * z;
};

/**
 * Calculates the squared length of a vec3
 *
 * @param a vector to calculate squared length of
 * @returns squared length of a
 */
export const squaredLength = (a: Readonly<Vec3>): number => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  return x * x + y * y + z * z;
};

/**
 * Negates the components of a vec3
 *
 * @param out the receiving vector
 * @param a vector to negate
 * @returns out
 */
export const negate = (out: Vec3, a: Readonly<Vec3>): Vec3 => {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param out the receiving vector
 * @param a vector to invert
 * @returns out
 */
export const inverse = (out: Vec3, a: Readonly<Vec3>): Vec3 => {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
};

/**
 * Normalize a vec3
 *
 * @param out the receiving vector
 * @param a vector to normalize
 * @returns out
 */
export const normalize = (out: Vec3, a: Readonly<Vec3>): Vec3 => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  let len = x * x + y * y + z * z;
  if (len > 0) {
    len = invSqrt(len);
  }
  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param a the first operand
 * @param b the second operand
 * @returns dot product of a and b
 */
export const dot = (a: Readonly<Vec3>, b: Readonly<Vec3>): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/**
 * Computes the cross product of two vec3's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const cross = (out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>): Vec3 => {
  const ax = a[0],
    ay = a[1],
    az = a[2];
  const bx = b[0],
    by = b[1],
    bz = b[2];

  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns out
 */
export const lerp = (out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>, t: number): Vec3 => {
  const ax = a[0];
  const ay = a[1];
  const az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
};

/**
 * Performs a spherical linear interpolation between two vec3's
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns out
 */
export const slerp = (out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>, t: number): Vec3 => {
  const angle = Math.acos(Math.min(Math.max(dot(a, b), -1), 1));
  const sinTotal = Math.sin(angle);

  const ratioA = Math.sin((1 - t) * angle) / sinTotal;
  const ratioB = Math.sin(t * angle) / sinTotal;
  out[0] = ratioA * a[0] + ratioB * b[0];
  out[1] = ratioA * a[1] + ratioB * b[1];
  out[2] = ratioA * a[2] + ratioB * b[2];

  return out;
};

/**
 * Performs a hermite interpolation with two control points
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @param c the third operand
 * @param d the fourth operand
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns out
 */
export const hermite = (
  out: Vec3,
  a: Readonly<Vec3>,
  b: Readonly<Vec3>,
  c: Readonly<Vec3>,
  d: Readonly<Vec3>,
  t: number,
): Vec3 => {
  const factorTimes2 = t * t;
  const factor1 = factorTimes2 * (2 * t - 3) + 1;
  const factor2 = factorTimes2 * (t - 2) + t;
  const factor3 = factorTimes2 * (t - 1);
  const factor4 = factorTimes2 * (3 - 2 * t);

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
};

/**
 * Performs a bezier interpolation with two control points
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @param c the third operand
 * @param d the fourth operand
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns out
 */
export const bezier = (
  out: Vec3,
  a: Readonly<Vec3>,
  b: Readonly<Vec3>,
  c: Readonly<Vec3>,
  d: Readonly<Vec3>,
  t: number,
): Vec3 => {
  const inverseFactor = 1 - t;
  const inverseFactorTimesTwo = inverseFactor * inverseFactor;
  const factorTimes2 = t * t;
  const factor1 = inverseFactorTimesTwo * inverseFactor;
  const factor2 = 3 * t * inverseFactorTimesTwo;
  const factor3 = 3 * factorTimes2 * inverseFactor;
  const factor4 = factorTimes2 * t;

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param out the receiving vector
 * @param scale Length of the resulting vector. If omitted, a unit vector will be returned
 * @returns out
 */
export const random = (out: Vec3, scale = 1): Vec3 => {
  const r = RANDOM() * 2.0 * Math.PI;
  const z = RANDOM() * 2.0 - 1.0;
  const zScale = Math.sqrt(1.0 - z * z) * scale;

  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param out the receiving vector
 * @param a the vector to transform
 * @param m matrix to transform with
 * @returns out
 */
export const transformMat4 = (out: Vec3, a: Readonly<Vec3>, m: Readonly<Mat4>): Vec3 => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  let w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param out the receiving vector
 * @param a the vector to transform
 * @param m the 3x3 matrix to transform with
 * @returns out
 */
export const transformMat3 = (out: Vec3, a: Readonly<Vec3>, m: Readonly<Mat3>): Vec3 => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
};

/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param out the receiving vector
 * @param a the vector to transform
 * @param q normalized quaternion to transform with
 * @returns out
 */
export const transformQuat = (out: Vec3, a: Readonly<Vec3>, q: Readonly<Quat>): Vec3 => {
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

  return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param out The receiving vec3
 * @param a The vec3 point to rotate
 * @param b The origin of the rotation
 * @param rad The angle of rotation in radians
 * @returns out
 */
export const rotateX = (out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>, rad: number): Vec3 => {
  const p: number[] = [0, 0, 0];
  const r: number[] = [0, 0, 0];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param out The receiving vec3
 * @param a The vec3 point to rotate
 * @param b The origin of the rotation
 * @param rad The angle of rotation in radians
 * @returns out
 */
export const rotateY = (out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>, rad: number): Vec3 => {
  const p: number[] = [0, 0, 0];
  const r: number[] = [0, 0, 0];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param out The receiving vec3
 * @param a The vec3 point to rotate
 * @param b The origin of the rotation
 * @param rad The angle of rotation in radians
 * @returns out
 */
export const rotateZ = (out: Vec3, a: Readonly<Vec3>, b: Readonly<Vec3>, rad: number): Vec3 => {
  const p: number[] = [0, 0, 0];
  const r: number[] = [0, 0, 0];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2];

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
};

/**
 * Get the angle between two 3D vectors
 * @param a The first operand
 * @param b The second operand
 * @returns The angle in radians
 */
export const angle = (a: Readonly<Vec3>, b: Readonly<Vec3>): number => {
  const ax = a[0];
  const ay = a[1];
  const az = a[2];
  const bx = b[0];
  const by = b[1];
  const bz = b[2];
  const mag = Math.sqrt((ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz));
  const cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
};

/**
 * Set the components of a vec3 to zero
 *
 * @param out the receiving vector
 * @returns out
 */
export const zero = (out: Vec3): Vec3 => {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  return out;
};

/**
 * Returns a string representation of a vector
 *
 * @param a vector to represent as a string
 * @returns string representation of the vector
 */
export const str = (a: Readonly<Vec3>): string => "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param a The first vector.
 * @param b The second vector.
 * @returns True if the vectors are equal, false otherwise.
 */
export const exactEquals = (a: Readonly<Vec3>, b: Readonly<Vec3>): boolean =>
  a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param a The first vector.
 * @param b The second vector.
 * @returns True if the vectors are equal, false otherwise.
 */
export const equals = (a: Readonly<Vec3>, b: Readonly<Vec3>): boolean => {
  const a0 = a[0];
  const a1 = a[1];
  const a2 = a[2];
  const b0 = b[0];
  const b1 = b[1];
  const b2 = b[2];
  return (
    Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
    Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
    Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2))
  );
};

/**
 * Alias for {@link Vec3.subtract}
 */
export const sub = subtract;

/**
 * Alias for {@link Vec3.multiply}
 */
export const mul = multiply;

/**
 * Alias for {@link Vec3.divide}
 */
export const div = divide;

/**
 * Alias for {@link Vec3.distance}
 */
export const dist = distance;

/**
 * Alias for {@link Vec3.squaredDistance}
 */
export const sqrDist = squaredDistance;

/**
 * Alias for {@link Vec3.length}
 */
export const len = length;

/**
 * Alias for {@link Vec3.squaredLength}
 */
export const sqrLen = squaredLength;

const tmp = create();

/**
 * Perform some operation over an array of vec3s.
 *
 * @param  a the array of vectors to iterate over
 * @param  stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param  offset Number of elements to skip at the beginning of the array
 * @param  count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param  fn Function to call for each vector in the array
 * @param  arg additional argument to pass to fn
 * @returns a
 */
export const forEach = <T>(
  a: number[],
  stride: number | 0,
  offset: number,
  count: number | 0,
  fn: (out: Vec3, vec: Vec3, arg: T) => void,
  arg: T,
): number[] => {
  if (!stride) {
    stride = 3;
  }

  if (!offset) {
    offset = 0;
  }

  const end = count ? Math.min(count * stride + offset, a.length) : a.length;
  for (let i = offset; i < end; i += stride) {
    tmp[0] = a[i];
    tmp[1] = a[i + 1];
    tmp[2] = a[i + 2];
    fn(tmp, tmp, arg);
    a[i] = tmp[0];
    a[i + 1] = tmp[1];
    a[i + 2] = tmp[2];
  }

  return a;
};
