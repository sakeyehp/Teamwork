'use strict';

var express = require('express');

var app = express();

app.use(express.json());

app.get('/', function (req, res) {
    return res.status(200).send({ 'message': 'Welcome to the TeamWork App' });
});

app.listen(3000);

console.log('app running on port ', 3000);