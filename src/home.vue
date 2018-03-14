<template>
    <div id="app" style="padding: 1em">
        <h3>Home</h3>
        <Hello></Hello>
        <h4>Tests: </h4>
        <ol>
            <li v-for="x in testUrls">
                <a :href="x.url">{{x.text}}</a>
            </li>
        </ol>
        <p><a href="about.html">About this.</a></p>
    </div>
</template>

<script>
    export default {
        components: {
            Hello: require('./components/Hello.vue'),
        },
        data(){
            return {
                ...window.APP_DATA
            }
        },
        computed: {
            testUrls(){
                return this.testFiles
                .filter(x => /\.vue$/.test(x))
                .map(x => x.replace(/\.vue$/, ''))
                .map(file => ({
                    text: 'Test ' + file.replace(/-/g, ' '),
                    url: 'tests/' + file + '.html',
                }))
            }
        }
    }
</script>

