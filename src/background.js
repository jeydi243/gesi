"use strict"

import { app, protocol, BrowserWindow } from "electron"
import { createProtocol } from "vue-cli-plugin-electron-builder/lib"
import installExtension from "electron-devtools-installer"
const isDevelopment = process.env.NODE_ENV !== "production"

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }])

async function createWindow(height, width, x, y) {
  // Create the browser window.
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width,
    x,
    y,
    height,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
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
  const { screen } = require("electron")
  const primaryDisplay = screen.getPrimaryDisplay()
  var { x, y } = primaryDisplay.bounds
  var { width, height } = primaryDisplay.workAreaSize
  const displays = screen.getAllDisplays()
  if (isDevelopment && !process.env.IS_TEST) {
    // console.log("Donc la c'est comme ça")
    try {
      await installExtension({
        id: "ljjemllljcmogpfapbkkighbhhppjdbg", //Vue Devtools beta
        electron: ">=1.2.1",
      })
      const externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0
      })
    //   console.log("There is ", displays.length, " displays")
      if (externalDisplay) {
        height = externalDisplay.size.height
        width = externalDisplay.size.width * 0.9
        x = externalDisplay.bounds.x
        y = externalDisplay.bounds.y
        createWindow(height, width, x, y)
        // console.log(`We are on external screen(${height}x${width})`)
      } else {
        createWindow(height, width, x, y)
        // console.log(`We are on main screen(${height}x${width})`)
      }
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString())
    }
  }
})

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
