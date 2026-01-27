import * as quat from "../src/quat";
import * as quat2 from "../src/quat2";
import * as mat4 from "../src/mat4";
import { describe, beforeEach, it, expect } from "bun:test";
import "./helpers";
import type { Quat, Quat2, Vec3 } from "../src/types";

describe("quat2", () => {
  let out: Quat2;
  let outVec: Vec3;
  let quat2A: Quat2;
  let quat2B: Quat2;
  let result: Quat2;
  let resultVec: Vec3;
  let outQuat: Quat;
  let vec: Vec3;

  beforeEach(() => {
    quat2A = [1, 2, 3, 4, 2, 5, 6, -2];
    quat2B = [5, 6, 7, 8, 9, 8, 6, -4];
    out = [0, 0, 0, 0, 0, 0, 0, 0];
    outVec = [0, 0, 0];
    outQuat = [0, 0, 0, 0];
    vec = [1, 1, -1];
  });

  describe("translate", () => {
    const matrixA = mat4.create();
    const matOut = mat4.create();
    const quatOut = quat2.create();
    beforeEach(() => {
      //quat2A only seems to work when created using this function?
      quat2B = quat2.fromRotationTranslation(quat2A, [1, 2, 3, 4], [-5, 4, 10]);
      quat2.normalize(quat2A, quat2A);
      mat4.fromQuat2(matrixA, quat2A);
    });

    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat2.translate(out, quat2A, vec);
        //Same thing with a matrix
        mat4.translate(matOut, matrixA, vec);
        quat2.fromMat4(quatOut, matOut);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2(quatOut);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2(quat2B);
      });
      it("should not modify vec", () => {
        expect(vec).toBeEqualish([1, 1, -1]);
      });
    });

    describe("when quat2A is the output quaternion", () => {
      beforeEach(() => {
        result = quat2.translate(quat2A, quat2A, vec);
        //Same thing with a matrix
        mat4.translate(matOut, matrixA, vec);
        quat2.fromMat4(quatOut, matOut);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualishQuat2(quatOut);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
    });
  });

  describe("rotateAroundAxis", () => {
    const matrixA = mat4.create(),
      matOut = mat4.create(),
      ax = [1, 4, 2];
    beforeEach(() => {
      //quat2A only seems to work when created using this function?
      quat2.fromRotationTranslation(quat2A, [1, 2, 3, 4], [-5, 4, 10]);
      quat2.normalize(quat2A, quat2A);
      mat4.fromQuat2(matrixA, quat2A);
    });

    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat2.rotateAroundAxis(out, quat2A, ax, 5);

        //Same thing with a matrix
        mat4.rotate(matOut, matrixA, 5, ax);
        quat2.fromMat4(quat2B, matOut);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2(quat2B);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([
          0.18257418583505536, 0.3651483716701107, 0.5477225575051661, 0.7302967433402214, -2.556038601690775,
          3.742770809618635, 2.37346441585572, -3.0124740662784135,
        ]);
      });
      it("should not modify ax", () => {
        expect(ax).toBeEqualish([1, 4, 2]);
      });
    });

    describe("when quat2A is the output quaternion", () => {
      beforeEach(() => {
        result = quat2.rotateAroundAxis(quat2A, quat2A, ax, 5);
        //Same thing with a matrix

        mat4.rotate(matOut, matrixA, 5, ax);
        quat2.fromMat4(quat2B, matOut);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualishQuat2(quat2B);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
      it("should not modify ax", () => {
        expect(ax).toBeEqualish([1, 4, 2]);
      });
    });
  });

  describe("rotateByQuatAppend", () => {
    const correctResult = quat2.create();
    const rotationQuat = quat2.create();
    beforeEach(() => {
      rotationQuat[0] = 2;
      rotationQuat[1] = 5;
      rotationQuat[2] = 2;
      rotationQuat[3] = -10;
      quat2.multiply(correctResult, quat2A, rotationQuat);
    });
    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat2.rotateByQuatAppend(out, quat2A, [2, 5, 2, -10]);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2(correctResult);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
      it("should not modify the rotation quaternion", () => {
        expect(rotationQuat).toBeEqualishQuat2([2, 5, 2, -10, 0, 0, 0, 0]);
      });
    });

    describe("when quat2A is the output quaternion", () => {
      beforeEach(() => {
        result = quat2.rotateByQuatAppend(quat2A, quat2A, [2, 5, 2, -10]);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualishQuat2(correctResult);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
      it("should not modify the rotation quaternion", () => {
        expect(rotationQuat).toBeEqualishQuat2([2, 5, 2, -10, 0, 0, 0, 0]);
      });
    });
  });

  describe("rotateByQuatPrepend", () => {
    const correctResult = quat2.create();
    const rotationQuat = quat2.create();
    beforeEach(() => {
      rotationQuat[0] = 2;
      rotationQuat[1] = 5;
      rotationQuat[2] = 2;
      rotationQuat[3] = -10;
      quat2.multiply(correctResult, rotationQuat, quat2A);
    });
    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat2.rotateByQuatPrepend(out, quat2.getReal(outQuat, rotationQuat), quat2A);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2(correctResult);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
      it("should not modify the rotation quaternion", () => {
        expect(rotationQuat).toBeEqualishQuat2([2, 5, 2, -10, 0, 0, 0, 0]);
      });
    });

    describe("when quat2A is the output quaternion", () => {
      beforeEach(() => {
        result = quat2.rotateByQuatPrepend(quat2A, quat2.getReal(outQuat, rotationQuat), quat2A);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualishQuat2(correctResult);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
      it("should not modify the rotation quaternion", () => {
        expect(rotationQuat).toBeEqualishQuat2([2, 5, 2, -10, 0, 0, 0, 0]);
      });
    });
  });

  describe("rotateX", () => {
    const matrixA = mat4.create(),
      matOut = mat4.create(),
      quatOut = quat2.create();
    beforeEach(() => {
      //quat2A only seems to work when created using this function?
      quat2B = quat2.fromRotationTranslation(quat2A, [1, 2, 3, 4], [-5, 4, 10]);
      quat2.normalize(quat2A, quat2A);
      mat4.fromQuat2(matrixA, quat2A);
    });
    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat2.rotateX(out, quat2A, 5);
        //Same thing with a matrix
        mat4.rotateX(matOut, matrixA, 5);
        quat2.fromMat4(quatOut, matOut);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2(quatOut);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2(quat2B);
      });
    });

    describe("when quat2A is the output quaternion", () => {
      beforeEach(() => {
        result = quat2.rotateX(quat2A, quat2A, 5);
        //Same thing with a matrix
        mat4.rotateX(matOut, matrixA, 5);
        quat2.fromMat4(quatOut, matOut);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualishQuat2(quatOut);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
    });
  });

  describe("rotateY", () => {
    const matrixA = mat4.create(),
      matOut = mat4.create(),
      quatOut = quat2.create();
    beforeEach(() => {
      //quat2A only seems to work when created using this function?
      quat2B = quat2.fromRotationTranslation(quat2A, [1, 2, 3, 4], [5, 4, -10]);
      quat2.normalize(quat2A, quat2A);
      mat4.fromQuat2(matrixA, quat2A);
    });

    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat2.rotateY(out, quat2A, -2);
        //Same thing with a matrix
        mat4.rotateY(matOut, matrixA, -2);
        quat2.fromMat4(quatOut, matOut);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2(quatOut);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2(quat2B);
      });
    });

    describe("when quat2A is the output quaternion", () => {
      beforeEach(() => {
        result = quat2.rotateY(quat2A, quat2A, -2);
        //Same thing with a matrix
        mat4.rotateY(matOut, matrixA, -2);
        quat2.fromMat4(quatOut, matOut);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualishQuat2(quatOut);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
    });
  });

  describe("rotateZ", () => {
    const matrixA = mat4.create(),
      matOut = mat4.create(),
      quatOut = quat2.create();
    beforeEach(() => {
      //quat2A only seems to work when created using this function?
      quat2B = quat2.fromRotationTranslation(quat2A, [1, 0, 3, -4], [0, -4, -10]);
      quat2.normalize(quat2A, quat2A);
      mat4.fromQuat2(matrixA, quat2A);
    });
    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat2.rotateZ(out, quat2A, 1);
        //Same thing with a matrix
        mat4.rotateZ(matOut, matrixA, 1);
        quat2.fromMat4(quatOut, matOut);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2(quatOut);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2(quat2B);
      });
    });

    describe("when quat2A is the output quaternion", () => {
      beforeEach(() => {
        result = quat2.rotateZ(quat2A, quat2A, 1);
        //Same thing with a matrix
        mat4.rotateZ(matOut, matrixA, 1);
        quat2.fromMat4(quatOut, matOut);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualishQuat2(quatOut);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
    });
  });

  describe("from/toMat4", () => {
    let matRes = mat4.create();
    const matOut = mat4.create();
    const rotationQuat = quat.create();
    describe("quat to matrix and back", () => {
      beforeEach(() => {
        quat.normalize(rotationQuat, [1, 2, 3, 4]);

        quat2.fromRotationTranslation(quat2A, rotationQuat, [1, -5, 3]);
        matRes = mat4.fromQuat2(matOut, quat2A);

        result = quat2.fromMat4(out, matRes);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should return matOut", () => {
        expect(matRes).toBe(matOut);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([
          0.18257418, 0.36514836, 0.54772257, 0.73029673, -1.5518806, -1.82574184, 1.73445473, 0,
        ]);
      });

      it("should be equal to the starting dual quat", () => {
        expect(quat2A).toBeEqualishQuat2(result);
      });
    });
  });

  describe("create", () => {
    beforeEach(() => {
      result = quat2.create();
    });
    it("should return 2 4 element arrays initialized to an identity dual quaternion", () => {
      expect(result).toBeEqualishQuat2([0, 0, 0, 1, 0, 0, 0, 0]);
    });
  });

  describe("clone", () => {
    beforeEach(() => {
      result = quat2.clone(quat2A);
    });
    it("should return 2 4 element arrays initialized to the values in quat2A", () => {
      expect(result).toBeEqualishQuat2(quat2A);
    });
  });

  describe("fromValues", () => {
    beforeEach(() => {
      result = quat2.fromValues(1, 2, 3, 4, 5, 7, 8, -2);
    });
    it("should return 2 4 element arrays initialized to the values passedd to the values passed", () => {
      expect(result).toBeEqualishQuat2([1, 2, 3, 4, 5, 7, 8, -2]);
    });
  });

  describe("copy", () => {
    beforeEach(() => {
      result = quat2.copy(out, quat2A);
    });
    it("should place values into out", () => {
      expect(out).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
  });

  describe("set", () => {
    beforeEach(() => {
      result = quat2.set(out, 1, 2, 3, 4, 2, 5, 6, -2);
    });
    it("should place values into out", () => {
      expect(out).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
  });

  describe("identity", () => {
    beforeEach(() => {
      result = quat2.identity(out);
    });
    it("should place values into out", () => {
      expect(result).toBeEqualishQuat2([0, 0, 0, 1, 0, 0, 0, 0]);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
  });

  describe("add", () => {
    describe("with a separate output dual quaternion", () => {
      beforeEach(() => {
        result = quat2.add(out, quat2A, quat2B);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2([6, 8, 10, 12, 11, 13, 12, -6]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
      it("should not modify quat2B", () => {
        expect(quat2B).toBeEqualishQuat2([5, 6, 7, 8, 9, 8, 6, -4]);
      });
    });

    describe("when quat2A is the output dual quaternion", () => {
      beforeEach(() => {
        result = quat2.add(quat2A, quat2A, quat2B);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([6, 8, 10, 12, 11, 13, 12, -6]);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
      it("should not modify quat2B", () => {
        expect(quat2B).toBeEqualishQuat2([5, 6, 7, 8, 9, 8, 6, -4]);
      });
    });

    describe("when quat2B is the output dual quaternion", () => {
      beforeEach(() => {
        result = quat2.add(quat2B, quat2A, quat2B);
      });

      it("should place values into quat2B", () => {
        expect(quat2B).toBeEqualishQuat2([6, 8, 10, 12, 11, 13, 12, -6]);
      });
      it("should return quat2B", () => {
        expect(result).toBe(quat2B);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
    });
  });

  describe("multiply", () => {
    it("should have an alias called 'mul'", () => {
      expect(quat2.mul).toEqual(quat2.multiply);
    });

    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat2.multiply(out, quat2A, quat2B);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2([24, 48, 48, -6, 25, 89, 23, -157]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
      it("should not modify quat2B", () => {
        expect(quat2B).toBeEqualishQuat2([5, 6, 7, 8, 9, 8, 6, -4]);
      });
    });

    describe("when quat2A is the output quaternion", () => {
      beforeEach(() => {
        result = quat2.multiply(quat2A, quat2A, quat2B);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([24, 48, 48, -6, 25, 89, 23, -157]);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
      it("should not modify quat2B", () => {
        expect(quat2B).toBeEqualishQuat2([5, 6, 7, 8, 9, 8, 6, -4]);
      });
    });

    describe("when quat2B is the output quaternion", () => {
      beforeEach(() => {
        result = quat2.multiply(quat2B, quat2A, quat2B);
      });

      it("should place values into quat2B", () => {
        expect(quat2B).toBeEqualishQuat2([24, 48, 48, -6, 25, 89, 23, -157]);
      });
      it("should return quat2B", () => {
        expect(result).toBe(quat2B);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
    });

    describe("same as matrix multiplication", () => {
      const matrixA = mat4.create(),
        matrixB = mat4.create();
      const matOut = mat4.create(),
        quatOut = quat2.create();
      beforeEach(() => {
        //quat2A and quat2B only seem to work when created using this function?
        quat2.fromRotationTranslation(quat2A, [1, 2, 3, 4], [-5, 4, 10]);
        quat2.normalize(quat2A, quat2A);
        mat4.fromQuat2(matrixA, quat2A);

        quat2.fromRotationTranslation(quat2B, [5, 6, 7, 8], [9, 8, 6]);
        quat2.normalize(quat2B, quat2B);
        mat4.fromQuat2(matrixB, quat2B);
      });
      it("the matrices should be equal to the dual quaternions", () => {
        const testQuat = quat2.create();
        quat2.fromMat4(testQuat, matrixA);
        expect(testQuat).toBeEqualishQuat2(quat2A);

        quat2.fromMat4(testQuat, matrixB);
        expect(testQuat).toBeEqualishQuat2(quat2B);
      });

      it("should be equal to the matrix multiplication", () => {
        quat2.multiply(out, quat2A, quat2B);
        mat4.mul(matOut, matrixA, matrixB);
        quat2.fromMat4(quatOut, matOut);
        expect(out).toBeEqualishQuat2(quatOut);
      });
    });
  });

  describe("scale", () => {
    describe("with a separate output dual quaternion", () => {
      beforeEach(() => {
        result = quat2.scale(out, quat2A, 2);
      });
      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2([2, 4, 6, 8, 4, 10, 12, -4]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
    });

    describe("when quat2A is the output dual quaternion", () => {
      beforeEach(() => {
        result = quat2.scale(quat2A, quat2A, 2);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([2, 4, 6, 8, 4, 10, 12, -4]);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
    });
  });

  describe("length", () => {
    let result: number;

    it("should have an alias called 'len'", () => {
      expect(quat2.len).toEqual(quat2.length);
    });

    beforeEach(() => {
      result = quat2.length(quat2A);
    });

    it("should return the length", () => {
      expect(result).toBeEqualish(5.477225);
    });
  });

  describe("squaredLength", () => {
    let result: number;

    it("should have an alias called 'sqrLen'", () => {
      expect(quat2.sqrLen).toEqual(quat2.squaredLength);
    });

    beforeEach(() => {
      result = quat2.squaredLength(quat2A);
    });

    it("should return the squared length", () => {
      expect(result).toEqual(30);
    });
  });

  describe("fromRotation", () => {
    beforeEach(() => {
      result = quat2.fromRotation(out, [1, 2, 3, 4]);
    });
    it("should place values into out", () => {
      expect(out).toBeEqualishQuat2([1, 2, 3, 4, 0, 0, 0, 0]);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
    it("should not modify the quaternion", () => {
      expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
    });
  });

  describe("fromTranslation", () => {
    beforeEach(() => {
      vec = [1, 2, 3];
      result = quat2.fromTranslation(out, vec);
    });
    it("should place values into out", () => {
      expect(out).toBeEqualishQuat2([0, 0, 0, 1, 0.5, 1, 1.5, 0]);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
    it("should not modify the vector", () => {
      expect(vec).toBeEqualish([1, 2, 3]);
    });
  });

  describe("fromRotationTranslation", () => {
    beforeEach(() => {
      vec = [1, 2, 3];
      result = quat2.fromRotationTranslation(out, [1, 2, 3, 4], vec);
    });
    it("should place values into out", () => {
      expect(out).toBeEqualishQuat2([1, 2, 3, 4, 2, 4, 6, -7]);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
    it("should not modify the quaternion", () => {
      expect(quat2.getReal(outQuat, quat2A)).toBeEqualish([1, 2, 3, 4]);
    });
    it("should not modify the vector", () => {
      expect(vec).toBeEqualish([1, 2, 3]);
    });
    it("should have a translation that can be retrieved with getTranslation", () => {
      const t = [0, 0, 0];
      quat2.normalize(out, out);
      quat2.getTranslation(t, out);

      expect(t).toBeEqualish([1, 2, 3]);
    });
  });

  describe("fromRotationTranslationValues", () => {
    beforeEach(() => {
      result = quat2.fromRotationTranslationValues(1, 2, 3, 4, 1, 2, 3);
    });
    it("should return the correct result", () => {
      expect(result).toBeEqualishQuat2([1, 2, 3, 4, 2, 4, 6, -7]);
    });
    it("should have a translation that can be retrieved with getTranslation", () => {
      const t = [0, 0, 0];
      quat2.normalize(result, result);
      quat2.getTranslation(t, result);
      expect(t).toBeEqualish([1, 2, 3]);
    });
  });

  describe("getTranslation", () => {
    describe("without a real part", () => {
      beforeEach(() => {
        quat2.fromTranslation(out, [1, 2, 3]);
        resultVec = quat2.getTranslation(outVec, out);
      });
      describe("not normalized", () => {
        it("should return the same translation value", () => {
          expect(outVec).toBeEqualish([1, 2, 3]);
        });
        it("should return out", () => {
          expect(outVec).toBe(resultVec);
        });
      });
      describe("normalized", () => {
        it("should return the same translation value", () => {
          quat2.normalize(outVec, outVec);
          expect(outVec).toBeEqualish([1, 2, 3]);
        });
      });
    });
    describe("with a real part", () => {
      beforeEach(() => {
        quat2.fromRotationTranslation(out, [2, 4, 6, 2], [1, 2, 3]);
        resultVec = quat2.getTranslation(outVec, out);
      });
      describe("not normalized", () => {
        it("should not return the same translation value", () => {
          expect(outVec).not.toBeEqualish([1, 2, 3]);
        });
        it("should return out", () => {
          expect(outVec).toBe(resultVec);
        });
      });
      describe("normalized", () => {
        it("should return the same translation value", () => {
          quat2.normalize(out, out);
          quat2.getTranslation(outVec, out);
          expect(outVec).toBeEqualish([1, 2, 3]);
        });
      });
    });
  });

  describe("normalize", () => {
    describe("when it is normalizing quat2A", () => {
      beforeEach(() => {
        quat2A = [1, 2, 3, 4, 2, 5, 6, -2];
        quat2.normalize(out, quat2A);
      });
      it("both parts should have been normalized", () => {
        expect(out).toBeEqualishQuat2([
          1 / 5.4772255,
          2 / 5.4772255,
          3 / 5.4772255,
          4 / 5.4772255,
          0.23126,
          0.6450954,
          0.693781,
          -0.9006993,
        ]);
      });
    });

    beforeEach(() => {
      quat2A = [5, 0, 0, 0, 0, 0, 0, 0];
    });

    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat2.normalize(out, quat2A);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2([1, 0, 0, 0, 0, 0, 0, 0]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([5, 0, 0, 0, 0, 0, 0, 0]);
      });
    });

    describe("when quat2A is the output quaternion", () => {
      beforeEach(() => {
        result = quat2.normalize(quat2A, quat2A);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 0, 0, 0, 0, 0, 0, 0]);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
    });

    describe("when it contains a translation", () => {
      beforeEach(() => {
        quat2.set(out, 5, 0, 0, 0, 1, 2, 3, 5);
        quat2.normalize(out, out);
      });
      it("both parts should have been normalized", () => {
        expect(out).toBeEqualishQuat2([1, 0, 0, 0, 0, 0.4, 0.6, 1]);
      });
    });
  });

  describe("lerp", () => {
    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat2.lerp(out, quat2A, quat2B, 0.7);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2([3.8, 4.8, 5.8, 6.8, 6.9, 7.1, 6.0, -3.4]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
      it("should not modify quat2B", () => {
        expect(quat2B).toBeEqualishQuat2([5, 6, 7, 8, 9, 8, 6, -4]);
      });
    });

    describe("when quat2A is the output quaternion", () => {
      beforeEach(() => {
        result = quat2.lerp(quat2A, quat2A, quat2B, 0.5);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([3, 4, 5, 6, 5.5, 6.5, 6, -3]);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
      it("should not modify quat2B", () => {
        expect(quat2B).toBeEqualishQuat2([5, 6, 7, 8, 9, 8, 6, -4]);
      });
    });

    describe("when quat2B is the output quaternion", () => {
      beforeEach(() => {
        result = quat2.lerp(quat2B, quat2A, quat2B, 0.5);
      });

      it("should place values into quat2B", () => {
        expect(quat2B).toBeEqualishQuat2([3, 4, 5, 6, 5.5, 6.5, 6, -3]);
      });
      it("should return quat2B", () => {
        expect(result).toBe(quat2B);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
    });

    describe("shortest path", () => {
      beforeEach(() => {
        result = quat2.lerp(out, [1, 2, 3, -4, 2, 5, 6, -2], [5, -6, 7, 8, 9, 8, 6, -4], 0.4);
      });
      it("should pick the shorter path", () => {
        expect(out).toBeEqualishQuat2([-1.4, 3.6, -1, -5.6, -2.4, -0.2, 1.2, 0.4]);
      });
    });
  });

  describe("dot", () => {
    describe("with a separate output dual quaternion", () => {
      let result: number;

      beforeEach(() => {
        result = quat2.dot(quat2A, quat2B);
      });
      it("should return the dot product", () => {
        expect(result).toBeEqualish(70);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
      it("should not modify quat2B", () => {
        expect(quat2B).toBeEqualishQuat2([5, 6, 7, 8, 9, 8, 6, -4]);
      });
    });
  });

  describe("invert", () => {
    let result: Quat2 | null;
    describe("with a separate output dual quaternion", () => {
      beforeEach(() => {
        result = quat2.invert(out, quat2A);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2([
          -0.0333333333,
          -0.06666666666,
          -0.1,
          0.13333333333,
          -2 / 30,
          -5 / 30,
          -6 / 30,
          -2 / 30,
        ]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
      it("the real part should be equal to a inverted quaternion", () => {
        quat.invert(outQuat, [1, 2, 3, 4]);

        expect(quat2.getReal(outQuat, out)).toBeEqualish(outQuat);
      });
      it("can't find inverted", () => {
        const result = quat2.invert(quat2A, [0, 0, 0, 0, 0, 0, 0, 0]);
        expect(result).toBeNull();
      });
    });

    describe("when quat2A is the output quaternion", () => {
      beforeEach(() => {
        result = quat2.invert(quat2A, quat2A);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualish([
          -0.0333333333,
          -0.06666666666,
          -0.1,
          0.13333333333,
          -2 / 30,
          -5 / 30,
          -6 / 30,
          -2 / 30,
        ]);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
    });
  });

  describe("get real/dual", () => {
    describe("get real", () => {
      beforeEach(() => {
        result = quat2.getReal(outQuat, quat2A);
      });

      it("should place values into out", () => {
        expect(outQuat).toBeEqualish([1, 2, 3, 4]);
      });
      it("should return out", () => {
        expect(result).toBe(outQuat);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
    });

    describe("get dual", () => {
      beforeEach(() => {
        result = quat2.getDual(outQuat, quat2A);
      });

      it("should place values into out", () => {
        expect(outQuat).toBeEqualish([2, 5, 6, -2]);
      });
      it("should return out", () => {
        expect(result).toBe(outQuat);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
    });
  });

  describe("set real/dual", () => {
    describe("set real", () => {
      beforeEach(() => {
        outQuat = [4, 6, 8, -100];
        result = quat2.setReal(quat2A, outQuat);
      });

      it("should place values into out", () => {
        expect(quat2A).toBeEqualishQuat2([4, 6, 8, -100, 2, 5, 6, -2]);
      });
      it("should return out", () => {
        expect(result).toBe(quat2A);
      });
      it("should not modify outQuat", () => {
        expect(outQuat).toBeEqualish([4, 6, 8, -100]);
      });
    });

    describe("set dual", () => {
      beforeEach(() => {
        outQuat = [4.3, 6, 8, -100];
        result = quat2.setDual(quat2A, outQuat);
      });

      it("should place values into out", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 4.3, 6, 8, -100]);
      });
      it("should return out", () => {
        expect(result).toBe(quat2A);
      });
      it("should not modify outQuat", () => {
        expect(outQuat).toBeEqualish([4.3, 6, 8, -100]);
      });
    });
  });

  describe("conjugate", () => {
    describe("with a separate output dual quaternion", () => {
      beforeEach(() => {
        result = quat2.conjugate(out, quat2A);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualishQuat2([-1, -2, -3, 4, -2, -5, -6, -2]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([1, 2, 3, 4, 2, 5, 6, -2]);
      });
    });

    describe("when quat2A is the output dual quaternion", () => {
      beforeEach(() => {
        result = quat2.conjugate(quat2A, quat2A);
      });

      it("should place values into quat2A", () => {
        expect(quat2A).toBeEqualishQuat2([-1, -2, -3, 4, -2, -5, -6, -2]);
      });
      it("should return quat2A", () => {
        expect(result).toBe(quat2A);
      });
    });
  });

  describe("str", () => {
    let result: string;

    beforeEach(() => {
      result = quat2.str(quat2A);
    });

    it("should return a string representation of the quaternion", () => {
      expect(result).toEqual("quat2(1, 2, 3, 4, 2, 5, 6, -2)");
    });
  });

  describe("exactEquals", () => {
    let quat2C: Quat2;
    let r0: boolean;
    let r1: boolean;
    beforeEach(() => {
      quat2A = [0, 1, 2, 3, 4, 5, 6, 7];
      quat2B = [0, 1, 2, 3, 4, 5, 6, 7];
      quat2C = [1, 2, 3, 4, 5, 6, 7, 8];
      r0 = quat2.exactEquals(quat2A, quat2B);
      r1 = quat2.exactEquals(quat2A, quat2C);
    });

    it("should return true for identical quaternions", () => {
      expect(r0).toBe(true);
    });
    it("should return false for different quaternions", () => {
      expect(r1).toBe(false);
    });
    it("should not modify quat2A", () => {
      expect(quat2A).toBeEqualishQuat2([0, 1, 2, 3, 4, 5, 6, 7]);
    });
    it("should not modify quat2B", () => {
      expect(quat2B).toBeEqualishQuat2([0, 1, 2, 3, 4, 5, 6, 7]);
    });
  });

  describe("equals", () => {
    let quat2C: Quat2;
    let quat2D: Quat2;
    let r0: boolean;
    let r1: boolean;
    let r2: boolean;
    beforeEach(() => {
      quat2A = [0, 1, 2, 3, 4, 5, 6, 7];
      quat2B = [0, 1, 2, 3, 4, 5, 6, 7];
      quat2C = [1, 2, 3, 4, 5, 6, 7, 8];
      quat2D = [1e-16, 1, 2, 3, 4, 5, 6, 7];
      r0 = quat2.equals(quat2A, quat2B);
      r1 = quat2.equals(quat2A, quat2C);
      r2 = quat2.equals(quat2A, quat2D);
    });
    it("should return true for identical dual quaternions", () => {
      expect(r0).toBe(true);
    });
    it("should return false for different dual quaternions", () => {
      expect(r1).toBe(false);
    });
    it("should return true for close but not identical quaternions", () => {
      expect(r2).toBe(true);
    });
    it("should not modify quat2A", () => {
      expect(quat2A).toBeEqualishQuat2([0, 1, 2, 3, 4, 5, 6, 7]);
    });
    it("should not modify quat2B", () => {
      expect(quat2B).toBeEqualishQuat2([0, 1, 2, 3, 4, 5, 6, 7]);
    });
  });
});
