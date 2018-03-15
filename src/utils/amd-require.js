require('regenerator-runtime/runtime')

const cached = require('./cached')
const requireJs = require('../lib/requirejs')
const init = cached(_init)
const win = window


/**
 * A Promise version of AMD style require in browser environment
 * @param {Array<string>} modules the names array of modules
 * @return {Promise<Array<*>>} the modules array
 */
module.exports = function amdRequire(modules) {
    return _init()
            .then(req => new Promise((resolve, reject) => {
                req(
                    modules,
                    (...res) => {
                        console.warn("amd-require load %o -> %o", modules, res)
                        resolve(res)
                    }, 
                    reject
                )
            }))
}

async function _init() {
    await requireJs.load()
    const amdRequire = win.require
    const amdDefine = win.define
    if (!amdRequire || !amdDefine || !amdDefine.amd){
        throw new Error("Invalid requirejs!")
    }

    // set require config
    amdRequire.config(await loadRequireJsConfig())

    // define default modules 
    'Vue Promise'.split(' ').forEach(x => {
        amdDefine(x, [], () => win[x])
        amdDefine(x.toLowerCase(), [], () => win[x])
    })

    return amdRequire
}


function loadRequireJsConfig(){
    return {
        baseUrl: '/dist/',
        paths: {},
        shim: {},
    }
}

