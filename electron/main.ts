/**
 * PRE-requisite function.
 *
 * check env files and set module import method.
 */
import dotenv from "dotenv";
dotenv.config();

const envFound = dotenv.config();

if (process.env.NODE_ENV === "development" && envFound.error) {
  console.error(`Could't finf .env file`);
  throw new Error(" Could't find .env file... ");
}

import { app, BrowserWindow, ipcMain } from "electron";
import fs from "fs";
import * as minio from "minio";
import path from "path";
import "regenerator-runtime";
import MenuBuilder from "./menu";
import { resolveHtmlPath, ServerConfig, Updater } from "./util";

let mainWindow: BrowserWindow | null = null;

ipcMain.on("ipc-example", async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log("arg # ", arg);

  event.reply("ipc-example", msgTemplate("pong"));
});

ipcMain.on("upload-file", async (event, arg) => {
  console.log("arg # ", arg);
  const fileId = arg.id;
  if (!fileId) return;

  const fileContent: Buffer = fs.readFileSync(arg.file);
  const extension: string = arg.extension;

  const uploadFileName = `${arg.type}_${arg.lang}.${extension}`;

  try {
    for (let i = 0; i < arg.region.length; i++) {
      const curServer = ServerConfig[arg.region[i]];
      const minioClient = new minio.Client({
        endPoint: curServer.host,
        port: curServer.port,
        useSSL: curServer.useSSL,
        accessKey: "haruband",
        secretKey: "haru1004",
      });

      const result = await minioClient.putObject(
        "dentalclever-documents",
        uploadFileName,
        fileContent,
        fileContent.length,
        {
          "content-type": extension.includes("xls")
            ? "application/vnd.ms-excel"
            : "application/pdf",
        },
      );
      console.log("result # ", result);
    }
    event.reply(`upload-done-${fileId}`, "done");
  } catch (e) {
    event.reply(`upload-fail-${fileId}`, "fail");
  }
});

if (process.env.NODE_ENV === "production") {
  import("source-map-support").then(sourceMapSupport => {
    sourceMapSupport.install();
  });
}

// FIXME: 개발용
const isDevelopment =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

if (isDevelopment) {
  //
  import("electron-debug").then(res => {
    res.default();
  });
}

const installExtensions = async () => {
  const installer = await import("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS"];

  return installer
    .default(
      extensions.map(name => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = path.join(__dirname, "./assets");

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 720,
    resizable: false,
    icon: getAssetPath("icon.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(resolveHtmlPath("index.html"));

  mainWindow.on("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
    // Open Dev tools when packaged.
    // mainWindow.webContents.openDevTools();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler(handler => {
    // handler.preventDefault();
    // shell.openExternal(handler.url);
    if (handler.disposition === "new-window") {
      return { action: "allow" };
    }
  });
  // mainWindow.webContents.on("new-window", (handler, url) => {
  //   handler.preventDefault();
  //   shell.openExternal(url);
  // });
};

/**
 * Add event listeners...
 */

app.setAboutPanelOptions({
  applicationName: "cvuploader",
  applicationVersion: app.getVersion(),
  copyright: "© 2023 all rights reserved.",
  version: app.getVersion(),
  authors: ["kj2693119@gmail.com"],
});

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();

    // Remove this if your app does not use auto updates
    new Updater();

    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
