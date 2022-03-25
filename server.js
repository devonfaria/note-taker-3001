const express = require('express');
// Built in Node JS Module that corrects path names for you, like repeated forward slashes, forges paths together safely
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

// Executing express on line below
const app = express();

// All caps means DO NOT CHANGE THIS VARIABLE
const PORT = process.env.PORT || 3001;

// FUNCTIONS
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

const writeToFile = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  )};


// Exposes the files in public folder to the open web
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Enables get function to see notes page
app.get('/api/notes', (req, res) => {
  fs.readFile('.db/db.json', 'utf8', function (err, data) {
    console.log('not in use');
    // console.log(data);
  })
});

// Accepts data from front end and converts to JSON for storage
app.post('/api/notes', (req, res) => {
  // Constructor for note object from request
  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uniqid(),
    };

    // Convert the data to a string
    // const noteString = JSON.stringify(newNote, null, 2);

// Some type of fs function
    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };
// Come back and delete thissss
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});


//   fs.writeFile('.db/db.json', res, function (err, data) {
//     console.log('Data from Notes', data);
//   })
// });

// Loads index.html page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname,'/public/notes.html'))
});

// Loads index.html page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Localhost 3001
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);