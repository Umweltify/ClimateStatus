// rollup.config.js

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
    input: 'src/index.js', // Entry point of your application
    output: {
        file: 'ClimateStatus.js', // Output bundle file
        format: 'iife',    // Immediately Invoked Function Expression format
        name: 'MyModule',  // Global variable name for your module
        sourcemap: true,   // Generate a sourcemap
    },
    plugins: [
        resolve(), // Helps Rollup find modules in node_modules
        commonjs(), // Converts CommonJS modules to ES6
        babel({
            exclude: 'node_modules/**', // Only transpile our source code
            babelHelpers: 'bundled',
            presets: ['@babel/preset-env'],
        }),
    ],
};
