import path from "path";
import fs from "fs";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import chalk from "chalk";
import { merge } from "webpack-merge";
import { spawn, execSync } from "child_process";
import baseConfig from "./webpack.config.base";
import webpackPaths from "./webpack.paths";

const port = process.env.PORT || 21082;
const manifest = path.resolve(webpackPaths.dllPath, "renderer.json");
const requiredByDLLConfig = module.parent.filename.includes(
  "webpack.config.renderer.dll"
);

/**
 * Warn if the DLL is not built
 */
if (
  !requiredByDLLConfig &&
  !(fs.existsSync(webpackPaths.dllPath) && fs.existsSync(manifest))
) {
  console.log(
    chalk.black.bgYellow.bold(
      'The DLL files are missing. Sit back while we build them for you with "npm run build-dll"'
    )
  );
  execSync("yarn postinstall");
}

export default merge([
  baseConfig,
  {
    devtool: "inline-source-map",

    mode: "development",

    target: ["web", "electron-renderer"],

    entry: [
      `webpack-dev-server/client?http://localhost:${port}/dist`,
      "webpack/hot/only-dev-server",
      "core-js",
      "regenerator-runtime/runtime",
      path.join(webpackPaths.srcRendererPath, "index")
    ],

    output: {
      path: webpackPaths.distRendererPath,
      publicPath: "/",
      filename: "renderer.dev.js",
      library: {
        type: "umd"
      }
    },

    module: {
      rules: [
        // {
        //   test: /\.s?css$/,
        //   use: [
        //     "style-loader",
        //     {
        //       loader: "css-loader",
        //       options: {
        //         modules: true,
        //         sourceMap: true,
        //         importLoaders: 1
        //       }
        //     },
        //     "sass-loader"
        //   ],
        //   include: /\.module\.s?(c|a)ss$/
        // },
        // {
        //   test: /\.s?css$/,
        //   use: ["style-loader", "css-loader", "sass-loader"],
        //   exclude: /\.module\.s?(c|a)ss$/
        // },
        // Fonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource"
        },
        // Images
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource"
        }
      ]
    },
    plugins: [
      requiredByDLLConfig
        ? null
        : new webpack.DllReferencePlugin({
            context: webpackPaths.dllPath,
            manifest: require(manifest),
            sourceType: "var"
          }),

      new webpack.NoEmitOnErrorsPlugin(),

      /**
       * Create global constants which can be configured at compile time.
       *
       * Useful for allowing different behaviour between development builds and
       * release builds
       *
       * NODE_ENV should be production so that modules do not perform certain
       * development checks
       *
       * By default, use 'development' as NODE_ENV. This can be overriden with
       * 'staging', for example, by changing the ENV variables in the npm scripts
       */
      new webpack.EnvironmentPlugin({
        NODE_ENV: "development"
      }),

      new HtmlWebpackPlugin({
        filename: path.join("index.html"),
        template: path.join(webpackPaths.srcRendererPath, "index.ejs"),
        minify: {
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true
        },
        isBrowser: false,
        env: process.env.NODE_ENV,
        isDevelopment: process.env.NODE_ENV !== "production",
        nodeModules: webpackPaths.srcNodeModulesPath
      })
    ],

    node: {
      __dirname: false,
      __filename: false
    },

    devServer: {
      host: "0.0.0.0",
      port: port,
      open: false,
      compress: true,
      hot: true,
      headers: { "Access-Control-Allow-Origin": "*" },
      static: {
        publicPath: "/"
      },
      historyApiFallback: {
        verbose: true,
        disableDotRule: false
      },
      onBeforeSetupMiddleware() {
        console.log("Starting Main Process...");
        spawn("yarn", ["run", "start:main"], {
          shell: true,
          env: process.env,
          stdio: "inherit"
        })
          .on("close", code => process.exit(code))
          .on("error", spawnError => console.error(spawnError));
      }
    }
  }
]);
