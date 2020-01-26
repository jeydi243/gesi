'use strict'
import {app,protocol,BrowserWindow,ipcMain as main} from 'electron'
import {createProtocol,installVueDevtools} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
	scheme: 'app',
	privileges: {
		secure: true,
		standard: true
	}
}])

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: 1000,
		height: 800,
		frame:false,
		show:true,
		backgroundColor: '#2e2c29',
		webPreferences: {
			nodeIntegration: true
		}
	})

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
		// if (!process.env.IS_TEST) win.webContents.openDevTools()
	} else {
		createProtocol('app')
		// Load the index.html when not in development
		win.loadURL('app://./index.html')
	}
	win.once('ready-to-show', () => {
		win.show()
	  })
	win.on('closed', () => {
		win = null
	})
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('ready', async () => {
	createWindow()
})

main.on("minus",() =>{
	win.minimize();
});

main.on("close",() =>{
	win.close();
})

main.on("maximise",() =>{
	win.maximise
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', data => {
			if (data === 'graceful-exit') {
				app.quit()
			}
		})
	} else {
		process.on('SIGTERM', () => {
			app.quit()
		})
	}
}