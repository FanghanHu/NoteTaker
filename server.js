const express = require('express');
const path = require('path');

const PORT = 8080;
const server = express();

server.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => {
    console.log("Server is now listening on port: " + PORT);
});