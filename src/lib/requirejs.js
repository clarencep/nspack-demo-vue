
const cached = require('@/utils/cached')
const loadScript = require('@/utils/load-script')

const path = '/lib/requirejs.js'

module.exports = {
    path,
    load: cached(() => loadScript(path)),
}

