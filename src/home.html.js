// the xxx.html.js will run in node.js environment when building the project
const fs = require('fs')
const path = require('path')
const cb2p = require('cb2p')
const baseHtml = require('./template/base.html')

const readdir = cb2p(fs.readdir)

module.exports = async function(built){
    const dataScript = await getDataScript()
    built.bundle.scriptsTags = dataScript + built.bundle.scriptsTags
    return baseHtml(built, {title: 'Home - NSPack Demo For Vue'})
}

async function getDataScript(){
    const data = {}
    const TESTS_DIR = path.join(__dirname, 'tests')
    data.testFiles = await readdir(TESTS_DIR)

    return `<script>var APP_DATA = ${JSON.stringify(data)}</script>`
}

