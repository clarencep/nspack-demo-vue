const path = require('path')
const express = require('express')


const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.listen(8080, function(){
    console.log("HTTP server started on port 8080. Please visit http://localhost:8080/")
})

