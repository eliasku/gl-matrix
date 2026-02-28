import * as mat2d from "../src/mat2d";
import { describe, beforeEach, it, expect } from "bun:test";
import "./helpers";
import type { Mat2d, Vec2 } from "../src/types";

describe("mat2d", () => {
  let out: Mat2d;
  let matA: Mat2d;
  let matB: Mat2d;
  let oldA: Mat2d;
  let oldB: Mat2d;
  let identity: Mat2d;
  let nonInvertible: Mat2d;
  let result: Mat2d;

  beforeEach(() => {
    matA = [1, 2, 3, 4, 5, 6];
    oldA = [1, 2, 3, 4, 5, 6];
    matB = [7, 8, 9, 10, 11, 12];
    oldB = [7, 8, 9, 10, 11, 12];
    out = [0, 0, 0, 0, 0, 0];
    identity = [1, 0, 0, 1, 0, 0];
    nonInvertible = [1, 0, 1, 0, 1, 0];
  });

  describe("create", () => {
    beforeEach(() => {
      result = mat2d.create();
    });
    it("should return a 6 element array initialized to a 2x3 identity matrix", () => {
      expect(result).toBeEqualish(identity);
    });
  });

  describe("clone", () => {
    beforeEach(() => {
      result = mat2d.clone(matA);
    });
    it("should return a 6 element array initialized to the values in matA", () => {
      expect(result).toBeEqualish(matA);
    });
  });

  describe("copy", () => {
    beforeEach(() => {
      result = mat2d.copy(out, matA);
    });
    it("should place values into out", () => {
      expect(out).toBeEqualish(matA);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
  });

  describe("identity", () => {
    beforeEach(() => {
      result = mat2d.identity(out);
    });
    it("should place values into out", () => {
      expect(result).toBeEqualish(identity);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
  });

  describe("invert", () => {
    let result: Mat2d | null;
    describe("with a separate output matrix", () => {
      beforeEach(() => {
        result = mat2d.invert(out, matA);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([-2, 1, 1.5, -0.5, 1, -2]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify matA", () => {
        expect(matA).toBeEqualish(oldA);
      });
    });

    describe("when matA is the output matrix", () => {
      beforeEach(() => {
        result = mat2d.invert(matA, matA);
      });

      it("should place values into matA", () => {
        expect(matA).toBeEqualish([-2, 1, 1.5, -0.5, 1, -2]);
      });
      it("should return matA", () => {
        expect(result).toBe(matA);
      });
    });

    describe("when matrix is not invertible", () => {
      beforeEach(() => {
        result = mat2d.invert(out, nonInvertible);
      });

      it("should return null", () => {
        expect(result).toBe(null);
      });
    });
  });

  describe("determinant", () => {
    let result: number;
    beforeEach(() => {
      result = mat2d.determinant(matA);
    });

    it("should return the determinant", () => {
      expect(result).toEqual(-2);
    });
  });

  describe("multiply", () => {
    it("should have an alias called 'mul'", () => {
      expect(mat2d.mul).toEqual(mat2d.multiply);
    });

    describe("with a separate output matrix", () => {
      beforeEach(() => {
        result = mat2d.multiply(out, matA, matB);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([31, 46, 39, 58, 52, 76]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify matA", () => {
        expect(matA).toBeEqualish(oldA);
      });
      it("should not modify matB", () => {
        expect(matB).toBeEqualish(oldB);
      });
    });

    describe("when matA is the output matrix", () => {
      beforeEach(() => {
        result = mat2d.multiply(matA, matA, matB);
      });

      it("should place values into matA", () => {
        expect(matA).toBeEqualish([31, 46, 39, 58, 52, 76]);
      });
      it("should return matA", () => {
        expect(result).toBe(matA);
      });
      it("should not modify matB", () => {
        expect(matB).toBeEqualish(oldB);
      });
    });

    describe("when matB is the output matrix", () => {
      beforeEach(() => {
        result = mat2d.multiply(matB, matA, matB);
      });

      it("should place values into matB", () => {
        expect(matB).toBeEqualish([31, 46, 39, 58, 52, 76]);
      });
      it("should return matB", () => {
        expect(result).toBe(matB);
      });
      it("should not modify matA", () => {
        expect(matA).toBeEqualish(oldA);
      });
    });
  });

  describe("rotate", () => {
    describe("with a separate output matrix", () => {
      beforeEach(() => {
        result = mat2d.rotate(out, matA, Math.PI * 0.5);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([3, 4, -1, -2, 5, 6]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify matA", () => {
        expect(matA).toBeEqualish(oldA);
      });
    });

    describe("when matA is the output matrix", () => {
      beforeEach(() => {
        result = mat2d.rotate(matA, matA, Math.PI * 0.5);
      });

      it("should place values into matA", () => {
        expect(matA).toBeEqualish([3, 4, -1, -2, 5, 6]);
      });
      it("should return matA", () => {
        expect(result).toBe(matA);
      });
    });
  });

  describe("scale", () => {
    let vecA: Vec2;
    beforeEach(() => {
      vecA = [2, 3];
    });

    describe("with a separate output matrix", () => {
      beforeEach(() => {
        result = mat2d.scale(out, matA, vecA);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([2, 4, 9, 12, 5, 6]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify matA", () => {
        expect(matA).toBeEqualish(oldA);
      });
    });

    describe("when matA is the output matrix", () => {
      beforeEach(() => {
        result = mat2d.scale(matA, matA, vecA);
      });

      it("should place values into matA", () => {
        expect(matA).toBeEqualish([2, 4, 9, 12, 5, 6]);
      });
      it("should return matA", () => {
        expect(result).toBe(matA);
      });
    });
  });

  describe("translate", () => {
    let vecA: Vec2;
    beforeEach(() => {
      vecA = [2, 3];
    });

    describe("with a separate output matrix", () => {
      beforeEach(() => {
        result = mat2d.translate(out, matA, vecA);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([1, 2, 3, 4, 16, 22]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify matA", () => {
        expect(matA).toBeEqualish(oldA);
      });
    });

    describe("when matA is the output matrix", () => {
      beforeEach(() => {
        result = mat2d.translate(matA, matA, vecA);
      });

      it("should place values into matA", () => {
        expect(matA).toBeEqualish([1, 2, 3, 4, 16, 22]);
      });
      it("should return matA", () => {
        expect(result).toBe(matA);
      });
    });
  });

  describe("str", () => {
    let result: string;
    beforeEach(() => {
      result = mat2d.str(matA);
    });

    it("should return a string representation of the matrix", () => {
      expect(result).toEqual("mat2d(1, 2, 3, 4, 5, 6)");
    });
  });

  describe("frob", () => {
    let result: number;
    beforeEach(() => {
      result = mat2d.frob(matA);
    });
    it("should return the Frobenius Norm of the matrix", () => {
      expect(result).toEqual(Math.sqrt(1 ** 2 + 2 ** 2 + 3 ** 2 + 4 ** 2 + 5 ** 2 + 6 ** 2 + 1));
    });
  });

  describe("add", () => {
    describe("with a separate output matrix", () => {
      beforeEach(() => {
        result = mat2d.add(out, matA, matB);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([8, 10, 12, 14, 16, 18]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify matA", () => {
        expect(matA).toBeEqualish(oldA);
      });
      it("should not modify matB", () => {
        expect(matB).toBeEqualish(oldB);
      });
    });

    describe("when matA is the output matrix", () => {
      beforeEach(() => {
        result = mat2d.add(matA, matA, matB);
      });

      it("should place values into matA", () => {
        expect(matA).toBeEqualish([8, 10, 12, 14, 16, 18]);
      });
      it("should return matA", () => {
        expect(result).toBe(matA);
      });
      it("should not modify matB", () => {
        expect(matB).toBeEqualish(oldB);
      });
    });

    describe("when matB is the output matrix", () => {
      beforeEach(() => {
        result = mat2d.add(matB, matA, matB);
      });

      it("should place values into matB", () => {
        expect(matB).toBeEqualish([8, 10, 12, 14, 16, 18]);
      });
      it("should return matB", () => {
        expect(result).toBe(matB);
      });
      it("should not modify matA", () => {
        expect(matA).toBeEqualish(oldA);
      });
    });
  });

  describe("subtract", () => {
    it("should have an alias called 'sub'", () => {
      expect(mat2d.sub).toEqual(mat2d.subtract);
    });

    describe("with a separate output matrix", () => {
      beforeEach(() => {
        result = mat2d.subtract(out, matA, matB);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([-6, -6, -6, -6, -6, -6]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify matA", () => {
        expect(matA).toBeEqualish(oldA);
      });
      it("should not modify matB", () => {
        expect(matB).toBeEqualish(oldB);
      });
    });

    describe("when matA is the output matrix", () => {
      beforeEach(() => {
        result = mat2d.subtract(matA, matA, matB);
      });

      it("should place values into matA", () => {
        expect(matA).toBeEqualish([-6, -6, -6, -6, -6, -6]);
      });
      it("should return matA", () => {
        expect(result).toBe(matA);
      });
      it("should not modify matB", () => {
        expect(matB).toBeEqualish(oldB);
      });
    });

    describe("when matB is the output matrix", () => {
      beforeEach(() => {
        result = mat2d.subtract(matB, matA, matB);
      });

      it("should place values into matB", () => {
        expect(matB).toBeEqualish([-6, -6, -6, -6, -6, -6]);
      });
      it("should return matB", () => {
        expect(result).toBe(matB);
      });
      it("should not modify matA", () => {
        expect(matA).toBeEqualish(oldA);
      });
    });
  });

  describe("fromValues", () => {
    beforeEach(() => {
      result = mat2d.fromValues(1, 2, 3, 4, 5, 6);
    });
    it("should return a 6 element array initialized to the values passed", () => {
      expect(result).toBeEqualish([1, 2, 3, 4, 5, 6]);
    });
  });

  describe("set", () => {
    beforeEach(() => {
      result = mat2d.set(out, 1, 2, 3, 4, 5, 6);
    });
    it("should place values into out", () => {
      expect(out).toBeEqualish([1, 2, 3, 4, 5, 6]);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
  });

  describe("multiplyScalar", () => {
    describe("with a separate output matrix", () => {
      beforeEach(() => {
        result = mat2d.multiplyScalar(out, matA, 2);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([2, 4, 6, 8, 10, 12]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify matA", () => {
        expect(matA).toBeEqualish([1, 2, 3, 4, 5, 6]);
      });
    });

    describe("when matA is the output matrix", () => {
      beforeEach(() => {
        result = mat2d.multiplyScalar(matA, matA, 2);
      });

      it("should place values into matA", () => {
        expect(matA).toBeEqualish([2, 4, 6, 8, 10, 12]);
      });
      it("should return matA", () => {
        expect(result).toBe(matA);
      });
    });
  });

  describe("multiplyScalarAndAdd", () => {
    describe("with a separate output matrix", () => {
      beforeEach(() => {
        result = mat2d.multiplyScalarAndAdd(out, matA, matB, 0.5);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([4.5, 6, 7.5, 9, 10.5, 12]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify matA", () => {
        expect(matA).toBeEqualish([1, 2, 3, 4, 5, 6]);
      });
      it("should not modify matB", () => {
        expect(matB).toBeEqualish([7, 8, 9, 10, 11, 12]);
      });
    });

    describe("when matA is the output matrix", () => {
      beforeEach(() => {
        result = mat2d.multiplyScalarAndAdd(matA, matA, matB, 0.5);
      });

      it("should place values into matA", () => {
        expect(matA).toBeEqualish([4.5, 6, 7.5, 9, 10.5, 12]);
      });
      it("should return matA", () => {
        expect(result).toBe(matA);
      });
      it("should not modify matB", () => {
        expect(matB).toBeEqualish([7, 8, 9, 10, 11, 12]);
      });
    });

    describe("when matB is the output matrix", () => {
      beforeEach(() => {
        result = mat2d.multiplyScalarAndAdd(matB, matA, matB, 0.5);
      });

      it("should place values into matB", () => {
        expect(matB).toBeEqualish([4.5, 6, 7.5, 9, 10.5, 12]);
      });
      it("should return matB", () => {
        expect(result).toBe(matB);
      });
      it("should not modify matA", () => {
        expect(matA).toBeEqualish([1, 2, 3, 4, 5, 6]);
      });
    });
  });

  describe("exactEquals", () => {
    let matC: Mat2d;
    let r0: boolean;
    let r1: boolean;
    beforeEach(() => {
      matA = [0, 1, 2, 3, 4, 5];
      matB = [0, 1, 2, 3, 4, 5];
      matC = [1, 2, 3, 4, 5, 6];
      r0 = mat2d.exactEquals(matA, matB);
      r1 = mat2d.exactEquals(matA, matC);
    });

    it("should return true for identical matrices", () => {
      expect(r0).toBe(true);
    });
    it("should return false for different matrices", () => {
      expect(r1).toBe(false);
    });
    it("should not modify matA", () => {
      expect(matA).toBeEqualish([0, 1, 2, 3, 4, 5]);
    });
    it("should not modify matB", () => {
      expect(matB).toBeEqualish([0, 1, 2, 3, 4, 5]);
    });
  });

  describe("equals", () => {
    let matC: Mat2d;
    let matD: Mat2d;
    let r0: boolean;
    let r1: boolean;
    let r2: boolean;
    beforeEach(() => {
      matA = [0, 1, 2, 3, 4, 5];
      matB = [0, 1, 2, 3, 4, 5];
      matC = [1, 2, 3, 4, 5, 6];
      matD = [1e-16, 1, 2, 3, 4, 5];
      r0 = mat2d.equals(matA, matB);
      r1 = mat2d.equals(matA, matC);
      r2 = mat2d.equals(matA, matD);
    });
    it("should return true for identical matrices", () => {
      expect(r0).toBe(true);
    });
    it("should return false for different matrices", () => {
      expect(r1).toBe(false);
    });
    it("should return true for close but not identical matrices", () => {
      expect(r2).toBe(true);
    });
    it("should not modify matA", () => {
      expect(matA).toBeEqualish([0, 1, 2, 3, 4, 5]);
    });
    it("should not modify matB", () => {
      expect(matB).toBeEqualish([0, 1, 2, 3, 4, 5]);
    });
  });
});
