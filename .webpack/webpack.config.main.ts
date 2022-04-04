/**
 * Webpack config for production electron main process
 */

import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import TerserPlugin from "terser-webpack-plugin";
import baseConfig from "./webpack.config.base";
import webpackPaths from "./webpack.paths";

const devtoolsConfig =
  process.env.DEBUG_PROD === "true"
    ? {
        devtool: "source-map"
      }
    : {};

export default merge([
  baseConfig,
  {
    ...devtoolsConfig,

    mode: "development",

    target: "electron-main",

    entry: {
      main: path.join(webpackPaths.srcMainPath, "main.ts"),
      preload: path.join(webpackPaths.srcMainPath, "preload.js")
    },

    output: {
      path: webpackPaths.distMainPath,
      library: {
        type: "commonjs2"
      }
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true
        })
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: "development",
        DEBUG_PROD: false,
        START_MINIMIZED: false
      })
    ],

    /**
     * Disables webpack processing of __dirname and __filename.
     * If you run the bundle in node.js it falls back to these values of node.js.
     * https://github.com/webpack/webpack/issues/2010
     */
    node: {
      __dirname: false,
      __filename: false
    }
  }
]);
