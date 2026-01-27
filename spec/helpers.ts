import { expect } from "bun:test";

const EPSILON = 0.00001;

expect.extend({
  /**
   * Returns true if `actual` has the same length as `expected`, and
   * if each element of both arrays is within 0.000001 of each other.
   * This is a way to check for "equal enough" conditions, as a way
   * of working around floating point imprecision.
   */
  toBeEqualish(a: unknown, e: number | number[] | Float32Array) {
    if (typeof a === "number" && typeof e === "number") {
      if (isNaN(e) !== isNaN(a)) {
        return {
          pass: false,
          message: e + " to be equalish to " + a,
        };
      }
      if (Math.abs(e - a) >= EPSILON) {
        return {
          pass: false,
          message: e + " to be equalish to " + a,
        };
      }
      return {
        pass: true,
      };
    }

    if (!e || !a || typeof e !== "object" || typeof a !== "object" || !("length" in a)) {
      return {
        pass: false,
        message: "not arrays",
      };
    }
    if (e.length !== a.length) {
      return {
        pass: false,
        message: e.length + " " + a.length + " length mismatch",
      };
    }

    for (let i = 0; i < e.length; i++) {
      if (isNaN(e[i]) !== isNaN(a[i])) {
        return {
          pass: false,
          message: isNaN(e[i]) + " " + isNaN(a[i]) + " el " + i,
        };
      }
      if (Math.abs(e[i] - a[i]) >= EPSILON) {
        return {
          pass: false,
          message: "" + Math.abs(e[i] - a[i]) + " more than epsilon",
        };
      }
    }

    return { pass: true };
  },

  // Dual quaternions are very special & unique snowflakes
  toBeEqualishQuat2(a: unknown, e: number[] | Float32Array, epsilon: number = EPSILON) {
    if (!e || !a || typeof e !== "object" || typeof a !== "object" || !("length" in a)) {
      return {
        pass: false,
        message: "not arrays",
      };
    }
    let allSignsFlipped = false;
    if (e.length != a.length) {
      return {
        pass: false,
        message: `${e} to have the same length as ${a}`,
      };
    }

    for (let i = 0; i < e.length; i++) {
      if (isNaN(e[i]) !== isNaN(a[i])) {
        return {
          pass: false,
          message: `${e} to be equalish to ${a}`,
        };
      }

      if (allSignsFlipped) {
        if (Math.abs(e[i] - -a[i]) >= epsilon) {
          return {
            pass: false,
            message: `${e} to be equalish to ${a}`,
          };
        }
      } else {
        if (Math.abs(e[i] - a[i]) >= epsilon) {
          allSignsFlipped = true;
          i = 0;
        }
      }
    }
    return { pass: true };
  },
});
