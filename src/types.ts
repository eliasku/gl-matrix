export type VecBase = number[] | Float32Array;

export type Mat2 = VecBase | [number, number, number, number];

export type Mat2d = VecBase | [number, number, number, number, number, number];

export type Mat3 = VecBase | [number, number, number, number, number, number, number, number, number];

export type Mat4 =
  | VecBase
  | [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
    ];

export type Quat = VecBase | [number, number, number, number];

export type Quat2 = VecBase | [number, number, number, number, number, number, number, number];

export type Vec2 = VecBase | [number, number];
export type Vec3 = VecBase | [number, number, number];
export type Vec4 = VecBase | [number, number, number, number];

export interface FovParams {
  up: number;
  down: number;
  left: number;
  right: number;
}
