import Vue from "vue"

window.App = new Vue({
    el: '#app',
    components: {
        App: require('./home.vue'),
    },
    template: '<App/>',
    data: {},
})



