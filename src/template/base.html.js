const path = require('path')
const {html, raw} = require('es6-string-html-template')

module.exports = function({entry, bundle}){
    const meta = tryRequire(path.join(entry.baseDir, entry.name + '.meta.json')) || {}
    const title = meta.title || 'NSPack Demo For Vue'
    return html`<!doctype html>
<html>
<head>
    <title>${title}</title>
    ${raw(bundle.stylesTags)}
</head>
<body>
    <div id="app"></div>
    <script src="http://cdn.jsdelivr.net/npm/vue@2.5.15/dist/vue.js"></script>
    ${raw(bundle.scriptsTags)}
</body>
</html>`
}

function tryRequire(filepath){
    try {
        return require(filepath)
    } catch (e){}
}

