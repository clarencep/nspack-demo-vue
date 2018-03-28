<template>
    <div>
        test abc
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