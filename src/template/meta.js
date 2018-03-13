module.exports = function({entry, baseDir}){
    const appVueFile = entry.name + '.vue'
    return `
import Vue from "vue"

window.App = new Vue({
    el: '#app',
    components: {
        App: require('@/${appVueFile}'),
    },
    template: '<App/>',
    data: {},
})`

}

