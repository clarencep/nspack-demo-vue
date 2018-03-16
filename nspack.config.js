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
    // libName: '', // default is this entry's name (in which all backslashes ('\') will be replaced by slash ('/') )
    // libTarget: 'umd', // default is no libTarget (just execute the module in an IIFE)
    // amdExecOnDef: true, // default is true 
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
        ...testsPagesEntries(),
        ...componentsAsUmdModules()
    },
    outputBase: path.join(__dirname, 'public'),
    output: {
        '*': {
            js: 'dist/[name].js',
            css: 'dist/[name].css',
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
        // hooks are something accepts inputs, processes inputs and can stop the normal packing process by returning false.
        // a hook must provide a apply() method, like a function.
        // the simplest hook is just a function.
        outputFile: nspack.hooks.OutputUglifier,
    }
}

// ignore files or directories begin with underscore('_')
function shouldIgnoreFile(file){
    return /\/_/.test(file)
}

function testsPagesEntries(){
    const testsDir = path.join(PROJECT_SRC_DIR, 'tests')
    const r = {}

    glob.sync(testsDir + '/**/*.vue').forEach(file => {
        if (!shouldIgnoreFile(file)){
            r[fileToModuleEntryName(file)] = defaultBaseEntry
        }
    })

    return r
}

// let's pack every components as AMD module
function componentsAsUmdModules(){
    const componentsDir = path.join(PROJECT_SRC_DIR, 'components')
    const r = {}

    glob.sync(componentsDir + '/**/*.vue').forEach(file => {
        if (!shouldIgnoreFile(file)){
            r[fileToModuleEntryName(file)] = {
                ...defaultBaseEntry, 

                // the component will be packed into AMD module
                libTarget: 'amd',

                // the js template
                js: require('./src/template/component.script'),

                // components has no html and css, all will be packed into a .js file
                html: false,
                css: false,
                extractCssFromJs: false,
            }
        }
    })

    return r
}

function fileToModuleEntryName(file){
    return path.relative(PROJECT_SRC_DIR, file).replace(/\.vue$/, '').replace(/\\/g, '/')
}