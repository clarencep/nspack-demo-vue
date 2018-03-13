const fs = require('fs')
const path = require('path')

const defaultBaseEntry = {
    script: require('./src/template/base.script'),
    html: require('./src/template/base.html'),
    meta: require('./src/template/meta'),
    extractCssFromJs: true,
}

module.exports = {
    entryBase: path.join(__dirname, 'src'), // '@' is equal to entryBase
    entry: {
        home: {
            js: 'home.js',
            html: 'home.html.js', // Note: this file will run during build.
            cssExtractFromJs: true,
        },
        about: defaultBaseEntry,
    },
    outputBase: path.join(__dirname, 'dist'),
    output: {
        '*': {
            js: '[name]_[hash].js',
            css: '[name]_[hash].css',
            html: '[name].html',
        },
    },
    externals: {
        vue: 'window.Vue',
    }
}

