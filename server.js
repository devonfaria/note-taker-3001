const express = require('express');
// Built in Node JS Module that corrects path names for you, like repeated forward slashes, forges paths together safely
const path = require('path');

// Executing express on line below
const app = express();
// All caps means DO NOT CHANGE THIS VARISBLE
const PORT = process.env.PORT || 3001;

// Exposes the files in public folder to the open web
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

// Localhost 3001
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);