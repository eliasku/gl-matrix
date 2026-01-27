export type VecBase = number[] | Float32Array;

// prettier-ignore
export type Mat2 = VecBase | [
  number, number,
  number, number,
];

// prettier-ignore
export type Mat2d = VecBase | [
  number, number,
  number, number,
  number, number,
];

// prettier-ignore
export type Mat3 = VecBase | [
  number, number, number,
  number, number, number,
  number, number, number,
];

// prettier-ignore
export type Mat4 = VecBase | [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
];

export type Quat = VecBase | [number, number, number, number];

// prettier-ignore
export type Quat2 = VecBase | [
  number, number, number, number,
  number, number, number, number,
];

export type Vec2 = VecBase | [number, number];
export type Vec3 = VecBase | [number, number, number];
export type Vec4 = VecBase | [number, number, number, number];

// angles are in radians
export interface FovParams {
  up: number;
  down: number;
  left: number;
  right: number;
}
