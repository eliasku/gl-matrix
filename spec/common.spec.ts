import { describe, beforeEach, it, expect } from "bun:test";
import { EPSILON, equals, symround, toDegree, toRadian } from "../src/common";
import "./helpers";

describe("common", () => {
  it("symround for negative -0.5 as for 0.5", () => {
    expect(-symround(-5.5)).toBeEqualish(symround(5.5));
    expect(-Math.round(-5.5)).not.toBeEqualish(Math.round(5.5));
  });

  let result: number;

  describe("toRadian", () => {
    beforeEach(() => {
      result = toRadian(180);
    });
    it("should return a value of 3.141592654(Math.PI)", () => {
      expect(result).toBeEqualish(Math.PI);
    });
  });

  describe("toDegree", () => {
    beforeEach(() => {
      result = toDegree(Math.PI);
    });
    it("should return a value of 180", () => {
      expect(result).toBeEqualish(180);
    });
  });

  describe("equals", () => {
    let r0: boolean;
    let r1: boolean;
    let r2: boolean;
    let r3: boolean;
    let r4: boolean;
    beforeEach(() => {
      r0 = equals(1.0, 0.0);
      r1 = equals(1.0, 1.0);
      r2 = equals(1.0 + EPSILON / 2, 1.0);
      r3 = equals(1.0011, 1.0, 0.001);
      r4 = equals(100.5, 100.7, 0.2);
    });
    it("should return false for different numbers", () => {
      expect(r0).toBe(false);
    });
    it("should return true for the same number", () => {
      expect(r1).toBe(true);
    });
    it("should return true for numbers that are close", () => {
      expect(r2).toBe(true);
    });
    it("should return false for numbers that are close but tolerance is set to smaller value", () => {
      expect(r3).toBe(false);
    });
    it("should return true for numbers that are close with tolerance is set to bigger value", () => {
      expect(r4).toBe(true);
    });
  });
});
