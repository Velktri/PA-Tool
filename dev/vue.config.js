const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "../build/UI"),
    assetsDir: "../UI",

    chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
}