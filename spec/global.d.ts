declare module "bun:test" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Matchers<T> {
    toBeEqualish(expected: number | number[] | Float32Array): MatcherResult;
    toBeEqualishQuat2(expected: number[] | Float32Array, epsilon?: number): MatcherResult;
  }

  interface AsymmetricMatchers {
    toBeEqualish(expected: number | number[] | Float32Array): MatcherResult;
    toBeEqualishQuat2(expected: number[] | Float32Array, epsilon?: number): MatcherResult;
  }
}
