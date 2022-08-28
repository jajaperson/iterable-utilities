import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";
import { LICENSE as license, VERSION as version } from "../version.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts", {
    name: "./fp",
    path: "./fp.ts",
  }],
  outDir: "./npm",
  shims: {
    deno: "dev",
  },
  package: {
    name: "iterable-utilities",
    version,
    description:
      "A bunch of utilities for working with iterables, many inspired by the native array methods.",
    license,
    repository: {
      type: "git",
      url: "git+https://github.com/jajaperson/iterable-utilities.git",
    },
    bugs: {
      url: "https://github.com/jajaperson/iterable-utilities/issues",
    },
  },
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
