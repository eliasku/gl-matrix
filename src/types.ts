type Base = number[] | Float32Array;

// prettier-ignore
export type Mat2 = Base | [
  number, number,
  number, number,
];

// prettier-ignore
export type Mat2d = Base | [
  number, number,
  number, number,
  number, number,
];

// prettier-ignore
export type Mat3 = Base | [
  number, number, number,
  number, number, number,
  number, number, number,
];

// prettier-ignore
export type Mat4 = Base | [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
];

export type Quat = Base | [number, number, number, number];

// prettier-ignore
export type Quat2 = Base | [
  number, number, number, number,
  number, number, number, number,
];

export type Vec2 = Base | [number, number];
export type Vec3 = Base | [number, number, number];
export type Vec4 = Base | [number, number, number, number];

// angles are in radians
export interface FovParams {
  up: number;
  down: number;
  left: number;
  right: number;
}
