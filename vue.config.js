module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        // modify the options...
        options.isCutstomElement = (tag) => !tag.startsWith("box")
        return options
      })
  },
}
