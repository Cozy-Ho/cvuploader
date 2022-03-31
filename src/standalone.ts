import { app, BrowserWindow } from "electron";

let window: BrowserWindow;

app.on("ready", () => {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  window.loadFile(__dirname + "/index.html");
});
