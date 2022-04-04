/**
 * Webpack config for production electron main process
 */

import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import TerserPlugin from "terser-webpack-plugin";
import baseConfig from "./webpack.config.base";
import checkNodeEnv from "../scripts/check-node-env";
import webpackPaths from "./webpack.paths";

checkNodeEnv("production");

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

    mode: "production",

    target: "electron-main",

    entry: {
      main: path.join(webpackPaths.srcMainPath, "main.ts"),
      preload: path.join(webpackPaths.srcMainPath, "preload.js")
    },

    output: {
      path: webpackPaths.distMainPath,
      filename: "[name].js"
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
        NODE_ENV: "production",
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
