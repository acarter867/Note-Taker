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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//Make sure app is listening on startup
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
