const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');


const PORT = process.env.PORT || 8080;
const server = express();

/**
 * get notes from storage
 */
function loadNotes() {
    try {
        // noinspection JSCheckFunctionSignatures
        return JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json')));
    } catch (e) {
        console.error(e);
    }
    return [];
}

/**
 * save notes into storage
 */
function saveNotes(notes) {
    try{
        fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(notes));
    } catch (e) {
        console.error(e);
    }
}

//use body-parser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//server /notes endpoint
server.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

server.get('/api/notes', (req, res) => {
    let temp = loadNotes();
    let notes = temp.map(el=>{
        el.id = temp.indexOf(el);
        return el;
    });

    res.send(notes);
});

server.post('/api/notes', (req, res) => {
    //save note
    let {title, text} = req.body;
    let notes = loadNotes();
    notes.push({title, text});
    saveNotes(notes);
    res.end();
});

server.delete('/api/notes/:id', (req, res) => {
    //delete id;
    let id = req.params.id;
    let notes = loadNotes();
    notes.splice(id, 1);
    saveNotes(notes);
    res.end();
});

//serve the rest of the files as static
server.use(express.static(path.join(__dirname, 'public')));

//bind server.
server.listen(PORT, () => {
    console.log("Server is now listening on port: " + PORT);
});