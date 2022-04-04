/**
 * Builds the DLL for development electron renderer process
 */

import webpack from "webpack";
import path from "path";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.config.base";
import webpackPaths from "./webpack.paths";
import { dependencies } from "../package.json";

const dist = webpackPaths.dllPath;

export default merge([
  baseConfig,
  {
    context: webpackPaths.rootPath,

    devtool: "eval",

    mode: "development",

    target: "electron-renderer",

    externals: ["fsevents", "crypto-browserify"],

    /**
     * Use `module` from `webpack.config.renderer.js`
     */
    module: require("./webpack.config.renderer.ts").default.module,

    entry: {
      renderer: Object.keys(dependencies || {})
    },

    output: {
      path: dist,
      filename: "[name].dll.js",
      library: {
        name: "renderer",
        type: "var"
      }
    },

    plugins: [
      new webpack.DllPlugin({
        path: path.join(dist, "[name].json"),
        name: "[name]"
      }),

      /**
       * Create global constants which can be configured at compile time.
       *
       * Useful for allowing different behaviour between development builds and
       * release builds
       *
       * NODE_ENV should be production so that modules do not perform certain
       * development checks
       */
      new webpack.EnvironmentPlugin({
        NODE_ENV: "development" // process.env.NODE_ENV가 정의되지 않은 경우 'development'를 사용하세요.
      }),

      new webpack.LoaderOptionsPlugin({
        debug: true,
        options: {
          context: webpackPaths.srcPath,
          output: {
            path: webpackPaths.dllPath
          }
        }
      })
    ]
  }
]);
