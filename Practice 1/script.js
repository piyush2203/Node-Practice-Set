const http = require('http');
const requestHandler = require('./modules/requestHandler');

const server = http.createServer(requestHandler);

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
