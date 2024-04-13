// main.js

const { app, BrowserWindow , Tray} = require('electron');
const path = require('path');
let tray = null;

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 250,
    height: 250,
    frame: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }

  });

  //mainWindow.webContents.openDevTools();

  app.commandLine.appendSwitch('ignore-certificate-errors');
  app.commandLine.appendSwitch('allow-insecure-localhost', 'true');

  mainWindow.loadURL('https://localhost:4000');
})
