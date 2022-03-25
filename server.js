const express = require('express');
// Built in Node JS Module that corrects path names for you, like repeated forward slashes, forges paths together safely
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

// Executing express on line below
const app = express();
// All caps means DO NOT CHANGE THIS VARIABLE
const PORT = process.env.PORT || 3001;

// Exposes the files in public folder to the open web
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Enables get function to see notes page
app.get('/api/notes', (req, res) => {
  fs.readFile('.db/db.json', 'utf-8', function (err, data) {
    console.log('Data from Notes', data);
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
    const noteString = JSON.stringify(newNote, null, 2);

// Some type of fs function

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



// POST request to add a review
app.post('/api/reviews', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Destructuring assignment for the items in req.body
  const { product, review, username } = req.body;

  // If all the required properties are present
  if (product && review && username) {
    // Variable for the object we will save
    const newReview = {
      product,
      review,
      username,
      upvotes: Math.floor(Math.random() * 100),
      review_id: uuid(),
    };

    // Convert the data to a string so we can save it
    const reviewString = JSON.stringify(newReview, null, 2);

    // Write the string to a file
    fs.writeFile(`./db/${newReview.product}.json`, reviewString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newReview.product} has been written to JSON file`
          )
    );

    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});