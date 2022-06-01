const fs = require('fs');
const express = require('express');
const { get } = require('express/lib/response');
const morgan = require('morgan');

const app = express();
app.use(express.json());

// 3rd party middleware
app.use(morgan('dev'));

//custom middleware
app.use((req, res, next) => {
  console.log('Middleware 👌');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//reading data from file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route handlers
const getAllTours = (req, res) => {
  // console.log(req.requestTime);
  res.status(200).json({
    status: 'sucess',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getSingleTour = (req, res) => {
  const id = req.params.id * 1;

  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const singleTour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'sucess',
    data: {
      singleTour,
    },
  });
};

const creatTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour>',
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getSingleTour);
// app.post('/api/v1/tours', creatTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//refactored routes
app.route('/api/v1/tours').get(getAllTours).post(creatTour);
app
  .route('/api/v1/tours/:id')
  .get(getSingleTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}/`);
});
