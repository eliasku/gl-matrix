export interface IndexedCollection extends Iterable<number> {
  readonly length: number;
  [index: number]: number;
}

// prettier-ignore
export type Mat2 =
  | [number, number,
     number, number]
  | IndexedCollection;

// prettier-ignore
export type Mat2d =
  | [number, number,
     number, number,
     number, number]
  | IndexedCollection;

// prettier-ignore
export type Mat3 =
  | [number, number, number,
     number, number, number,
     number, number, number]
  | IndexedCollection;

// prettier-ignore
export type Mat4 =
  | [number, number, number, number,
     number, number, number, number,
     number, number, number, number,
     number, number, number, number]
  | IndexedCollection;

export type Quat = [number, number, number, number] | IndexedCollection;

// prettier-ignore
export type Quat2 =
  | [number, number, number, number,
    number, number, number, number]
  | IndexedCollection;

export type Vec2 = [number, number] | IndexedCollection;
export type Vec3 = [number, number, number] | IndexedCollection;
export type Vec4 = [number, number, number, number] | IndexedCollection;
