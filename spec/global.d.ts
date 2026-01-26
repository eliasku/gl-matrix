interface IndexedCollection2 extends Iterable<number> {
  readonly length: number;
  [index: number]: number;
}

interface HelperMatchers {
  toBeEqualish(expected: number | number[] | Float32Array | IndexedCollection2): any;
  toBeEqualishQuat2(expected: number[] | Float32Array | IndexedCollection2, epsilon?: number): any;
}

declare module "bun:test" {
  interface Matchers<T> extends HelperMatchers {}
  interface AsymmetricMatchers extends HelperMatchers {}
}
