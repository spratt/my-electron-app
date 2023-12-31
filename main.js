const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();

  // On Mac, if we had no windows open and the App is "activated",
  // open a new window.  This can't happen on windows/linux because of
  // our handler for the "window-all-closed" event below, which closes
  // the app if there are no windows on those platforms.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit the app if all windows were closed EXCEPT on Mac, because
// the standard behaviour is to keep the app running in the dock
// without windows
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
