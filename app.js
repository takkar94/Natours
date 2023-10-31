const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());


app.use((req, res, next)=> {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})


const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);


const getAllTours =  (req, res) => {
  console.log(req.requestTime);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
};


const getTour = (req, res) => {
    console.log(req.params);

    const id = req.params.id *1 ;
    if (id> tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: ' Inavlid Id'
        })
    }

    const tour = tours.find(el => el.id === id);
    
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
}


const createTour = (req, res) => {
 
    const newID = tours[tours.length - 1].id + 1;
    const newTour = { id: newID, ...req.body };
  
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
      },
    );
  };

const updateTour = (req,res) => {
    
    if (req.params.id * 1> tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: ' Inavlid Id'
        })
    }
    
    res.status(200).json({
        status: 'Success',
        data: {
            tour: "<Updated Tour Here>"
        }
    })
};

const deleteTour = (req,res) => {
    
    if (req.params.id * 1> tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: ' Inavlid Id'
        })
    }
    
    res.status(204).json({
        status: 'Success',
        data: null
    })
};

/////////////////////////////////////////////////////////////////////////////////////////
//routes
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);


app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);


//server
const port = 3000;
app.listen(port, () => {
  console.log(`running on ${port} ......`);
});
