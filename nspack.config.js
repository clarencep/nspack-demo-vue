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
    // specify
    entryBase: PROJECT_SRC_DIR, // '@' is equal to entryBase
    entry: {
        // <name> => <entry-info>
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

    // specify the output files base directory
    outputBase: path.join(__dirname, 'public'),

    // specify the output file pathes and names
    output: {
        // <entry-name> => <entry-output-info>
        // - <entry-name>: the name of the entry, should be the same with previous config.entry configuration.
        home: {
            // <format> => <output-file-path-name>
            // - <format>: js/css/html
            // - <output-file-path-name>: the output file path and name, base from config.outputBase 
            html: 'index.html',
        },
        // '*' is a special case -- it means all or default output config.
        '*': {
            // you can use `[name]` and `[hash]` placeholder for the entry name and the file's md5 hash
            // js: 'dist/[name].[hash].js',
            // css: 'dist/[name].[hash].css',

            js: 'dist/[name].js',
            css: 'dist/[name].css',
            html: '[name].html',
        },
    },

    // the output hash manifests:
    outputHashManifests: {
        json: 'dist/manifests.json', // specify the manifests JSON file
        jsonp: 'dist/manifests.js',  // specify the manifests JSONP file
        jsonpCallback: 'nspackManifestsJsonpCallback', // the callback function name for JSONP
    },

    // the hash length for `[hash]` in output file name, default is `6`
    hashLength: 6, 

    // specify the external modules
    externals: {
        // <module-name> => <module-definition>
        // - <module-name>: can be used in require() or import 
        // - <module-definition>: a js expression, whose value is the module.
        vue: 'window.Vue',
    },

    // hooks are something accepts inputs, processes inputs and can stop the normal packing process by returning false.
    // a hook must provide a apply() method, like a function.
    // the simplest hook is just a function.
    hooks: {
        // use the default uglifier to compress output file
        outputFile: nspack.hooks.OutputUglifier,

        // We only need the manifests for components
        buildManifests: (manifests) => {
            for (let moduleName of Object.keys(manifests)){
                if (!/^components\/.*\.js$/.test(moduleName)){
                    delete manifests[moduleName]
                }
            }
        },
    },

    // specify the interval in ms for checking filesystem changes in watching process.
    watchInterval: 500, //ms
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