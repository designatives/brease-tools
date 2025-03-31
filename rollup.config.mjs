import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import postcss from 'rollup-plugin-postcss'


export default [
    {
        input: "src/index-with-styles.ts",
        output: [
            { file: "dist/index.js", format: "cjs", sourcemap: true },
            { file: "dist/index.es.js", format: "esm", sourcemap: true }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            postcss({
                extract: true,
                minimize: true,
                modules: true,
            }),
            typescript({ tsconfig: "./tsconfig.json" })
        ],
        external: ["react", "react-dom"]
    },
    {
        input: "dist/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()]
    }
];
