module.exports = {
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
    },
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compilerOptions = {
          ...options.compilerOptions,
          isCustomElement: (tag) => tag.startsWith("box-"),
        }
        return options
      })
  },
}
