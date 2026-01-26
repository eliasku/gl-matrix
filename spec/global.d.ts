interface IndexedCollection extends Iterable<number> {
  readonly length: number;
  [index: number]: number;
}

interface HelperMatchers {
  toBeEqualish(expected: number | number[] | Float32Array | IndexedCollection): any;
  toBeEqualishQuat2(expected: number[] | Float32Array | IndexedCollection, epsilon?: number): any;
}

declare module "bun:test" {
  interface Matchers<T> extends HelperMatchers {}
  interface AsymmetricMatchers extends HelperMatchers {}
}
