const path = require("path");

module.exports = {
    outputDir: process.env.NODE_ENV === 'production' ? path.resolve(__dirname, "../build/UI") : 'dist',
    assetsDir: process.env.NODE_ENV === 'production' ? "../UI" : '',

    chainWebpack: config => {
        config.module.rules.delete('eslint');
        config.plugin('html').tap(args => {
            args[0].title = 'Station Tracker'
            return args
        })
    }
}