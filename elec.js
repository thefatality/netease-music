const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const idDev = require('electron-is-dev')

app.on('ready', () => {
  const Menu = electron.Menu
  Menu.setApplicationMenu(null)
  const mainWindow = new BrowserWindow({
    width: 1022,
    height: 670,
    webPreferences: {
      nodeIntegration: true
    }
  })
  const url = idDev ? 'http://localhost:8080/' : 'dummyUrl'
  mainWindow.loadURL(url)
  mainWindow.webContents.openDevTools({ mode: 'detach' })
})
