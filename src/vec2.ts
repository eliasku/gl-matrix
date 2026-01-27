import { ARRAY_TYPE, EPSILON, RANDOM, symround } from "./common";

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns a new 2D vector
 */
export const create = (): vec2 => {
  const out = new ARRAY_TYPE(2);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param a vector to clone
 * @returns a new 2D vector
 */
export const clone = (a: ReadonlyVec2): vec2 => {
  const out = new ARRAY_TYPE(2);
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
 */
export const fromValues = (x: number, y: number): vec2 => {
  const out = new ARRAY_TYPE(2);
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
export const copy = (out: vec2, a: ReadonlyVec2): vec2 => {
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
export const set = (out: vec2, x: number, y: number): vec2 => {
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
export const add = (out: vec2, a: ReadonlyVec2, b: ReadonlyVec2): vec2 => {
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
export const subtract = (out: vec2, a: ReadonlyVec2, b: ReadonlyVec2): vec2 => {
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
export const multiply = (out: vec2, a: ReadonlyVec2, b: ReadonlyVec2): vec2 => {
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
export const divide = (out: vec2, a: ReadonlyVec2, b: ReadonlyVec2): vec2 => {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
};

/**
 * Math.ceil the components of a vec2
 *
 * @param out the receiving vector
 * @param a vector to ceil
 * @returns out
 */
export const ceil = (out: vec2, a: ReadonlyVec2): vec2 => {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
};

/**
 * Math.floor the components of a vec2
 *
 * @param out the receiving vector
 * @param a vector to floor
 * @returns out
 */
export const floor = (out: vec2, a: ReadonlyVec2): vec2 => {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
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
export const min = (out: vec2, a: ReadonlyVec2, b: ReadonlyVec2): vec2 => {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
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
export const max = (out: vec2, a: ReadonlyVec2, b: ReadonlyVec2): vec2 => {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
};

/**
 * symmetric round the components of a vec2
 *
 * @param out the receiving vector
 * @param a vector to round
 * @returns out
 */
export const round = (out: vec2, a: ReadonlyVec2): vec2 => {
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
export const scale = (out: vec2, a: ReadonlyVec2, b: number): vec2 => {
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
export const scaleAndAdd = (out: vec2, a: ReadonlyVec2, b: ReadonlyVec2, scale: number): vec2 => {
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
 */
export const distance = (a: ReadonlyVec2, b: ReadonlyVec2): number => {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
};

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param a the first operand
 * @param b the second operand
 * @returns squared distance between a and b
 */
export const squaredDistance = (a: ReadonlyVec2, b: ReadonlyVec2): number => {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  return x * x + y * y;
};

/**
 * Calculates the length of a vec2
 *
 * @param a vector to calculate length of
 * @returns length of a
 */
export const length = (a: ReadonlyVec2): number => {
  const x = a[0];
  const y = a[1];
  return Math.sqrt(x * x + y * y);
};

/**
 * Calculates the squared length of a vec2
 *
 * @param a vector to calculate squared length of
 * @returns squared length of a
 */
export const squaredLength = (a: ReadonlyVec2): number => {
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
export const negate = (out: vec2, a: ReadonlyVec2): vec2 => {
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
export const inverse = (out: vec2, a: ReadonlyVec2): vec2 => {
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
export const normalize = (out: vec2, a: ReadonlyVec2): vec2 => {
  const x = a[0];
  const y = a[1];
  let len = x * x + y * y;
  if (len > 0) {
    // TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
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
 */
export const dot = (a: ReadonlyVec2, b: ReadonlyVec2): number => {
  return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param out the receiving vector
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const cross = (out: vec3, a: ReadonlyVec2, b: ReadonlyVec2): vec3 => {
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
export const lerp = (out: vec2, a: ReadonlyVec2, b: ReadonlyVec2, t: number): vec2 => {
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
export const random = (out: vec2, scale: number = 1): vec2 => {
  const r = RANDOM() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
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
export const transformMat2 = (out: vec2, a: ReadonlyVec2, m: ReadonlyMat2): vec2 => {
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
export const transformMat2d = (out: vec2, a: ReadonlyVec2, m: ReadonlyMat2d): vec2 => {
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
export const transformMat3 = (out: vec2, a: ReadonlyVec2, m: ReadonlyMat3): vec2 => {
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
export const transformMat4 = (out: vec2, a: ReadonlyVec2, m: ReadonlyMat4): vec2 => {
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
export const rotate = (out: vec2, a: ReadonlyVec2, b: ReadonlyVec2, rad: number): vec2 => {
  //Translate point to the origin
  const p0 = a[0] - b[0];
  const p1 = a[1] - b[1];
  const sinC = Math.sin(rad);
  const cosC = Math.cos(rad);

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
export const angle = (a: ReadonlyVec2, b: ReadonlyVec2): number => {
  const ax = a[0];
  const ay = a[1];
  const bx = b[0];
  const by = b[1];
  return Math.abs(Math.atan2(ay * bx - ax * by, ax * bx + ay * by));
};

/**
 * Get the signed angle in the interval [-pi,pi] between two 2D vectors (positive if `a` is to the right of `b`)
 *
 * @param a The first vector
 * @param b The second vector
 * @returns The signed angle in radians
 */
export const signedAngle = (a: ReadonlyVec2, b: ReadonlyVec2): number => {
  const ax = a[0];
  const ay = a[1];
  const bx = b[0];
  const by = b[1];
  return Math.atan2(ax * by - ay * bx, ax * bx + ay * by);
};

/**
 * Set the components of a vec2 to zero
 *
 * @param out the receiving vector
 * @returns out
 */
export const zero = (out: vec2): vec2 => {
  out[0] = 0.0;
  out[1] = 0.0;
  return out;
};

/**
 * Returns a string representation of a vector
 *
 * @param a vector to represent as a string
 * @returns string representation of the vector
 */
export const str = (a: ReadonlyVec2): string => {
  return "vec2(" + a[0] + ", " + a[1] + ")";
};

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param a The first vector.
 * @param b The second vector.
 * @returns True if the vectors are equal, false otherwise.
 */
export const exactEquals = (a: ReadonlyVec2, b: ReadonlyVec2): boolean => {
  return a[0] === b[0] && a[1] === b[1];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param a The first vector.
 * @param b The second vector.
 * @returns True if the vectors are equal, false otherwise.
 */
export const equals = (a: ReadonlyVec2, b: ReadonlyVec2): boolean => {
  const a0 = a[0];
  const a1 = a[1];
  const b0 = b[0];
  const b1 = b[1];
  return (
    Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
    Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1))
  );
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
export const forEach = (
  a: number[],
  stride?: number,
  offset?: number,
  count?: number,
  fn?: (out: vec2, vec: vec2, arg?: any) => void,
  arg?: any,
): number[] => {
  if (!stride) {
    stride = 2;
  }

  if (!offset) {
    offset = 0;
  }

  const end = count ? Math.min(count * stride + offset, a.length) : a.length;
  for (let i = offset; i < end; i += stride) {
    tmp[0] = a[i];
    tmp[1] = a[i + 1];
    fn(tmp, tmp, arg);
    a[i] = tmp[0];
    a[i + 1] = tmp[1];
  }

  return a;
};
