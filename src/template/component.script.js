module.exports = function({entry}){
    const entryVueFile = entry.name + '.vue'
    return `module.exports = require('@/${entryVueFile}')`
}

