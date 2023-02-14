const express = require('express');
const path = require('path');
const fs = require('fs');
const notesDB = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//returns db.json from notes route
app.get('/api/notes', (req, res) => {
  res.json(notesDB);
})

//Root should return default index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//notes route should return notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

//Wildcard route using '*' returning index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//Make sure app is listening on startup
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

//create new note & assign unique id
function createNote(body, notesArr){
  let currNote = body;

  body.id = notesArr[0];
  notesArr[0]++;

  //push new note to notesArr
  notesArr.push(currNote);

  //write new note to db.json
  fs.writeFile(path.join(__dirname, notesDB), JSON.stringify(notesArr));

  return currNote;  
}

//post method to calla createNote function
app.post('/api/notes', (req, res) => {
  //create note with request body
  const note = createNote(req.body, notesDB);
  res.json(note);
})