const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoute = require('./routes/admin');
const signInRoute = require('./routes/signin');
const employeeRoutes = require('./routes/employee');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v2/', adminRoute);
app.use('/api/v2/', signInRoute);
app.use('/api/v2/', employeeRoutes);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/index.html'));
});
app.get('/api/v2', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/index.html'));
});

module.exports = app;