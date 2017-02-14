
const {DATABASE_URL, PORT} = require('./config.js');
const server = require('./server.js');
server.runServer(DATABASE_URL, PORT);
