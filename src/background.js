"use strict"

import { app, protocol, BrowserWindow, ipcMain as main, dialog, Menu ,MenuItem} from "electron"
import { createProtocol } from "vue-cli-plugin-electron-builder/lib"
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer"
const isDevelopment = process.env.NODE_ENV !== "production"
const path = require("path")
var watch = require("node-watch")
let win = null
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }])

async function createWindow(height, width, x, y) {
	win = new BrowserWindow({
		autoHideMenuBar: true,
		width,
		x,
		y,
		height,
		webPreferences: {
			nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
			enableRemoteModule: true,
			//   preload: path.join(__dirname, "preload.js"),
		},
	})

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
		// if (!process.env.IS_TEST) win.webContents.openDevTools()
	} else {
		createProtocol("app")
		await win.loadURL("app://./index.html")
	}
	win.show()
	const { webContents } = win

	webContents.on("dom-ready", function (event) {
		console.log("Dom is ready...")
		win.webContents.send("dom_ready", "DOM is READY!")
	})
	webContents.on("did-finish-load", function () {
		console.log("Finish Load...")
		win.webContents.send("finish_load", "APP finish loading!")
	})
	webContents.on("will-navigate", () => {
		console.log("Will navigate...")
	})
	webContents.on("plugin-crashed", (event, name, version) => {
		console.log("Plugin crashed  ...", { version }, { name })
	})
	//   webContents.on("console-message", (level, line, message) => {
	//     console.log("On console message  ...", { message })
	//   })
	webContents.on("ipc-message", (event, channel, ...args) => {
		console.log("IPCRenderer send message  ...", args)
	})
	webContents.on("context-menu", (event, { x, y, frame, mediaType }) => {
		console.log({ x }, { y }, { frame }, { mediaType })
	})
	webContents.on("will-prevent-unload", (event) => {
		const choice = dialog.showMessageBoxSync(win, {
			type: "question",
			buttons: ["Leave", "Stay"],
			title: "Do you want to leave this site?",
			message: "Changes you made may not be saved.",
			defaultId: 0,
			cancelId: 1,
		})
		const leave = choice === 0
		if (leave) {
			event.preventDefault()
		}
	})
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	} else {
		const choice = dialog.showMessageBoxSync(win, {
			type: "question",
			buttons: ["Leave", "Stay"],
			title: "Do you want to leave this site?",
			message: "Changes you made may not be saved.",
			defaultId: 0,
			cancelId: 1,
		})
		const leave = choice === 0
		if (leave) {
			event.preventDefault()
		}
	}
})
var menu = new Menu()

//Basic Menu For Testing
menu.append(
	new MenuItem({
		label: "MenuItem1",
		click: function () {
			console.log("YES")
		},
	})
)
menu.append(new MenuItem({ type: "separator" }))
menu.append(new MenuItem({ label: "MenuItem2", type: "checkbox", checked: true }))
// app.on("web-contents-created", (...[, /* event */ webContents]) => {
// 	//Webview is being shown here as a window type
// 	console.log(webContents.getType())
// 	webContents.on(
// 		"context-menu",
// 		(event, click) => {
// 			event.preventDefault()
// 			console.log(webContents.getType())
// 			menu.popup(webContents)
// 		},
// 		false
// 	)
// })
app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow(600, 800)
})

app.on("ready", async () => {
	try {
		await installDevTools()
	} catch (error) {
		console.log(error)
	}
	whichScreen()
})
async function installDevTools() {
	if (isDevelopment && !process.env.IS_TEST) {
		try {
			await installExtension(VUEJS_DEVTOOLS)
			console.log("Vue Devtools installed correclty")
		} catch (e) {
			console.error("Vue Devtools failed to install:", e.toString())
		}
	}
}
async function whichScreen() {
	const { screen } = require("electron")
	const primaryDisplay = screen.getPrimaryDisplay()
	var { x, y } = primaryDisplay.bounds
	var { width, height } = primaryDisplay.workAreaSize
	const displays = screen.getAllDisplays()
	const externalDisplay = displays.find((display) => {
		return display.bounds.x !== 0 || display.bounds.y !== 0
	})
	//   console.log("There is ", displays.length, " displays")
	if (externalDisplay) {
		height = externalDisplay.size.height
		width = externalDisplay.size.width
		x = externalDisplay.bounds.x
		y = externalDisplay.bounds.y
	}
	await createWindow(height, width, x, y)
}

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === "win32") {
		process.on("message", (data) => {
			if (data === "graceful-exit") {
				app.quit()
			}
		})
	} else {
		process.on("SIGTERM", () => {
			app.quit()
		})
	}
}
main.handle("quit-app", () => {
	const choice = dialog.showMessageBoxSync(win, {
		type: "question",
		buttons: ["Leave", "Stay"],
		title: "Do you want to leave this site?",
		message: "Changes you made may not be saved.",
		defaultId: 1,
		cancelId: 0,
	})
	if (choice === 0) {
		app.quit()
	}
})
