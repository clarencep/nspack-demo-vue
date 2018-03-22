<template>
    <div>
        This is a test for ES6 class.
        If the class is successfully built, you will see the instance dump info below:
        <pre><code>{{ instance }}</code></pre>
        
    </div>
</template>
<script>
    export default {
        data(){
            return {
                instance: ''
            }
        },
        mounted(){
            this.instance = new DemoClass("Hi world! ccc")
        }
    }

    class DemoClass {
        constructor(msg){
            this.message = msg
        }
    }
</script>