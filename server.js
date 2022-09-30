const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
const { readFromFile, writeToFile, readAndAppend } = require('./helper/fsUtils')
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res)=>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    //had these routes wrong went to db file instead of html
);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    //this one too ^^
});

app.get('/api/notes', (req, res)=> {
    readFromFile('./db/db.json').then((data)=> {
        console.log('request for the notes data')
        return res.json(JSON.parse(data));
    })
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    // console.log(req.body);
    if ( title && text ){
        const newNote = {
            title,
            text,
            id: uuidv4(),
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

// app.delete('/api/notes/:id', (req, res) => {
// const { title, text, noteId} = req.body;
// if (title && text && noteId){
    
// }
// }
// this was not working- scrapped 
// app.delete('/api/notes/:id', (req, res) => {
//     noteId = JSON.parse(req.params.id);
//     readFromFile('./db/db.json').then((data)=> res.json(JSON.parse(data)));
//     notes.JSONparse(notes)
//     notes = notes.filter(val => val.id !== noteId)
//     writeToFile('./db/db.json').then((data)=> res.json(JSON.parse(data)));
//   })
app.delete('/api/notes/:id', (req, res)=>{
    let noteid =req.params.id;
    // get all data from notes.db
    readFromFile('./db/db.json').then((data)=> {
        console.log('request for the notes data')
        return res.json(JSON.parse(data));
    })
  // filter out the clicked note to the id 
  
  // remove selected object with the same id
  // restore all the notes data to notes.json 
  // send response to front-end  
    res.json('this route is incomplete');
})


app.listen(PORT, ()=>
console.log(`App listening at http://localhost:${PORT}`)
);
//https://pacific-woodland-99392.herokuapp.com/
// heroku git:remote -a pacific-woodland-99392