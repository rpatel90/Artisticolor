const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(__dirname))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'))
});

app.get("/index.js", (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.js'))
})

app.listen(8000);
