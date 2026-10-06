To go over why package.json looks the way it does:
- `private: true` means that npm will not accidentally publish the project.
- The `engines` object provides a range of node versions that are supported, in this case Node at >= 26. If a package is installed from a particular context that does not have Node installed within that range, it will issue a warning.
- Not setting `engine-strict` here as we don't want installation to be blocked on Node 24 for example
- For the scripts we are deferring to Vite to both spin up the dev server and to build the project. We have a `tsc` command before the Vite build command so we can type-check and use TypeScript's checks to protect the build before we build; then we defer to Vite for the build.
- In TS config we have the `noEmit` setting set to `true`, which essentially means `tsc` doesn't produce output files, which is fine because we're now using Vite for that.
- rootDir and outDir are not necessary as we are essentially running `tsc --noEmit`, as we are using Vite to build, so don't need `tsc` to output any files

Visibility Counter

The visibility counter is the code that counts how many skyscrapers can be seen from a particular position on the edge of the skyscraper grid. For example, if a row from left to right in the grid has values [1, 2, 3, 4, 5], in that order, then a clue on the left of that row would show 5 (meaning that a person standing there would be able to see 5 skyscrapers if looking down that row). A row of [2, 4, 1, 3, 5] would yield 3, as only the 2, the 4, and the 5 skyscrapers can be seen.

Note: I'm adding the length constraint as it allows us to do some fast-exit shenanigans, even though for sequential array lookups it will likely give little time back, but could be useful when performing many checks, like for the solver, might be worth instrumenting

```
const countVisible = (readonly line: Array<number>) => number
```

Where:

- all values in `line` are some integer value where 0 <= value <= length of `line`
- 0 is not counted (denoting an absent skyscraper, so an empty cell never contains a seen skyscraper)

Cases to test:

- [1, 2, 3, 4, 5] => 5
- [5, 4, 3, 2, 1] => 1
- [2, 0, 3, 5, 1] => 3
- [] => 0
- [1] => 1
- [0, 2, 3, 0] => 2
- [2, 3, 3, 4] => 3
- [3, 3, 3] => 1
- [0, 0, 0] => 0

- [1, 2, 4] => reject (throw RangeError)
- [3, 2, -1] => reject (throw RangeError)
- [1, 2, 3.5, 4, 5] => reject (throw NotIntegerError)
