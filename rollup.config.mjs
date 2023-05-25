import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import clear from "rollup-plugin-clear";
import dts from "rollup-plugin-dts";
import json from "@rollup/plugin-json";
import path from "path";
import * as url from "url";
import fs from "fs-extra"
import externals from "rollup-plugin-node-externals"
import {visualizer} from "rollup-plugin-visualizer";
import keepHeaderComment from "rollup-plugin-keep-header-comment";


const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname);
const resolve = p => path.resolve(__dirname, p);

const packageJson = fs.readJSONSync(resolve("package.json"))
const tsconfig = resolve("tsconfig.json")
const tsconfigJson = fs.readJSONSync(tsconfig)


const input = "./src/index.ts"
const {
    outDir: outputDir,
    sourceMap: sourcemap
} = tsconfigJson["compilerOptions"]

const {
    name: pkgName,
    types: declarationFile
} = packageJson
let name = path.basename(pkgName).replaceAll("-", "_")

const Format = {
    ES: "es",
    CJS: "cjs",
    IIFE: "iife",
}
const emitFormats = [
    Format.ES,
    Format.CJS,
    Format.IIFE
]
const outputFileMapper = {
    [Format.ES]: "index.mjs",
    [Format.CJS]: "index.cjs",
    [Format.IIFE]: "index.iife.js"
}

const basePlugins = [
    clear({
        targets: ["dist"],
    }),
    json(),
    nodeResolve({
        preferBuiltins: false,
    }),
    commonjs(),
    typescript({
        tsconfig,
    }),
    externals()
];

export default [
    ...emitFormats.map(format =>{
        return {
            input,
            output: {
                file: resolve(path.join(outputDir, outputFileMapper[format])),
                format,
                name,
                exports: "named",
                sourcemap,
            },
            plugins:[
                ...basePlugins,
                ...["sunburst", "treemap", "network", "raw-data"].map(template => visualizer({
                    filename: resolve(path.join("stat", `${format}.stat.${template}${template === "raw-data" ? "raw" : ".html"}`)),
                    template
                })),
            ]
        }
    }),
    {
        input,
        output: [{
            file: resolve(declarationFile),
            format: "es"
        }],
        plugins: [
            ...basePlugins,
            dts({
                tsconfig,
            }),
            keepHeaderComment({
                sourcemap,
                pattern: /@packageDocumentation/,
            }),
        ],
        external: ["type-fest"]
    }
];
