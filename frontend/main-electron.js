const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      // W trybie produkcyjnym warto ustawić contextIsolation oraz odpowiednio skonfigurować preload
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // W trybie developerskim możesz ładować aplikację przez ng serve:
  win.loadURL('http://localhost:4200');

  // W trybie produkcyjnym, po zbudowaniu Angulara, ładuj statyczne pliki:
  // win.loadFile(path.join(__dirname, 'dist/angular.dev/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
