import { expect } from "bun:test";

const EPSILON = 0.00001;

// function expected(e, message, a) {
//   expect(a).fail(e, `expected ${JSON.stringify(e)} ${message} ${JSON.stringify(a)}`);
// }
expect.extend({
  /**
   * Returns true if `actual` has the same length as `expected`, and
   * if each element of both arrays is within 0.000001 of each other.
   * This is a way to check for "equal enough" conditions, as a way
   * of working around floating point imprecision.
   */
  toBeEqualish(a: any, e: number | number[] | Float32Array) {
    if (typeof e == "number") {
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

    if (e.length != a.length) {
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
  toBeEqualishQuat2(a: any[], e: number[] | Float32Array, epsilon: number = EPSILON) {
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

// export const Helper = {
//   toBe: function (a) {
//     assert.strictEqual(e, a);
//   },
//   toEqual: function (a) {
//     assert.strictEqual(e, a);
//   },
//   toBeDefined: function () {
//     assert.notStrictEqual(e, undefined);
//   },
//   toBeTruthy: function () {
//     assert(e);
//   },
//   toBeFalsy: function () {
//     assert(!e);
//   },
//   toBeNull: function () {
//     assert.strictEqual(e, null);
//   },
//   not: {
//     toBe: function (a) {
//       assert.notStrictEqual(e, a);
//     },

//     toBeEqualish: function (a) {
//       if (typeof e == "number") assert(Math.abs(e - a) >= EPSILON);

//       if (e.length != a.length) return;
//       for (let i = 0; i < e.length; i++) {
//         if (isNaN(e[i]) !== isNaN(a[i])) return;
//         if (Math.abs(e[i] - a[i]) >= EPSILON) return;
//       }

//       assert.fail(e, a);
//     },
//   },
//   toBeGreaterThan: function (a) {
//     assert(e > a);
//   },
//   toBeLessThan: function (a) {
//     assert(e < a);
//   },

//   toBeEqualish: function (a) {},

//
// };
