import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import postcss from 'rollup-plugin-postcss'


export default [
    {
        input: "src/index.ts",
        output: [
            { file: "dist/index.cjs", format: "cjs", sourcemap: true },
            { file: "dist/index.es.js", format: "esm", sourcemap: true }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            postcss({
                extract: false,
                minimize: true,
                modules: false,
                sourceMap: true,
                extensions: ['.css', '.scss']
            }),
            typescript({ tsconfig: "./tsconfig.json" })
        ],
        external: ["react", "react-dom"]
    },
    {
        input: "dist/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [
            dts(),
            {
                name: 'remove-css-imports',
                resolveId(source) {
                    if (source.endsWith('.css') || source.endsWith('.scss')) {
                        return {id: source, external: true};
                    }
                    return null;
                }
            }
        ]
    }
];