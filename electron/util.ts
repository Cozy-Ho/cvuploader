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
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  };
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(__dirname, htmlFileName)}`;
  };
}

class Updater {
  private progressBar: ProgressBar = null;
  constructor() {
    log.transports.file.level = "info";

    autoUpdater.logger = log;

    autoUpdater.forceDevUpdateConfig = true;

    autoUpdater.on("checking-for-update", () => {
      log.info("없데이트 확인중...");
    });

    autoUpdater.on("update-available", () => {
      dialog
        .showMessageBox({
          type: "info",
          title: "update available",
          message:
            "A new version of Project is available. Do you want to update now?",
          buttons: ["update", "later"]
        })
        .then(result => {
          const buttonIndex = result.response;
          if (buttonIndex === 0) autoUpdater.downloadUpdate();
        });
    });

    autoUpdater.once("download-progress", progressObj => {
      this.progressBar = new ProgressBar({
        text: "Downloading...",
        detail: "Downloading..."
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
          buttons: ["Restart", "Later"]
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

export { Updater };
