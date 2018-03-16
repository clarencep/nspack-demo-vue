<template>
    <div>
        This is a test for ES6 module. <br/>
        If every thing is ok, you will see <code>Hi world!</code> and <code>Hello world!</code> below: <br/>
        <pre><code>{{hiWorld}}</code></pre>
        <pre><code>{{helloWorld}}</code></pre>
        
    </div>
</template>
<script>
    import {hello} from './_es6-module-hello-world'
    import hi from './_es6-module-hello-world'

    export default {
        data(){
            return {
                hiWorld: '',
                helloWorld: '',
            }
        },
        mounted(){
            this.hiWorld = hi()
            this.helloWorld = hello()
        }
    }
</script>