import { resolve } from "path"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "src/background.js"),
        },
      },
    },
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "src/preload/index.js"),
        },
      },
    },
  },
  renderer: {
    root: "src/main.js",

    build: {
      outDir: "out",
      rollupOptions: {
        input: {
          index: resolve(__dirname, "public/index.html"),
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    plugins: [vue()],
  },
})
