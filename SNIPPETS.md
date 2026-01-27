convert function to arrow function:

- search `export function ([\w\d]+)\(([\w\d:,\s\n]*)\)\:\s*([\w\d\s|]+)\{`
- replace `export const $1 = ($2): $3=> {`
