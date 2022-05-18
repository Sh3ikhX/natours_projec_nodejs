const express = require('express');
const app = express();

const port = 3000;

app.get('/', async (req, res) => {
  res.status(200).json({ message: 'OKAY', app: 'Natours' });
});
app.post('/', async (req, res) => {
  res.status(200).json({ message: 'You can post here...' });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}/`);
});
