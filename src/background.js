"use strict"

import { app, protocol, BrowserWindow, ipcMain as main } from "electron"
import { createProtocol } from "vue-cli-plugin-electron-builder/lib"
import installExtension from "electron-devtools-installer"
const isDevelopment = process.env.NODE_ENV !== "production"
const path = require("path")

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }])

async function createWindow(height, width, x, y) {
  // Create the browser window.
  console.log("process.env.ELECTRON_NODE_INTEGRATION: ", process.env.ELECTRON_NODE_INTEGRATION)
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width,
    x,
    y,
    height,
    webPreferences: {
      nodeIntegration: !process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, "preload.js"),
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol("app")
    // Load the index.html when not in development
    win.loadURL("app://./index.html")
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow(600, 800)
})

app.on("ready", async () => {
  installDevTools()
  whichScreen()
})
async function installDevTools() {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension({
        id: "ljjemllljcmogpfapbkkighbhhppjdbg", //Vue Devtools beta
        electron: ">=1.2.1",
      })
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString())
    }
  }
}
function whichScreen() {
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
    createWindow(height, width, x, y)
    // console.log(`We are on external screen(${height}x${width})`)
  }
  createWindow(height, width, x, y)
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

main.on("hello", (event) => {
  console.log("Child say hello")
  console.log(event.sender)
})
