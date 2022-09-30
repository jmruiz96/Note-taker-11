const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
const { readFromFile, readAndAppend } = require('./helper/fsUtils')
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res)=>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    //had these routes wrong went to db file instead of html
);
app.get('/', (req, res) => {
    readFromFile('/public/index.html').then((data) => res.json(JSON.parse(data)))
    //this one too ^^
});

app.get('/api/notes', (req, res)=> {
    readFromFile('./db/db.json').then((data)=> res.json(JSON.parse(data)))
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    // console.log(req.body);
    if ( title && text ){
        const newNote = {
            title,
            text,
        };
        readAndAppend(newNote, './db/db.json');
        const response = {
            status: 'success',
            body: newNote
        };
        // console.log(response);
        res.json(response);
        // console.log(response);
    } else {
        res.json('Error in posting note')
    }
});



app.listen(PORT, ()=>
console.log(`App listening at http://localhost:${PORT}`)
);
//https://pacific-woodland-99392.herokuapp.com/