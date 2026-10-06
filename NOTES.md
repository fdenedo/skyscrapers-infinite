To go over why package.json looks the way it does:
- `private: true` means that npm will not accidentally publish the project.
- The `engines` object provides a range of node versions that are supported, in this case Node at >= 26. If a package is installed from a particular context that does not have Node installed within that range, it will issue a warning.
- Not setting `engine-strict` here as we don't want installation to be blocked on Node 24 for example
- For the scripts we are deferring to Vite to both spin up the dev server and to build the project. We have a `tsc` command before the Vite build command so we can type-check and use TypeScript's checks to protect the build before we build; then we defer to Vite for the build.
- In TS config we have the `noEmit` setting set to `true`, which essentially means `tsc` doesn't produce output files, which is fine because we're now using Vite for that.
- rootDir and outDir are not necessary as we are essentially running `tsc --noEmit`, as we are using Vite to build, so don't need `tsc` to output any files
