const fs = require('fs');
const express = require('express');
const app = express();

const port = 3000;

// app.get('/', async (req, res) => {
//   res.status(200).json({ message: 'OKAY', app: 'Natours' });
// });
// app.post('/', async (req, res) => {
//   res.status(200).json({ message: 'You can post here...' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'sucess',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}/`);
});
