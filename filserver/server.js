const express = require('express');
const app = express();
const fs = require('fs');

const formidable = require('express-formidable');

app.use(formidable());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res, next) => {
    res.send('Hello World!');
});

app.post('/files', (req, res, next) => {
    if (!req.files || !req.files.file) {
        res.status(400);
        res.end();
        return;
    }

    console.log(req.files)

    fs.readFile(req.files.file.path, (err, data) => {
        if (err) return res.status(500);
        let timestamp = Date.now();
        fs.writeFile(`./upload/${timestamp}_${req.files.file.name}.png`, data, (err) => {
            if (err) return res.status(500);
            res.status(200);
            res.end();
        });
    });
});

app.listen(5000, () => {
    console.log('http://localhost:5000');
});