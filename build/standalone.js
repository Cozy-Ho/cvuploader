"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const electron_updater_1 = require("electron-updater");
const util_1 = require("./util");
const menu_1 = __importDefault(require("./menu"));
class AppUpdater {
    constructor() {
        // log.transports.file.level = 'info';
        // autoUpdater.logger = log;
        electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
    }
}
exports.default = AppUpdater;
const isDevelopment = process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";
let mainWindow = null;
electron_1.ipcMain.on("ipc-example", async (event, arg) => {
    const msgTemplate = (pingPong) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply("ipc-example", msgTemplate("pong"));
});
// app.on("ready", () => {
//   window = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true
//     }
//   });
//   window.loadFile(__dirname + "/index.html");
// });
const installExtensions = async () => {
    const installer = require("electron-devtools-installer");
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ["REACT_DEVELOPER_TOOLS"];
    return installer
        .default(extensions.map(name => installer[name]), forceDownload)
        .catch(console.log);
};
async function createWindow() {
    if (isDevelopment) {
        await installExtensions();
    }
    const RESOURCES_PATH = electron_1.app.isPackaged
        ? path_1.default.join(process.resourcesPath, "assets")
        : path_1.default.join(__dirname, "../../assets");
    const getAssetPath = (...paths) => {
        return path_1.default.join(RESOURCES_PATH, ...paths);
    };
    mainWindow = new electron_1.BrowserWindow({
        show: false,
        width: 1024,
        height: 720,
        icon: getAssetPath("icon.png"),
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL((0, util_1.resolveHtmlPath)("index.html"));
    mainWindow.on("ready-to-show", () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        }
        else {
            mainWindow.show();
        }
    });
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
    const menuBuilder = new menu_1.default(mainWindow);
    menuBuilder.buildMenu();
    // Open urls in the user's browser
    mainWindow.webContents.on("new-window", (event, url) => {
        event.preventDefault();
        electron_1.shell.openExternal(url);
    });
    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater();
}
/**
 * Add event listeners...
 */
electron_1.app.on("window-all-closed", () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app
    .whenReady()
    .then(() => {
    createWindow();
    electron_1.app.on("activate", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null)
            createWindow();
    });
})
    .catch(console.log);
//# sourceMappingURL=standalone.js.map