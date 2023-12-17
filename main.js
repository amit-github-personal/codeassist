const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

require('dotenv').config();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: __dirname + '/preload.js',
            nodeIntegration: true
        }
    })


    win.loadFile(path.join(__dirname, 'static/html/index.html'))
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

ipcMain.on('get-env-variable', (event, variableName) => {
  // Respond to the renderer process with the value of the specified environment variable
  event.returnValue = process.env[variableName];
});