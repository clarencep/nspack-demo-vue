const fs = require('fs')
const path = require('path')
const glob = require('glob')
const nspack = require('nspack')

const defaultBaseEntry = {
    js: require('./src/template/base.script'),
    css: require('./src/template/base.style'),
    html: require('./src/template/base.html'),
    extractCssFromJs: true,
    ignoreMissingCss: true,
}

const PROJECT_SRC_DIR = path.join(__dirname, 'src')

module.exports = {
    entryBase: PROJECT_SRC_DIR, // '@' is equal to entryBase
    entry: {
        home: {
            js: 'home.js',
            css: 'home.css',
            html: 'home.html.js', // Note: this file will run during build.
            extractCssFromJs: false,
        },
        about: defaultBaseEntry,
        ...getTestsPagesEntries(defaultBaseEntry),
    },
    outputBase: path.join(__dirname, 'dist'),
    output: {
        '*': {
            js: '[name].js',
            css: '[name].css',
            html: '[name].html',
        },
        home: {
            html: 'index.html',
        }
    },
    externals: {
        vue: 'window.Vue',
    },
    hooks: {
        outputFile: nspack.hooks.OutputUglifier,
    }
}

function getTestsPagesEntries(entryConfig){
    const testsDir = path.join(PROJECT_SRC_DIR, 'tests')
    const r = {}

    glob.sync(testsDir + '/**/*.vue').forEach(file => {
        if (!/\/_/.test(file)){
            r[path.relative(PROJECT_SRC_DIR, file).replace(/\.vue$/, '')] = entryConfig
        }
    })

    return r
}

