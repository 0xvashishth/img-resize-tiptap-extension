import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import pkgg from './package.json' assert { type: 'json' };
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
  {
    input: 'src/index.ts',
    
    output: [
      {
        file: pkgg.main,
        format: 'cjs',
      },
      {
        file: pkgg.module,
        exports: 'named',
        format: 'esm',
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env','@babel/preset-react'],
      }),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        plugins: [],
        minimize: true,
      }),
      external(),
    ],
    external: Object.keys(pkgg.peerDependencies), // Add 'react' to the list of externals
  },
  {
    input: "dist/index.esm.js",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
