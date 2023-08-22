const { app, BrowserWindow } = require("electron");

let appWin;


// require('electron-reload')(__dirname, {
//     electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
// });


let createWindow = () => {
  appWin = new BrowserWindow({
    title: "Duolearn-Programming",
    resizable: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });
  
  appWin.loadURL(`file://${__dirname}/dist/index.html`);

  appWin.setMenu(null);

  appWin.webContents.openDevTools();

  appWin.on("closed", () => {
    appWin = null;
  });
  appWin.maximize();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});