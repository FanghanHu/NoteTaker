const express = require('express');
const path = require('path');

const PORT = process.env.PORT;
const server = express();



//server /notes endpoint
server.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//serve the rest of the files as static
server.use(express.static(path.join(__dirname, 'public')));

//bind server.
server.listen(PORT, () => {
    console.log("Server is now listening on port: " + PORT);
});