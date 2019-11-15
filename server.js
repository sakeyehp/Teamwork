const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const port = parseInt(process.env.PORT) || 3000;
app.set('port', port);


server.listen(port, () => {
// eslint-disable-next-line no-console
  console.log(`server running on port ${port}`);
});

module.exports = server;