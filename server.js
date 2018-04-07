const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

app.use("/", serveStatic (path.join (__dirname, '/dist')));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
});
// Create default port to serve the app on
const port = 5000;
app.listen(port);