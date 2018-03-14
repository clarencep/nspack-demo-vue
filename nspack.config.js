const fs = require('fs')
const path = require('path')

const defaultBaseEntry = {
    js: require('./src/template/base.script'),
    css: require('./src/template/base.style'),
    html: require('./src/template/base.html'),
    extractCssFromJs: true,
    ignoreMissingCss: true,
}

module.exports = {
    entryBase: path.join(__dirname, 'src'), // '@' is equal to entryBase
    entry: {
        home: {
            js: 'home.js',
            css: 'home.css',
            html: 'home.html.js', // Note: this file will run during build.
            extractCssFromJs: false,
        },
        about: defaultBaseEntry,
        'tests/es6-classes': defaultBaseEntry,
    },
    outputBase: path.join(__dirname, 'dist'),
    output: {
        '*': {
            js: '[name].js',
            css: '[name].css',
            html: '[name].html',
        },
    },
    externals: {
        vue: 'window.Vue',
    },
}

