/* eslint import/prefer-default-export: off, import/no-mutable-exports: off */
import { URL } from "url";
import path from "path";
import ProgressBar from "electron-progressbar";
import { autoUpdater } from "electron-updater";
import { dialog } from "electron";
import log from "electron-log";

export let resolveHtmlPath: (htmlFileName: string) => string;

if (process.env.NODE_ENV === "development") {
  const port = process.env.PORT || 9702;
  resolveHtmlPath = (htmlFileName: string) => {
    const url = new URL(`http://localhost:${port}/`);
    // url.pathname = htmlFileName;
    return url.href;
  };
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.join(__dirname, htmlFileName)}`;
  };
}

class Updater {
  private progressBar: ProgressBar = null;
  constructor() {
    log.transports.file.level = "info";

    autoUpdater.logger = log;

    autoUpdater.forceDevUpdateConfig = true;

    autoUpdater.on("update-available", () => {
      dialog
        .showMessageBox({
          type: "info",
          title: "update available",
          message:
            "A new version of Project is available. Do you want to update now?",
          buttons: ["update", "later"],
        })
        .then(result => {
          const buttonIndex = result.response;
          if (buttonIndex === 0) autoUpdater.downloadUpdate();
        });
    });

    autoUpdater.once("download-progress", progressObj => {
      this.progressBar = new ProgressBar({
        text: "Downloading...",
        detail: "Downloading...",
      });

      this.progressBar
        .on("completed", function () {
          console.info(`completed...`);
          this.progressBar.detail = "Task completed. Exiting...";
        })
        .on("aborted", function () {
          console.info(`aborted...`);
        });
    });

    autoUpdater.on("update-downloaded", () => {
      this.progressBar.setCompleted();
      dialog
        .showMessageBox({
          type: "info",
          title: "Update ready",
          message: "Install & restart now?",
          buttons: ["Restart", "Later"],
        })
        .then(result => {
          const buttonIndex = result.response;

          if (buttonIndex === 0) autoUpdater.quitAndInstall(false, true);
        });
    });

    autoUpdater.on("error", err => {
      log.error("auto-updater error! >>>", err);
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

export { Updater, ServerConfig };
