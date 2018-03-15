<template>
    <div>
        This is a test for less.
        <p class="red">
            If less works, this block will be red.
        </p>
        <p class="green">
            this block will be green.
        </p>
        <p class="yellow">
            this block will be yellow.
        </p>
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
            this.instance = new DemoClass("Hello world!")
        }
    }

    class DemoClass {
        constructor(msg){
            this.message = msg
        }
    }
</script>
<style lang="less">
    @import "./test-less.less";
    @import "./test-less.2.less";
    @import "./test-less-include-css.css";

    /*this is style tag in the vue file*/
    body{
        background: #eee;
    }
    div {
        max-width: 400px;
        margin: 0 auto;
        p{
            background: #fff;
        }
    }
</style>