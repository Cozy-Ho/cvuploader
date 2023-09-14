/* eslint import/prefer-default-export: off, import/no-mutable-exports: off */
import { URL, format } from "url";
import path from "path";
import ProgressBar from "electron-progressbar";
import { autoUpdater } from "electron-updater";
import { app, dialog } from "electron";
import isDev from "electron-is-dev";
import log from "electron-log";

const getDataPath = () => {
  if (isDev) {
    return path.join(__dirname, "./");
  }
  return path.join(app.getPath("userData"), "data");
};
let resolveHtmlPath: (htmlFileName: string) => string;

if (process.env.NODE_ENV === "development") {
  const port = process.env.PORT || 9702;
  resolveHtmlPath = (htmlFileName: string) => {
    const url = new URL(`http://localhost:${port}/`);
    // url.pathname = htmlFileName;
    return url.href;
  };
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return format({
      protocol: "file:",
      slashes: true,
      pathname: path.join(__dirname, `../renderer/out/${htmlFileName}`),
    });
  };
}

/**
 * Logger setting
 */
log.transports.file.resolvePath = () =>
  path.join(getDataPath(), "logs/main.log");

log.transports.console.format = "{h}:{i}:{s}:{ms} {text}";
log.transports.file.level = "info";
const Log = log.scope("main");

class Updater {
  private progressBar: ProgressBar = null;
  constructor() {
    autoUpdater.logger = log;

    // autoUpdater.forceDevUpdateConfig = true;

    autoUpdater.on("update-available", () => {
      dialog
        .showMessageBox({
          type: "info",
          title: "update available",
          defaultId: 0,
          cancelId: 1,
          message:
            "A new version of Project is available. Do you want to update now?",
          buttons: ["Update", "Later"],
        })
        .then(result => {
          const buttonIndex = result.response;
          Log.debug(`buttonIndex: ${buttonIndex}`);
          if (buttonIndex === 0) autoUpdater.downloadUpdate();
        });
    });

    autoUpdater.once("download-progress", progressObj => {
      Log.debug("download start!");
      this.progressBar = new ProgressBar({
        indeterminate: false,
        text: "Downloading...",
        detail: "Downloading...",
      });

      this.progressBar
        .on("completed", function () {
          Log.info(`completed...`);
          this.progressBar.detail = "Task completed. Exiting...";
        })
        .on("aborted", function () {
          Log.info(`aborted...`);
        })
        .on("progress", function () {
          this.progressBar.detail = `Downloaded ${progressObj.percent}%`;
        });
    });

    autoUpdater.on("update-downloaded", () => {
      this.progressBar.setCompleted();
      dialog
        .showMessageBox({
          type: "info",
          title: "Update ready",
          message: "Install & restart now?",
          defaultId: 0,
          cancelId: 1,
          buttons: ["Restart", "Later"],
        })
        .then(result => {
          const buttonIndex = result.response;

          if (buttonIndex === 0) autoUpdater.quitAndInstall(false, true);
        });
    });

    autoUpdater.on("error", err => {
      Log.error("auto-updater error! >>>", err);
    });

    autoUpdater.checkForUpdatesAndNotify();
  }
}

const ServerConfig = {
  Develop: {
    host: "minio.dev2.vnclever.com",
    port: 443,
    useSSL: true,
  },
  Egy: {
    host: "minio.egy.dentalclever.com",
    port: 443,
    useSSL: true,
  },
  Egypt: {
    host: "minio.eg2.dentalclever.com",
    port: 443,
    useSSL: true,
  },
  "Egypt-QA": {
    host: "minio.clever2-qa-egypt.vsmart00.com",
    port: 443,
    useSSL: true,
  },
  Vietnam: {
    host: "localhost",
    port: 443,
    useSSL: true,
  },
  "Vietnam-QA": {
    host: "minio.vnm2.vnclever.com",
    port: 443,
    useSSL: true,
  },
  Russia: {
    host: "localhost",
    port: 443,
    useSSL: true,
  },
  "Russia-QA": {
    host: "minio.rus2.vnclever.com",
    port: 443,
    useSSL: true,
  },
};

export { Updater, Log, ServerConfig, getDataPath, resolveHtmlPath };
