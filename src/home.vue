<template>
    <div id="app">
        <h3>Home</h3>
        <Hello></Hello>
        <p><a href="about.html">About this.</a></p>
    </div>
</template>

<script>
    export default {
        components: {
            Hello: require('./components/Hello.vue'),
        },
        data: {},
    }
</script>

<style>
    body{
        background: #f0f0f0;
        margin: 0;
        padding: 0;
    }
    #app{
        max-width: 600px;
        background: #fff;
        margin: 0 auto;
    }
</style>