const baseHtml = require('./template/base.html')

module.exports = function(built){
    return baseHtml(built, {title: 'Home - NSPack Demo For Vue'})
}

