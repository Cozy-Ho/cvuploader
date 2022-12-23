import { app, BrowserWindow, shell, ipcMain } from 'electron';
// import path from 'path';

// const IS_DEV = process.env.TEST;

let win: BrowserWindow | null = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 920,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  // win.loadURL('http://localhost:9702');
  win.loadFile('index.html');
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  win = null;
  if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// new window example arg: new windows url
// ipcMain.handle('open-win', (event, arg) => {
//   const childWindow = new BrowserWindow({
//     webPreferences: {
//       // preload,
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   });

//   if (process.env.VITE_DEV_SERVER_URL) {
//     childWindow.loadURL(`${url}#${arg}`);
//   } else {
//     childWindow.loadFile(indexHtml, { hash: arg });
//   }
// });
