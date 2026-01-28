[![NPM Version](https://img.shields.io/npm/v/%40eliasku%2Fgl-matrix)](https://www.npmjs.com/package/@eliasku/gl-matrix)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/eliasku/gl-matrix/ci.yml)

# GL Matrix (TypeScript version)

- Based on `gl-matrix@3.4.4`
- Buildless TypeScript distribution:
  - copy to your project
  - install and import `.ts` files

- Run Tests: `bun test`

- short arrow functions `() => ` used instead of regular js functions
- `const` and `let` instead of `var`
- type annotations in function declaration

# CHANGELOG

- common round renamed to symround and add test
- skip `quat > setAxes > legacy example` test
- forced `Float32Array` constructor
- remove degree/radians conversion. always use radians
- add `@__NO_SIDE_EFFECTS__` annotation

# No side-effect functions

Almost functions are PURE, but because of mutating `out` argument (pattern for optimization), we can't mark them. If we will mark all PURE function as PURE, so:
- with correct usage: `d = perspective(d, ...)` function will not be stripped out
- but just `perspective(d, ...)` usage will be removed

Because of that these functions are not marked as no-side-effect.

Pure functions are marked with annotation `/* @__NO_SIDE_EFFECTS__ */` for better treeshaking:
`createArray, create, clone, str, frob, dot, length, squaredLength, fromValues, distance, squaredDistance, exactEquals, equals, fromRotationTranslationValues, getAngle, determinant`
