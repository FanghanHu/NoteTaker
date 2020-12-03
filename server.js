const express = require('express');
const path = require('path');

const PORT = process.env.PORT;
const server = express();


server.get('./notes', express.static(path.join(__dirname, 'public/notes.html')));
server.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => {
    console.log("Server is now listening on port: " + PORT);
});