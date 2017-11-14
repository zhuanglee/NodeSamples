const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const cookieParser = require('cookie-parser');
const fs = require("fs");

const app = express();

app.get('/*.html', function (req, res) {
    res.sendFile(pathname, function (err) {
        if (err) {
            console.error(err);
            res.contentType("text/plain");
            res.end('404 not found');
        }
    });
});
