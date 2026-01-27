import * as mat3 from "../src/mat3";
import * as mat4 from "../src/mat4";
import * as quat from "../src/quat";
import * as vec3 from "../src/vec3";
import { describe, beforeEach, it, expect } from "bun:test";
import "./helpers";
import { AngleOrder } from "../src/AngleOrder";

describe("quat", () => {
  let out, quatA, quatB, result;
  let vec, id, deg90;

  beforeEach(() => {
    quatA = [1, 2, 3, 4];
    quatB = [5, 6, 7, 8];
    out = [0, 0, 0, 0];
    vec = [1, 1, -1];
    id = [0, 0, 0, 1];
    deg90 = Math.PI / 2;
  });

  describe("slerp", () => {
    describe("the normal case", () => {
      beforeEach(() => {
        result = quat.slerp(out, [0, 0, 0, 1], [0, 1, 0, 0], 0.5);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should calculate proper quat", () => {
        expect(result).toBeEqualish([0, 0.707106, 0, 0.707106]);
      });
    });

    describe("where a == b", () => {
      beforeEach(() => {
        result = quat.slerp(out, [0, 0, 0, 1], [0, 0, 0, 1], 0.5);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should calculate proper quat", () => {
        expect(result).toBeEqualish([0, 0, 0, 1]);
      });
    });

    describe("where theta == 180deg", () => {
      beforeEach(() => {
        quat.rotateX(quatA, [1, 0, 0, 0], Math.PI); // 180 deg
        result = quat.slerp(out, [1, 0, 0, 0], quatA, 1);
      });

      it("should calculate proper quat", () => {
        expect(result).toBeEqualish([0, 0, 0, -1]);
      });
    });

    describe("where a == -b", () => {
      beforeEach(() => {
        result = quat.slerp(out, [1, 0, 0, 0], [-1, 0, 0, 0], 0.5);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should calculate proper quat", () => {
        expect(result).toBeEqualish([1, 0, 0, 0]);
      });
    });
  });

  describe("pow", () => {
    describe("identity quat", () => {
      beforeEach(() => {
        result = quat.pow(out, id, 2.1 /* random number */);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should be the identity", () => {
        expect(result).toBeEqualish(id);
      });
    });

    describe("power of one", () => {
      beforeEach(() => {
        quat.normalize(quatA, quatA);

        result = quat.pow(out, quatA, 1);
      });

      it("should be the identity", () => {
        expect(result).toBeEqualish(quatA);
      });
      it("should be normalized", () => {
        expect(quat.length(result)).toBeEqualish(1);
      });
    });

    describe("squared", () => {
      beforeEach(() => {
        quat.normalize(quatA, quatA);

        result = quat.pow(out, quatA, 2);
      });

      it("should be the square", () => {
        let reference = quat.multiply(quat.create(), quatA, quatA);
        expect(result).toBeEqualish(reference);
      });
      it("should be normalized", () => {
        expect(quat.length(result)).toBeEqualish(1);
      });
    });

    describe("conjugate", () => {
      beforeEach(() => {
        quat.normalize(quatA, quatA);

        result = quat.pow(out, quatA, -1);
      });

      it("should be the conjugate", () => {
        let reference = quat.conjugate(quat.create(), quatA);
        expect(result).toBeEqualish(reference);
      });
      it("should be normalized", () => {
        expect(quat.length(result)).toBeEqualish(1);
      });
    });

    describe("reversible", () => {
      beforeEach(() => {
        quat.normalize(quatA, quatA);

        let b = 2.1; // random number
        result = quat.pow(out, quatA, b);
        result = quat.pow(out, result, 1 / b);
      });

      it("should be reverted", () => {
        expect(result).toBeEqualish(quatA);
      });
      it("should be normalized", () => {
        expect(quat.length(result)).toBeEqualish(1);
      });
    });
  });

  describe("rotateX", () => {
    beforeEach(() => {
      result = quat.rotateX(out, id, deg90);
    });

    it("should return out", () => {
      expect(result).toBe(out);
    });
    it("should transform vec accordingly", () => {
      vec3.transformQuat(vec, [0, 0, -1], out);
      expect(vec).toBeEqualish([0, 1, 0]);
    });
  });

  describe("rotateY", () => {
    beforeEach(() => {
      result = quat.rotateY(out, id, deg90);
    });

    it("should return out", () => {
      expect(result).toBe(out);
    });
    it("should transform vec accordingly", () => {
      vec3.transformQuat(vec, [0, 0, -1], out);
      expect(vec).toBeEqualish([-1, 0, 0]);
    });
  });

  describe("rotateZ", () => {
    beforeEach(() => {
      result = quat.rotateZ(out, id, deg90);
    });

    it("should return out", () => {
      expect(result).toBe(out);
    });
    it("should transform vec accordingly", () => {
      vec3.transformQuat(vec, [0, 1, 0], out);
      expect(vec).toBeEqualish([-1, 0, 0]);
    });
  });

  describe("fromMat3", () => {
    let matr;

    describe("legacy", () => {
      beforeEach(() => {
        matr = [1, 0, 0, 0, 0, -1, 0, 1, 0];
        result = quat.fromMat3(out, matr);
      });

      it("should set dest to the correct value", () => {
        expect(result).toBeEqualish([-0.707106, 0, 0, 0.707106]);
      });
    });

    describe("where trace > 0", () => {
      beforeEach(() => {
        matr = [1, 0, 0, 0, 0, -1, 0, 1, 0];
        result = quat.fromMat3(out, matr);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });

      it("should produce the correct transformation", () => {
        expect(vec3.transformQuat([], [0, 1, 0], out)).toBeEqualish([0, 0, -1]);
      });
    });

    describe("from a normal matrix looking 'backward'", () => {
      beforeEach(() => {
        matr = mat3.create();
        mat3.transpose(
          matr,
          mat3.invert(matr, mat3.fromMat4(matr, mat4.lookAt(mat4.create(), [0, 0, 0], [0, 0, 1], [0, 1, 0]))),
        );
        result = quat.fromMat3(out, matr);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });

      it("should produce the same transformation as the given matrix", () => {
        expect(vec3.transformQuat([], [3, 2, -1], quat.normalize(out, out))).toBeEqualish(
          vec3.transformMat3([], [3, 2, -1], matr),
        );
      });
    });

    describe("from a normal matrix looking 'left' and 'upside down'", () => {
      beforeEach(() => {
        matr = mat3.create();
        mat3.transpose(
          matr,
          mat3.invert(matr, mat3.fromMat4(matr, mat4.lookAt(mat4.create(), [0, 0, 0], [-1, 0, 0], [0, -1, 0]))),
        );
        result = quat.fromMat3(out, matr);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });

      it("should produce the same transformation as the given matrix", () => {
        expect(vec3.transformQuat([], [3, 2, -1], quat.normalize(out, out))).toBeEqualish(
          vec3.transformMat3([], [3, 2, -1], matr),
        );
      });
    });

    describe("from a normal matrix looking 'upside down'", () => {
      beforeEach(() => {
        matr = mat3.create();
        mat3.transpose(
          matr,
          mat3.invert(matr, mat3.fromMat4(matr, mat4.lookAt(mat4.create(), [0, 0, 0], [0, 0, -1], [0, -1, 0]))),
        );
        result = quat.fromMat3(out, matr);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });

      it("should produce the same transformation as the given matrix", () => {
        expect(vec3.transformQuat([], [3, 2, -1], quat.normalize(out, out))).toBeEqualish(
          vec3.transformMat3([], [3, 2, -1], matr),
        );
      });
    });
  });

  describe("fromEuler", () => {
    describe("legacy", () => {
      beforeEach(() => {
        result = quat.fromEuler(out, -30, 30, 30);
      });

      it("should set dest to the correct value", () => {
        expect(result).toBeEqualish([-0.3061862, 0.1767767, 0.3061862, 0.8838835]);
      });
    });

    describe("where trace > 0", () => {
      beforeEach(() => {
        result = quat.fromEuler(out, -90, 0, 0);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });

      it("should produce the correct transformation", () => {
        expect(vec3.transformQuat([], [0, 1, 0], out)).toBeEqualish([0, 0, -1]);
      });
    });

    describe("order argument", () => {
      it("should use ZYX order as the default", () => {
        result = quat.fromEuler(out, -30, 30, 30);
        expect(result).toBeEqualish(quat.fromEuler(quat.create(), -30, 30, 30, AngleOrder.zyx));
      });

      it("should apply in XYZ order properly", () => {
        result = quat.fromEuler(out, -30, 30, 30, AngleOrder.xyz);
        expect(result).toBeEqualish([-0.1767767, 0.3061862, 0.1767767, 0.9185587]);
      });

      it("should apply in XZY order properly", () => {
        result = quat.fromEuler(out, -30, 30, 30, AngleOrder.xzy);
        expect(result).toBeEqualish([-0.3061862, 0.3061862, 0.1767767, 0.8838835]);
      });

      it("should apply in YXZ order properly", () => {
        result = quat.fromEuler(out, -30, 30, 30, AngleOrder.yxz);
        expect(result).toBeEqualish([-0.1767767, 0.3061862, 0.3061862, 0.8838835]);
      });

      it("should apply in YZX order properly", () => {
        result = quat.fromEuler(out, -30, 30, 30, AngleOrder.yzx);
        expect(result).toBeEqualish([-0.1767767, 0.1767767, 0.3061862, 0.9185587]);
      });

      it("should apply in ZXY order properly", () => {
        result = quat.fromEuler(out, -30, 30, 30, AngleOrder.zxy);
        expect(result).toBeEqualish([-0.3061862, 0.1767767, 0.1767767, 0.9185587]);
      });
    });
  });

  describe("setAxes", () => {
    let r;
    beforeEach(() => {
      r = vec3.create();
    });

    describe("looking left", () => {
      let view, up, right;
      beforeEach(() => {
        view = [-1, 0, 0];
        up = [0, 1, 0];
        right = [0, 0, -1];
        result = quat.setAxes([], view, right, up);
      });

      it("should transform local view into world left", () => {
        r = vec3.transformQuat([], [0, 0, -1], result);
        expect(r).toBeEqualish([1, 0, 0]);
      });

      it("should transform local right into world front", () => {
        r = vec3.transformQuat([], [1, 0, 0], result);
        expect(r).toBeEqualish([0, 0, 1]);
      });
    });

    describe("given opengl defaults", () => {
      let view, up, right;
      beforeEach(() => {
        view = [0, 0, -1];
        up = [0, 1, 0];
        right = [1, 0, 0];
        result = quat.setAxes(out, view, right, up);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });

      it("should produce identity", () => {
        expect(out).toBeEqualish([0, 0, 0, 1]);
      });
    });

    describe.skip("legacy example", () => {
      let view, up, right;
      beforeEach(() => {
        right = [1, 0, 0];
        up = [0, 0, 1];
        view = [0, -1, 0];
        result = quat.setAxes(out, view, right, up);
      });

      it("should set correct quat4 values", () => {
        console.info(result);
        expect(result).toBeEqualish([0.707106, 0, 0, 0.707106]);
      });
    });
  });

  describe("rotationTo", () => {
    let r;
    beforeEach(() => {
      r = vec3.create();
    });

    describe("at right angle", () => {
      beforeEach(() => {
        result = quat.rotationTo(out, [0, 1, 0], [1, 0, 0]);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });

      it("should calculate proper quaternion", () => {
        expect(out).toBeEqualish([0, 0, -0.707106, 0.707106]);
      });
    });

    describe("when vectors are parallel", () => {
      beforeEach(() => {
        result = quat.rotationTo(out, [0, 1, 0], [0, 1, 0]);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });

      it("multiplying A should produce B", () => {
        expect(vec3.transformQuat(r, [0, 1, 0], out)).toBeEqualish([0, 1, 0]);
      });
    });

    describe("when vectors are opposed X", () => {
      beforeEach(() => {
        result = quat.rotationTo(out, [1, 0, 0], [-1, 0, 0]);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });

      it("multiplying A should produce B", () => {
        expect(vec3.transformQuat(r, [1, 0, 0], out)).toBeEqualish([-1, 0, 0]);
      });
    });

    describe("when vectors are opposed Y", () => {
      beforeEach(() => {
        result = quat.rotationTo(out, [0, 1, 0], [0, -1, 0]);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });

      it("multiplying A should produce B", () => {
        expect(vec3.transformQuat(r, [0, 1, 0], out)).toBeEqualish([0, -1, 0]);
      });
    });

    describe("when vectors are opposed Z", () => {
      beforeEach(() => {
        result = quat.rotationTo(out, [0, 0, 1], [0, 0, -1]);
      });

      it("should return out", () => {
        expect(result).toBe(out);
      });

      it("multiplying A should produce B", () => {
        expect(vec3.transformQuat(r, [0, 0, 1], out)).toBeEqualish([0, 0, -1]);
      });
    });
  });

  describe("create", () => {
    beforeEach(() => {
      result = quat.create();
    });
    it("should return a 4 element array initialized to an identity quaternion", () => {
      expect(result).toBeEqualish([0, 0, 0, 1]);
    });
  });

  describe("clone", () => {
    beforeEach(() => {
      result = quat.clone(quatA);
    });
    it("should return a 4 element array initialized to the values in quatA", () => {
      expect(result).toBeEqualish(quatA);
    });
  });

  describe("fromValues", () => {
    beforeEach(() => {
      result = quat.fromValues(1, 2, 3, 4);
    });
    it("should return a 4 element array initialized to the values passed", () => {
      expect(result).toBeEqualish([1, 2, 3, 4]);
    });
  });

  describe("copy", () => {
    beforeEach(() => {
      result = quat.copy(out, quatA);
    });
    it("should place values into out", () => {
      expect(out).toBeEqualish([1, 2, 3, 4]);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
  });

  describe("set", () => {
    beforeEach(() => {
      result = quat.set(out, 1, 2, 3, 4);
    });
    it("should place values into out", () => {
      expect(out).toBeEqualish([1, 2, 3, 4]);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
  });

  describe("identity", () => {
    beforeEach(() => {
      result = quat.identity(out);
    });
    it("should place values into out", () => {
      expect(result).toBeEqualish([0, 0, 0, 1]);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
  });

  describe("setAxisAngle", () => {
    beforeEach(() => {
      result = quat.setAxisAngle(out, [1, 0, 0], Math.PI * 0.5);
    });
    it("should place values into out", () => {
      expect(result).toBeEqualish([0.707106, 0, 0, 0.707106]);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
  });

  describe("getAxisAngle", () => {
    describe("for a quaternion representing no rotation", () => {
      beforeEach(() => {
        result = quat.setAxisAngle(out, [0, 1, 0], 0.0);
        deg90 = quat.getAxisAngle(vec, out);
      });
      it("should return a multiple of 2*PI as the angle component", () => {
        expect(deg90 % (Math.PI * 2.0)).toBeEqualish(0.0);
      });
    });

    describe("for a simple rotation about X axis", () => {
      beforeEach(() => {
        result = quat.setAxisAngle(out, [1, 0, 0], 0.7778);
        deg90 = quat.getAxisAngle(vec, out);
      });
      it("should return the same provided angle", () => {
        expect(deg90).toBeEqualish(0.7778);
      });
      it("should return the X axis as the angle", () => {
        expect(vec).toBeEqualish([1, 0, 0]);
      });
    });

    describe("for a simple rotation about Y axis", () => {
      beforeEach(() => {
        result = quat.setAxisAngle(out, [0, 1, 0], 0.879546);
        deg90 = quat.getAxisAngle(vec, out);
      });
      it("should return the same provided angle", () => {
        expect(deg90).toBeEqualish(0.879546);
      });
      it("should return the X axis as the angle", () => {
        expect(vec).toBeEqualish([0, 1, 0]);
      });
    });

    describe("for a simple rotation about Z axis", () => {
      beforeEach(() => {
        result = quat.setAxisAngle(out, [0, 0, 1], 0.123456);
        deg90 = quat.getAxisAngle(vec, out);
      });
      it("should return the same provided angle", () => {
        expect(deg90).toBeEqualish(0.123456);
      });
      it("should return the X axis as the angle", () => {
        expect(vec).toBeEqualish([0, 0, 1]);
      });
    });

    describe("for a slightly irregular axis and right angle", () => {
      beforeEach(() => {
        result = quat.setAxisAngle(out, [0.707106, 0, 0.707106], Math.PI * 0.5);
        deg90 = quat.getAxisAngle(vec, out);
      });
      it("should place values into vec", () => {
        expect(vec).toBeEqualish([0.707106, 0, 0.707106]);
      });
      it("should return a numeric angle", () => {
        expect(deg90).toBeEqualish(Math.PI * 0.5);
      });
    });

    describe("for a very irregular axis and negative input angle", () => {
      beforeEach(() => {
        quatA = quat.setAxisAngle(quatA, [0.65538555, 0.49153915, 0.57346237], 8.8888);
        deg90 = quat.getAxisAngle(vec, quatA);
        quatB = quat.setAxisAngle(quatB, vec, deg90);
      });
      it("should return an angle between 0 and 2*PI", () => {
        expect(deg90).toBeGreaterThan(0.0);
        expect(deg90).toBeLessThan(Math.PI * 2.0);
      });
      it("should create the same quaternion from axis and angle extracted", () => {
        expect(quatA).toBeEqualish(quatB);
      });
    });
  });

  describe("getAngle", () => {
    describe("from itself", () => {
      beforeEach(() => {
        quat.normalize(quatA, quatA);
      });

      it("should be zero", () => {
        expect(quat.getAngle(quatA, quatA)).toBeEqualish(0);
      });
    });

    describe("from rotated", () => {
      beforeEach(() => {
        quat.normalize(quatA, quatA);
        quat.rotateX(quatB, quatA, Math.PI / 4);
      });

      it("should be 45 degrees", () => {
        expect(quat.getAngle(quatA, quatB)).toBeEqualish(Math.PI / 4);
      });
    });

    describe("compare with axisAngle", () => {
      beforeEach(() => {
        quat.normalize(quatA, quatA);
        quat.normalize(quatB, quatB);
      });

      it("should be equalish", () => {
        // compute reference value as axisAngle of quatA^{-1} * quatB
        let quatAInv = quat.conjugate(quat.create(), quatA);
        let quatAB = quat.multiply(quatAInv, quatAInv, quatB);
        let dummy = vec3.create();
        let reference = quat.getAxisAngle(dummy, quatAB);

        expect(quat.getAngle(quatA, quatB)).toBeEqualish(reference);
      });
    });
  });

  describe("add", () => {
    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat.add(out, quatA, quatB);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([6, 8, 10, 12]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quatA", () => {
        expect(quatA).toBeEqualish([1, 2, 3, 4]);
      });
      it("should not modify quatB", () => {
        expect(quatB).toBeEqualish([5, 6, 7, 8]);
      });
    });

    describe("when quatA is the output quaternion", () => {
      beforeEach(() => {
        result = quat.add(quatA, quatA, quatB);
      });

      it("should place values into quatA", () => {
        expect(quatA).toBeEqualish([6, 8, 10, 12]);
      });
      it("should return quatA", () => {
        expect(result).toBe(quatA);
      });
      it("should not modify quatB", () => {
        expect(quatB).toBeEqualish([5, 6, 7, 8]);
      });
    });

    describe("when quatB is the output quaternion", () => {
      beforeEach(() => {
        result = quat.add(quatB, quatA, quatB);
      });

      it("should place values into quatB", () => {
        expect(quatB).toBeEqualish([6, 8, 10, 12]);
      });
      it("should return quatB", () => {
        expect(result).toBe(quatB);
      });
      it("should not modify quatA", () => {
        expect(quatA).toBeEqualish([1, 2, 3, 4]);
      });
    });
  });

  describe("multiply", () => {
    it("should have an alias called 'mul'", () => {
      expect(quat.mul).toEqual(quat.multiply);
    });

    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat.multiply(out, quatA, quatB);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([24, 48, 48, -6]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quatA", () => {
        expect(quatA).toBeEqualish([1, 2, 3, 4]);
      });
      it("should not modify quatB", () => {
        expect(quatB).toBeEqualish([5, 6, 7, 8]);
      });
    });

    describe("when quatA is the output quaternion", () => {
      beforeEach(() => {
        result = quat.multiply(quatA, quatA, quatB);
      });

      it("should place values into quatA", () => {
        expect(quatA).toBeEqualish([24, 48, 48, -6]);
      });
      it("should return quatA", () => {
        expect(result).toBe(quatA);
      });
      it("should not modify quatB", () => {
        expect(quatB).toBeEqualish([5, 6, 7, 8]);
      });
    });

    describe("when quatB is the output quaternion", () => {
      beforeEach(() => {
        result = quat.multiply(quatB, quatA, quatB);
      });

      it("should place values into quatB", () => {
        expect(quatB).toBeEqualish([24, 48, 48, -6]);
      });
      it("should return quatB", () => {
        expect(result).toBe(quatB);
      });
      it("should not modify quatA", () => {
        expect(quatA).toBeEqualish([1, 2, 3, 4]);
      });
    });
  });

  describe("scale", () => {
    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat.scale(out, quatA, 2);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([2, 4, 6, 8]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quatA", () => {
        expect(quatA).toBeEqualish([1, 2, 3, 4]);
      });
    });

    describe("when quatA is the output quaternion", () => {
      beforeEach(() => {
        result = quat.scale(quatA, quatA, 2);
      });

      it("should place values into quatA", () => {
        expect(quatA).toBeEqualish([2, 4, 6, 8]);
      });
      it("should return quatA", () => {
        expect(result).toBe(quatA);
      });
    });
  });

  describe("length", () => {
    it("should have an alias called 'len'", () => {
      expect(quat.len).toEqual(quat.length);
    });

    beforeEach(() => {
      result = quat.len(quatA);
    });

    it("should return the length", () => {
      expect(result).toBeEqualish(5.477225);
    });
  });

  describe("squaredLength", () => {
    it("should have an alias called 'sqrLen'", () => {
      expect(quat.sqrLen).toEqual(quat.squaredLength);
    });

    beforeEach(() => {
      result = quat.squaredLength(quatA);
    });

    it("should return the squared length", () => {
      expect(result).toEqual(30);
    });
  });

  describe("normalize", () => {
    beforeEach(() => {
      quatA = [5, 0, 0, 0];
    });

    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat.normalize(out, quatA);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([1, 0, 0, 0]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quatA", () => {
        expect(quatA).toBeEqualish([5, 0, 0, 0]);
      });
    });

    describe("when quatA is the output quaternion", () => {
      beforeEach(() => {
        result = quat.normalize(quatA, quatA);
      });

      it("should place values into quatA", () => {
        expect(quatA).toBeEqualish([1, 0, 0, 0]);
      });
      it("should return quatA", () => {
        expect(result).toBe(quatA);
      });
    });
  });

  describe("lerp", () => {
    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat.lerp(out, quatA, quatB, 0.5);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([3, 4, 5, 6]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quatA", () => {
        expect(quatA).toBeEqualish([1, 2, 3, 4]);
      });
      it("should not modify quatB", () => {
        expect(quatB).toBeEqualish([5, 6, 7, 8]);
      });
    });

    describe("when quatA is the output quaternion", () => {
      beforeEach(() => {
        result = quat.lerp(quatA, quatA, quatB, 0.5);
      });

      it("should place values into quatA", () => {
        expect(quatA).toBeEqualish([3, 4, 5, 6]);
      });
      it("should return quatA", () => {
        expect(result).toBe(quatA);
      });
      it("should not modify quatB", () => {
        expect(quatB).toBeEqualish([5, 6, 7, 8]);
      });
    });

    describe("when quatB is the output quaternion", () => {
      beforeEach(() => {
        result = quat.lerp(quatB, quatA, quatB, 0.5);
      });

      it("should place values into quatB", () => {
        expect(quatB).toBeEqualish([3, 4, 5, 6]);
      });
      it("should return quatB", () => {
        expect(result).toBe(quatB);
      });
      it("should not modify quatA", () => {
        expect(quatA).toBeEqualish([1, 2, 3, 4]);
      });
    });
  });

  describe("slerp", () => {
    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat.slerp(out, quatA, quatB, 0.5);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([3, 4, 5, 6]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quatA", () => {
        expect(quatA).toBeEqualish([1, 2, 3, 4]);
      });
      it("should not modify quatB", () => {
        expect(quatB).toBeEqualish([5, 6, 7, 8]);
      });
    });

    describe("when quatA is the output quaternion", () => {
      beforeEach(() => {
        result = quat.slerp(quatA, quatA, quatB, 0.5);
      });

      it("should place values into quatA", () => {
        expect(quatA).toBeEqualish([3, 4, 5, 6]);
      });
      it("should return quatA", () => {
        expect(result).toBe(quatA);
      });
      it("should not modify quatB", () => {
        expect(quatB).toBeEqualish([5, 6, 7, 8]);
      });
    });

    describe("when quatB is the output quaternion", () => {
      beforeEach(() => {
        result = quat.slerp(quatB, quatA, quatB, 0.5);
      });

      it("should place values into quatB", () => {
        expect(quatB).toBeEqualish([3, 4, 5, 6]);
      });
      it("should return quatB", () => {
        expect(result).toBe(quatB);
      });
      it("should not modify quatA", () => {
        expect(quatA).toBeEqualish([1, 2, 3, 4]);
      });
    });
  });

  describe("random", () => {
    beforeEach(() => {
      result = quat.random(out);
    });

    it("should result in a normalized quaternion", () => {
      let copy = quat.clone(out);
      expect(quat.normalize(out, out)).toBeEqualish(copy);
    });
    it("should return out", () => {
      expect(result).toBe(out);
    });
  });

  describe("invert", () => {
    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat.invert(out, quatA);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([-0.033333, -0.066666, -0.1, 0.133333]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quatA", () => {
        expect(quatA).toBeEqualish([1, 2, 3, 4]);
      });
    });

    describe("when quatA is the output quaternion", () => {
      beforeEach(() => {
        result = quat.invert(quatA, quatA);
      });

      it("should place values into quatA", () => {
        expect(quatA).toBeEqualish([-0.033333, -0.066666, -0.1, 0.133333]);
      });
      it("should return quatA", () => {
        expect(result).toBe(quatA);
      });
    });
  });

  describe("conjugate", () => {
    describe("with a separate output quaternion", () => {
      beforeEach(() => {
        result = quat.conjugate(out, quatA);
      });

      it("should place values into out", () => {
        expect(out).toBeEqualish([-1, -2, -3, 4]);
      });
      it("should return out", () => {
        expect(result).toBe(out);
      });
      it("should not modify quatA", () => {
        expect(quatA).toBeEqualish([1, 2, 3, 4]);
      });
    });

    describe("when quatA is the output quaternion", () => {
      beforeEach(() => {
        result = quat.conjugate(quatA, quatA);
      });

      it("should place values into quatA", () => {
        expect(quatA).toBeEqualish([-1, -2, -3, 4]);
      });
      it("should return quatA", () => {
        expect(result).toBe(quatA);
      });
    });
  });

  describe("str", () => {
    beforeEach(() => {
      result = quat.str(quatA);
    });

    it("should return a string representation of the quaternion", () => {
      expect(result).toEqual("quat(1, 2, 3, 4)");
    });
  });

  describe("exactEquals", () => {
    let quatC, r0, r1;
    beforeEach(() => {
      quatA = [0, 1, 2, 3];
      quatB = [0, 1, 2, 3];
      quatC = [1, 2, 3, 4];
      r0 = quat.exactEquals(quatA, quatB);
      r1 = quat.exactEquals(quatA, quatC);
    });

    it("should return true for identical quaternions", () => {
      expect(r0).toBe(true);
    });
    it("should return false for different quaternions", () => {
      expect(r1).toBe(false);
    });
    it("should not modify quatA", () => {
      expect(quatA).toBeEqualish([0, 1, 2, 3]);
    });
    it("should not modify quatB", () => {
      expect(quatB).toBeEqualish([0, 1, 2, 3]);
    });
  });

  describe("equals", () => {
    let quatC, quatD, quatE, r0, r1, r2, r3;
    beforeEach(() => {
      quatA = [0, 0, 0, 1];
      quatB = [0, 0, 0, 1];
      quatC = [0, 1, 0, 0];
      quatD = [1e-16, 1, 2, 3];
      quatE = [0, -1, 0, 0];
      r0 = quat.equals(quatA, quatB);
      r1 = quat.equals(quatA, quatC);
      r2 = quat.equals(quatA, quatD);
      r3 = quat.equals(quatC, quatE);
    });
    it("should return true for identical quaternions", () => {
      expect(r0).toBe(true);
    });
    it("should return false for different quaternions", () => {
      expect(r1).toBe(false);
    });
    it("should return true for close but not identical quaternions", () => {
      expect(r2).toBe(true);
    });
    it("should return true for identical quaternions with flipped orientation", () => {
      expect(r3).toBe(true);
    });
    it("should not modify quatA", () => {
      expect(quatA).toBeEqualish([0, 0, 0, 1]);
    });
    it("should not modify quatB", () => {
      expect(quatB).toBeEqualish([0, 0, 0, 1]);
    });
  });
});
