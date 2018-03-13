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
        data(){
            return {}
        },
    }
</script>

