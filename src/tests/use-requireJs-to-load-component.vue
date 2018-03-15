<template>
    <div>
        <p>
            This is a test for requirejs loading AMD component.<br/>
            Please click <button @click="loadAndDisplayHello">start</button> to start test.<br/>

            <label>
                <input type="checkbox" v-model="registerGlobally"/>
                register the component globally.
            </label>
        </p>
        <div v-if="helloLoading">
            <p>Hello is loading...</p>
        </div>
        <div v-if="helloLoaded">
            <p>Hello loaded. It should be here:</p>
            <Hello></Hello>
        </div>
        <div class="error" v-if="error">Error: {{error}}</div>
    </div>
</template>
<script>
    require('regenerator-runtime/runtime')
    const amdRequire = require('@/utils/amd-require')

    export default {
        components: {},
        data(){
            return {
                error: '',
                helloLoaded: false,
                helloLoading: false,
                registerGlobally: false,
            }
        },
        mounted(){
            this.instance = new DemoClass("Hello world!")
        },
        methods: {
            async loadAndDisplayHello(){
                try {
                    this.helloLoading = true

                    const [Hello] = await amdRequire(['components/Hello'])  

                    // register the component globally
                    if (this.registerGlobally){
                        Vue.component('Hello', Hello)
                    } else {
                        // or register the component js locally
                        this.$options.components.Hello = Hello
                    }

                    this.helloLoading = false
                    this.helloLoaded = true
                } catch (e){
                    console.error(e)
                    this.error = e + ''
                }
            }
        }
    }

    class DemoClass {
        constructor(msg){
            this.message = msg
        }
    }
</script>
<style>
    .error{
        color: red;
    }
</style>