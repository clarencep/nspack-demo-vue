<template>
    <p class="hello">{{message}}</p>
</template>

<script>
    export default {
        data(){
            return {
                message: 'Hello world!',
            }
        }
    }
</script>

<style>
    .hello{
        color: green;
        font-size: 120%;
    }
</style>