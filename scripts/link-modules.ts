import fs from "fs";
import webpackPaths from "../.webpack/webpack.paths";

const srcNodeModulesPath = webpackPaths.srcNodeModulesPath;
const appNodeModulesPath = webpackPaths.appNodeModulesPath;

if (!fs.existsSync(srcNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
  fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath, "junction");
}
