import { AngleOrder } from "./AngleOrder";
import { createArray, EPSILON, RANDOM } from "./common";
import * as mat3 from "./mat3";
import * as vec3 from "./vec3";
import * as vec4 from "./vec4";

import type { Quat, Mat3, Vec3 } from "./types";

/**
 * Quaternion in the format XYZW
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns a new quaternion
 */
export const create = (): Quat => {
  const out = createArray(4);
  out[3] = 1;
  return out;
};

/**
 * Set a quat to the identity quaternion
 *
 * @param out the receiving quaternion
 * @returns out
 */
export const identity = (out: Quat): Quat => {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param out the receiving quaternion
 * @param axis the axis around which to rotate
 * @param rad the angle in radians
 * @returns out
 **/
export const setAxisAngle = (out: Quat, axis: Readonly<Vec3>, rad: number): Quat => {
  rad = rad * 0.5;
  let s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
};

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param out_axis  Vector receiving the axis of rotation
 * @param q     Quaternion to be decomposed
 * @returns Angle, in radians, of the rotation
 */
export const getAxisAngle = (out_axis: Vec3, q: Readonly<Quat>): number => {
  let rad = Math.acos(q[3]) * 2.0;
  let s = Math.sin(rad / 2.0);
  if (s > EPSILON) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
};

/**
 * Gets the angular distance between two unit quaternions
 *
 * @param a     Origin unit quaternion
 * @param b     Destination unit quaternion
 * @returns Angle, in radians, between the two quaternions
 */
export const getAngle = (a: Readonly<Quat>, b: Readonly<Quat>): number => {
  const dotproduct = dot(a, b);

  return Math.acos(2 * dotproduct * dotproduct - 1);
};

/**
 * Multiplies two quat's
 *
 * @param out the receiving quaternion
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const multiply = (out: Quat, a: Readonly<Quat>, b: Readonly<Quat>): Quat => {
  let ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3];
  let bx = b[0],
    by = b[1],
    bz = b[2],
    bw = b[3];

  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
};

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param out quat receiving operation result
 * @param a quat to rotate
 * @param rad angle (in radians) to rotate
 * @returns out
 */
export const rotateX = (out: Quat, a: Readonly<Quat>, rad: number): Quat => {
  rad *= 0.5;

  let ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3];
  let bx = Math.sin(rad),
    bw = Math.cos(rad);

  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param out quat receiving operation result
 * @param a quat to rotate
 * @param rad angle (in radians) to rotate
 * @returns out
 */
export const rotateY = (out: Quat, a: Readonly<Quat>, rad: number): Quat => {
  rad *= 0.5;

  let ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3];
  let by = Math.sin(rad),
    bw = Math.cos(rad);

  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param out quat receiving operation result
 * @param a quat to rotate
 * @param rad angle (in radians) to rotate
 * @returns out
 */
export const rotateZ = (out: Quat, a: Readonly<Quat>, rad: number): Quat => {
  rad *= 0.5;

  let ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3];
  let bz = Math.sin(rad),
    bw = Math.cos(rad);

  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param out the receiving quaternion
 * @param a quat to calculate W component of
 * @returns out
 */
export const calculateW = (out: Quat, a: Readonly<Quat>): Quat => {
  let x = a[0],
    y = a[1],
    z = a[2];

  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
};

/**
 * Calculate the exponential of a unit quaternion.
 *
 * @param out the receiving quaternion
 * @param a quat to calculate the exponential of
 * @returns out
 */
export const exp = (out: Quat, a: Readonly<Quat>): Quat => {
  let x = a[0],
    y = a[1],
    z = a[2],
    w = a[3];

  let r = Math.sqrt(x * x + y * y + z * z);
  let et = Math.exp(w);
  let s = r > 0 ? (et * Math.sin(r)) / r : 0;

  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);

  return out;
};

/**
 * Calculate the natural logarithm of a unit quaternion.
 *
 * @param out the receiving quaternion
 * @param a quat to calculate the exponential of
 * @returns out
 */
export const ln = (out: Quat, a: Readonly<Quat>): Quat => {
  let x = a[0],
    y = a[1],
    z = a[2],
    w = a[3];

  let r = Math.sqrt(x * x + y * y + z * z);
  let t = r > 0 ? Math.atan2(r, w) / r : 0;

  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);

  return out;
};

/**
 * Calculate the scalar power of a unit quaternion.
 *
 * @param out the receiving quaternion
 * @param a quat to calculate the exponential of
 * @param b amount to scale the quaternion by
 * @returns out
 */
export const pow = (out: Quat, a: Readonly<Quat>, b: number): Quat => {
  ln(out, a);
  scale(out, out, b);
  exp(out, out);
  return out;
};

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param out the receiving quaternion
 * @param a the first operand
 * @param b the second operand
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns out
 */
export const slerp = (out: Quat, a: Readonly<Quat>, b: Readonly<Quat>, t: number): Quat => {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  let ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3];
  let bx = b[0],
    by = b[1],
    bz = b[2],
    bw = b[3];

  let omega, cosom, sinom, scale0, scale1;

  // calc cosine
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  // adjust signs (if necessary)
  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  // calculate coefficients
  if (1.0 - cosom > EPSILON) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  }
  // calculate final values
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;

  return out;
};

/**
 * Generates a random unit quaternion
 *
 * @param out the receiving quaternion
 * @returns out
 */
export const random = (out: Quat): Quat => {
  // Implementation of http://planning.cs.uiuc.edu/node198.html
  // TODO: Calling random 3 times is probably not the fastest solution
  let u1 = RANDOM();
  let u2 = RANDOM();
  let u3 = RANDOM();

  let sqrt1MinusU1 = Math.sqrt(1 - u1);
  let sqrtU1 = Math.sqrt(u1);

  out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
  return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param out the receiving quaternion
 * @param a quat to calculate inverse of
 * @returns out
 */
export const invert = (out: Quat, a: Readonly<Quat>): Quat => {
  let a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3];
  let dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  let invDot = dot ? 1.0 / dot : 0;

  // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param out the receiving quaternion
 * @param a quat to calculate conjugate of
 * @returns out
 */
export const conjugate = (out: Quat, a: Readonly<Quat>): Quat => {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
};

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param out the receiving quaternion
 * @param m rotation matrix
 * @returns out
 */
export const fromMat3 = (out: Quat, m: Readonly<Mat3>): Quat => {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  let fTrace = m[0] + m[4] + m[8];
  let fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    let i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    let j = (i + 1) % 3;
    let k = (i + 2) % 3;

    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
};

/**
 * Creates a quaternion from the given euler angle x, y, z using the provided intrinsic order for the conversion.
 *
 * @param out the receiving quaternion
 * @param x Angle to rotate around X axis in degrees.
 * @param y Angle to rotate around Y axis in degrees.
 * @param z Angle to rotate around Z axis in degrees.
 * @param order Intrinsic order for conversion, default is zyx.
 * @returns out
 */
export const fromEuler = (out: Quat, x: number, y: number, z: number, order = AngleOrder.zyx): Quat => {
  let halfToRad = Math.PI / 360;
  x *= halfToRad;
  z *= halfToRad;
  y *= halfToRad;

  let sx = Math.sin(x);
  let cx = Math.cos(x);
  let sy = Math.sin(y);
  let cy = Math.cos(y);
  let sz = Math.sin(z);
  let cz = Math.cos(z);

  switch (order) {
    case AngleOrder.xyz:
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
      break;

    case AngleOrder.xzy:
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      break;

    case AngleOrder.yxz:
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      break;

    case AngleOrder.yzx:
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
      break;

    case AngleOrder.zxy:
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
      break;

    case AngleOrder.zyx:
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
      break;
  }

  return out;
};

/**
 * Returns a string representation of a quaternion
 *
 * @param a vector to represent as a string
 * @returns string representation of the vector
 */
export const str = (a: Readonly<Quat>): string => {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
};

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param a quaternion to clone
 * @returns a new quaternion
 */
export const clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param x X component
 * @param y Y component
 * @param z Z component
 * @param w W component
 * @returns a new quaternion
 */
export const fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param out the receiving quaternion
 * @param a the source quaternion
 * @returns out
 */
export const copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param out the receiving quaternion
 * @param x X component
 * @param y Y component
 * @param z Z component
 * @param w W component
 * @returns out
 */
export const set = vec4.set;

/**
 * Adds two quat's
 *
 * @param out the receiving quaternion
 * @param a the first operand
 * @param b the second operand
 * @returns out
 */
export const add = vec4.add;

/**
 * Alias for {@link Quat.multiply}
 */
export const mul = multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param out the receiving vector
 * @param a the vector to scale
 * @param b amount to scale the vector by
 * @returns out
 */
export const scale = vec4.scale;

/**
 * Calculates the dot product of two quat's
 *
 * @param a the first operand
 * @param b the second operand
 * @returns dot product of a and b
 */
export const dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param out the receiving quaternion
 * @param a the first operand
 * @param b the second operand
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns out
 */
export const lerp = vec4.lerp;

/**
 * Calculates the length of a quat
 *
 * @param a vector to calculate length of
 * @returns length of a
 */
export const length = vec4.length;

/**
 * Alias for {@link Quat.length}
 */
export const len = length;

/**
 * Calculates the squared length of a quat
 *
 * @param a vector to calculate squared length of
 * @returns squared length of a
 */
export const squaredLength = vec4.squaredLength;

/**
 * Alias for {@link Quat.squaredLength}
 */
export const sqrLen = squaredLength;

/**
 * Normalize a quat
 *
 * @param out the receiving quaternion
 * @param a quaternion to normalize
 * @returns out
 */
export const normalize = vec4.normalize;

/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param a The first quaternion.
 * @param b The second quaternion.
 * @returns True if the vectors are equal, false otherwise.
 */
export const exactEquals = vec4.exactEquals;

/**
 * Returns whether or not the quaternions point approximately to the same direction.
 *
 * Both quaternions are assumed to be unit length.
 *
 * @param a The first unit quaternion.
 * @param b The second unit quaternion.
 * @returns True if the quaternions are equal, false otherwise.
 */
export const equals = (a: Readonly<Quat>, b: Readonly<Quat>): boolean => Math.abs(vec4.dot(a, b)) >= 1 - EPSILON;

const tmpvec3 = vec3.create();
const xUnitVec3 = vec3.fromValues(1, 0, 0);
const yUnitVec3 = vec3.fromValues(0, 1, 0);

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param out the receiving quaternion.
 * @param a the initial vector
 * @param b the destination vector
 * @returns out
 */
export const rotationTo = (out: Quat, a: Readonly<Vec3>, b: Readonly<Vec3>): Quat => {
  let dot = vec3.dot(a, b);
  if (dot < -0.999999) {
    vec3.cross(tmpvec3, xUnitVec3, a);
    if (vec3.len(tmpvec3) < 0.000001) {
      vec3.cross(tmpvec3, yUnitVec3, a);
    }
    vec3.normalize(tmpvec3, tmpvec3);
    setAxisAngle(out, tmpvec3, Math.PI);
    return out;
  } else if (dot > 0.999999) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  } else {
    vec3.cross(tmpvec3, a, b);
    out[0] = tmpvec3[0];
    out[1] = tmpvec3[1];
    out[2] = tmpvec3[2];
    out[3] = 1 + dot;
    return normalize(out, out);
  }
};

const temp1 = create();
const temp2 = create();

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param out the receiving quaternion
 * @param a the first operand
 * @param b the second operand
 * @param c the third operand
 * @param d the fourth operand
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns out
 */
export const sqlerp = (
  out: Quat,
  a: Readonly<Quat>,
  b: Readonly<Quat>,
  c: Readonly<Quat>,
  d: Readonly<Quat>,
  t: number,
): Quat => {
  slerp(temp1, a, d, t);
  slerp(temp2, b, c, t);
  slerp(out, temp1, temp2, 2 * t * (1 - t));

  return out;
};

const tmp_matr = mat3.create();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param out
 * @param view  the vector representing the viewing direction
 * @param right the vector representing the local "right" direction
 * @param up    the vector representing the local "up" direction
 * @returns out
 */
export const setAxes = (out: Quat, view: Readonly<Vec3>, right: Readonly<Vec3>, up: Readonly<Vec3>): Quat => {
  tmp_matr[0] = right[0];
  tmp_matr[3] = right[1];
  tmp_matr[6] = right[2];

  tmp_matr[1] = up[0];
  tmp_matr[4] = up[1];
  tmp_matr[7] = up[2];

  tmp_matr[2] = -view[0];
  tmp_matr[5] = -view[1];
  tmp_matr[8] = -view[2];

  return normalize(out, fromMat3(out, tmp_matr));
};
